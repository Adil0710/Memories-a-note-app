import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for sensitive data
    pass: process.env.EMAIL_PASS,
  },  // Show debug output
});

transporter.verify(function(error, success) {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP connection established successfully');
    }
  });

async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: '"Memories ✨" <padil2246@gmail.com>', // sender address
      to,
      subject,
      text,
      html
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: %s", error);
    throw error;
  }
}

export default sendEmail;
