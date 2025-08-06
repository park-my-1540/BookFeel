CREATE TABLE "user_gemini_usage" (
	"profile_id" uuid,
	"used_count" bigint DEFAULT 0,
	"last_used_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_gemini_usage_profile_id_pk" PRIMARY KEY("profile_id")
);
--> statement-breakpoint
ALTER TABLE "user_gemini_usage" ADD CONSTRAINT "user_gemini_usage_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;