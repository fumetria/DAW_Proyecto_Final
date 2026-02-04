ALTER TABLE "receipts" RENAME COLUMN "user_id" TO "user_email";--> statement-breakpoint
ALTER TABLE "receipts" DROP CONSTRAINT "receipts_user_id_users_email_fk";
--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;