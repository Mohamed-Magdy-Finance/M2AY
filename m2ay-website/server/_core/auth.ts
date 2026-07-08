import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "./env";

const TOKEN_EXPIRY = "30d";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email, role: "admin" }, ENV.jwtSecret, { expiresIn: TOKEN_EXPIRY });
}

export function verifyAdminToken(token: string): { email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, ENV.jwtSecret) as { email: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}
