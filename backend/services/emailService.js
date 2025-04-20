const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, bookTitle, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-borrow?token=${token}`;

    const mailOptions = {
      from: `"Bookworm Unite" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Verify Your Book Borrowing - ${bookTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>📚 Borrow Request Confirmation</h2>
          <p>You requested to borrow <strong>${bookTitle}</strong>.</p>
          <p>Please confirm your identity by clicking the button below:</p>
          <a href="${verificationLink}" 
             style="display:inline-block; padding:10px 15px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">
             Confirm Borrowing
          </a>
          <p>If you did not make this request, you can ignore this email.</p>
          <hr />
          <small>This link will expire after some time. Stay awesome! 😎</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendVerificationEmail };