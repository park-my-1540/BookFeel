CREATE TABLE "playlists" (
	"playlist_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "playlists_playlist_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"profile_id" uuid,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"url" text NOT NULL,
	"reason" text,
	"upvotes" bigint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "upvotes" (
	"playlist_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "upvotes_playlist_id_profile_id_pk" PRIMARY KEY("playlist_id","profile_id")
);
--> statement-breakpoint
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_playlist_id_playlists_playlist_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("playlist_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;