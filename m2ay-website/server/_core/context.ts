import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { COOKIE_NAME } from "@shared/const";
import { verifyAdminToken } from "./auth";

export type AdminUser = { email: string; role: "admin" };

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: AdminUser | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: AdminUser | null = null;

  const token = opts.req.cookies?.[COOKIE_NAME];
  if (token) {
    const decoded = verifyAdminToken(token);
    if (decoded && decoded.role === "admin") {
      user = { email: decoded.email, role: "admin" };
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
