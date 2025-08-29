import {
  bigint,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

// orders 테이블
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(), // bigint identity
  profile_id: uuid("profile_id")
    .references(() => profiles.profile_id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  total_price: bigint("total_price", { mode: "number" }).notNull().default(0),
  cover_url: text("cover_url").notNull(),
  method: text("method").notNull(),
  price: bigint("price", { mode: "number" }).notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// order_items 테이블
export const order_items = pgTable("order_items", {
  id: serial("id").primaryKey(), // bigint identity
  order_id: bigint("order_id", { mode: "number" })
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  book_id: text("book_id").notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  cover_url: text("cover_url").notNull(),
  price: bigint("price", { mode: "number" }).notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
