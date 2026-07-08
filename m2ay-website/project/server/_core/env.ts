export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "change-this-secret-in-production",
  isProduction: process.env.NODE_ENV === "production",
};
