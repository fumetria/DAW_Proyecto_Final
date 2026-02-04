ALTER TABLE "receipts-lines" DROP CONSTRAINT "receipts-lines_receipt_id_receipts_id_fk";
--> statement-breakpoint
ALTER TABLE "receipts" DROP CONSTRAINT "receipts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "receipts-lines" ALTER COLUMN "receipt_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "user_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "receipts-lines" ADD CONSTRAINT "receipts-lines_receipt_id_receipts_num_receipt_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipts"("num_receipt") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_id_users_email_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;