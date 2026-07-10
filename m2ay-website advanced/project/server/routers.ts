import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { publicRouter } from "./routers/public";
import { adminRouter } from "./routers/admin";
import { getAdminByEmail, touchAdminLastSignedIn } from "./db";
import { signAdminToken, verifyPassword } from "./_core/auth";
import { getSessionCookieOptions } from "./_core/cookies";
import { checkLoginRateLimit, resetLoginRateLimit } from "./_core/rateLimit";
import { logActivity } from "./_core/activityLog";
import { TRPCError } from "@trpc/server";

const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const ip = (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || ctx.req.socket?.remoteAddress || "unknown";
      const rateCheck = checkLoginRateLimit(ip);
      if (!rateCheck.allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `محاولات كتير غلط. حاول تاني بعد ${Math.ceil((rateCheck.retryAfterSeconds ?? 0) / 60)} دقيقة.`,
        });
      }

      const adminRecord = await getAdminByEmail(input.email);
      if (!adminRecord) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "بيانات الدخول غير صحيحة" });
      }
      const ok = await verifyPassword(input.password, adminRecord.passwordHash);
      if (!ok) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "بيانات الدخول غير صحيحة" });
      }
      resetLoginRateLimit(ip);
      const token = signAdminToken(adminRecord.email);
      const options = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, { ...options, maxAge: ONE_YEAR_MS });
      await touchAdminLastSignedIn(adminRecord.email);
      await logActivity("login", "admin", adminRecord.email);
      return { email: adminRecord.email, role: "admin" as const };
    }),

  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    const options = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, options);
    return { success: true };
  }),
});

export const appRouter = router({
  auth: authRouter,
  public: publicRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
