// Looking to send emails in production? Check out our Email API/SMTP product!
import { createTransport } from "nodemailer";
import 'dotenv/config';

const transport = createTransport({
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT!),
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!,
    }
});

const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
};
const recipients = [
    "fulin789@gmail.com",
];

transport
    .sendMail({
        from: sender,
        to: recipients,
        subject: "Works with Typescript?",
        text: "Yes, it works!",
    })
    .then(console.log, console.error);