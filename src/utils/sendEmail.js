import nodemailer from "nodemailer";


export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: "somoododwan97@gmail.com",
            pass: "divo ldwo ujus ywkw",
        },
    });
    
    const info = await transporter.sendMail({
        from: '"AnonymousFeedbackApp👻" <somoododwan97@gmail.com>', // sender address
        to , // list of receivers
        subject, // Subject line
        html, // html body
    });
};
