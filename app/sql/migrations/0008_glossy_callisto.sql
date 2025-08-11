CREATE TABLE "shopping_cart" (
	"profile_id" uuid,
	"id" text NOT NULL,
	"title" text NOT NULL,
	"authors" text[] NOT NULL,
	"publisher" text NOT NULL,
	"thumbnail" text NOT NULL,
	"price" text NOT NULL,
	"sale_price" text NOT NULL,
	"contents" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;