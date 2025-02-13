import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    
    const info = await transporter.sendMail({
        from: '"AnonymousFeedbackApp" <somoododwan97@gmail.com>', // sender address
        to , // list of receivers
        subject, // Subject line
        html, // html body
    });
};
