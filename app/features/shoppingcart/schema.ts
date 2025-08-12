import { pgTable, uuid, text, timestamp, bigint } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const shopping_cart = pgTable("shopping_cart", {
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  id: text().notNull(),
  title: text().notNull(),
  author: text().notNull(),
  thumbnail: text().notNull(),
  price: bigint({ mode: "number" }),
  sale_price: bigint({ mode: "number" }),
  contents: text(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
