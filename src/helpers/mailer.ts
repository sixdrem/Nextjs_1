import { useEffect } from 'react';
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { run } from 'node:test';

export const sendEmail= async ({email, emailType, userId}:any) => { 
    try {

        // create a hashed token
       const hashedToken = await bcryptjs.hash(userId.toString(), 10);

       if(emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
        });
       }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
       }

       // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fbb00d3f88bf95",
      pass: "79485f37dc2d4f"
    }
  });

  const mailOptions = {
    from: "amit5012003@example.com",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
  };

  const mailResponse = await transport.sendMail(mailOptions);
          
  return mailResponse;   

    } 
    
    
    
    catch (error: any) {
        throw new Error(error.message);
    }
}   