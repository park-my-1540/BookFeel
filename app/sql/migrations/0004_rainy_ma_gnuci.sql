CREATE TABLE "user_custom_keywords" (
	"gemini_idea_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_custom_keywords_gemini_idea_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"author" text NOT NULL,
	"cover_url" text NOT NULL,
	"keyword" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
