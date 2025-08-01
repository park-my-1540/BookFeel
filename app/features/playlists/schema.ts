import {
  pgTable,
  uuid,
  text,
  timestamp,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const playlists = pgTable("playlists", {
  playlist_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  title: text().notNull(),
  author: text().notNull(),
  url: text().notNull(),
  reason: text(),
  upvotes: bigint({ mode: "number" }).default(0),
  created_at: timestamp().notNull().defaultNow(),
});

export const upvotes = pgTable(
  "upvotes",
  {
    playlist_id: bigint({ mode: "number" }).references(
      () => playlists.playlist_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.playlist_id, table.profile_id] }),
  })
);
