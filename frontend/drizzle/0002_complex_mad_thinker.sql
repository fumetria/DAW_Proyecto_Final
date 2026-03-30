CREATE TABLE "taxes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "taxes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"value" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "taxes_value_unique" UNIQUE("value")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "tax_id" integer;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "pvp_without_tax" real;--> statement-breakpoint
ALTER TABLE "receipts" ADD COLUMN "end_day_id" uuid;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_tax_id_taxes_id_fk" FOREIGN KEY ("tax_id") REFERENCES "public"."taxes"("id") ON DELETE no action ON UPDATE no action;