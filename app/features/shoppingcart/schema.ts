import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const shopping_cart = pgTable("shopping_cart", {
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  id: text().notNull(),
  title: text().notNull(),
  authors: text().notNull(),
  thumbnail: text().notNull(),
  price: text().notNull(),
  sale_price: text().notNull(),
  contents: text(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
