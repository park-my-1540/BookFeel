import {
  pgTable,
  text,
  bigint,
  timestamp,
  integer,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

import { type AnyPgColumn } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const topics = pgTable("topics", {
  topic_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(), // slug는 주소에 사용되는 친근한 식별자
  created_at: timestamp().notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  post_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  content: text().notNull(),
  upvotes: bigint({ mode: "number" }).default(0),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  topic_id: bigint({ mode: "number" })
    .references(() => topics.topic_id, {
      onDelete: "cascade",
    })
    .notNull(),
  profile_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(),
});

// 어떤 유저의 좋아요를 받은 post를 참조하고 좋아요를 누른 유저를 참조
export const postUpvotes = pgTable(
  "post_upvotes",
  {
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
      onDelete: "cascade",
    }),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.post_id, table.profile_id] }),
  })
);

export const postReplies = pgTable("post_replies", {
  post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  profile_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(),
  post_reply_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  parent_id: bigint({ mode: "number" }).references(
    (): AnyPgColumn => postReplies.post_reply_id,
    {
      onDelete: "cascade",
    }
  ),
  reply: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
