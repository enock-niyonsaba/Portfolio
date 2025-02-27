import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendContactNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <contact@vercel.com>',
      to: 'enockccg28@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
};