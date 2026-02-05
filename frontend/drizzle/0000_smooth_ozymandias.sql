CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cod_art" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" integer NOT NULL,
	"pvp" real NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "articles_cod_art_unique" UNIQUE("cod_art")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "receipts-numbers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "receipts-numbers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serie" varchar(20) DEFAULT 'FS' NOT NULL,
	"year" integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::int % 100 NOT NULL,
	"number" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "receipts-lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_cod_art" varchar NOT NULL,
	"details" varchar(255),
	"quantity" integer DEFAULT 0 NOT NULL,
	"price" real NOT NULL,
	"total" real NOT NULL,
	"receipt_id" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "receipts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"num_receipt" varchar NOT NULL,
	"serie" varchar(20) NOT NULL,
	"year" integer NOT NULL,
	"number" integer NOT NULL,
	"total" real DEFAULT 0 NOT NULL,
	"user_email" varchar NOT NULL,
	"payment_method" varchar,
	"is_open" boolean DEFAULT false,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "receipts_num_receipt_unique" UNIQUE("num_receipt")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"dni" varchar(12) NOT NULL,
	"name" varchar(255) NOT NULL,
	"surname1" varchar(255) NOT NULL,
	"surname2" varchar(255),
	"is_employee" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	"organization" varchar(255),
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_dni_unique" UNIQUE("dni")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD CONSTRAINT "receipts-lines_article_cod_art_articles_cod_art_fk" FOREIGN KEY ("article_cod_art") REFERENCES "public"."articles"("cod_art") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD CONSTRAINT "receipts-lines_receipt_id_receipts_num_receipt_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipts"("num_receipt") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uniq_receipt_serie_year" ON "receipts-numbers" USING btree ("serie","year");--> statement-breakpoint
CREATE VIEW "public"."article_view" AS (select "articles"."id", "articles"."cod_art", "articles"."name" as "article_name", "categories"."name" as "category_name", "articles"."pvp" from "articles" left join "categories" on "articles"."category_id" = "categories"."id");