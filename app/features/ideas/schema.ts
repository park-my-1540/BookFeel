import {
  pgSchema,
  pgTable,
  uuid,
  text,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

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

export const user_custom_keywords = pgTable("user_custom_keywords", {
  gemini_idea_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
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
