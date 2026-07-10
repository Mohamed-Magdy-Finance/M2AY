import { getDb } from "../db";
import { activityLog } from "../../drizzle/schema";

export type ActivityAction = "created" | "updated" | "deleted" | "restored" | "login" | "imported_backup" | "exported_backup";
export type ActivityEntityType = "chapter" | "template" | "question" | "consultation" | "admin" | "backup";

/**
 * Records an admin action. Best-effort — a logging failure should never break the
 * actual mutation, so errors here are swallowed (and logged to the console only).
 */
export async function logActivity(action: ActivityAction, entityType: ActivityEntityType, entityName?: string) {
  try {
    const db = await getDb();
    if (!db) return;
    await db.insert(activityLog).values({ action, entityType, entityName: entityName?.slice(0, 255) });
  } catch (error) {
    console.warn("[ActivityLog] Failed to record activity:", error);
  }
}
