import {
  pgTable,
  uuid,
  text,
  timestamp,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const gemini_ideas = pgTable("gemini_ideas", {
  gemini_idea_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  title: text().notNull(),
  author: text().notNull(),
  cover: text().notNull(),
  keyword: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const user_gemini_usage = pgTable(
  "user_gemini_usage",
  {
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    used_count: bigint({ mode: "number" }).default(0),
    last_used_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.profile_id] }),
  })
);

export const user_custom_keywords = pgTable("user_custom_keywords", {
  gemini_idea_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  title: text().notNull(),
  author: text().notNull(),
  cover: text().notNull(),
  keyword: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const keyword = pgTable("category", {
  category_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  keyword: text().notNull(),
});
