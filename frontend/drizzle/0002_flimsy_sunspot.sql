ALTER TABLE "end-days" ADD COLUMN "base_total" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "end-days" ADD COLUMN "tax_total" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "base_unit" real;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "tax_unit" real;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "base_total" real;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "tax_total" real;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "tax_id" integer;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD COLUMN "tax_value" real;--> statement-breakpoint
ALTER TABLE "receipts" ADD COLUMN "base_total" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ADD COLUMN "tax_total" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD CONSTRAINT "receipts-lines_tax_id_taxes_id_fk" FOREIGN KEY ("tax_id") REFERENCES "public"."taxes"("id") ON DELETE no action ON UPDATE no action;