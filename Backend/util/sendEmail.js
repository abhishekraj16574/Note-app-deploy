import { createTransport } from "nodemailer";

 export const sendMail = async(subject,text)=>{
  const transporter = createTransport({
    service:"gmail",
    auth:{
      user:process.env.MYMAIL,
      pass:process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from:process.env.MYMAIL,
    to:process.env.MYMAIL,
    subject:subject,
    text:text,
  });
};