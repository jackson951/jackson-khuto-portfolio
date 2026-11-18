import nodemailer from 'nodemailer';

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO',
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const missingEnv = requiredEnv.filter((key) => {
    const value = process.env[key];

    return !value || value === 'undefined';
  });

  if (missingEnv.length > 0) {
    console.error(`Missing email configuration: ${missingEnv.join(', ')}`);
    return response.status(500).json({ message: 'Email is not configured' });
  }

  const { name, email, message, company } = request.body ?? {};

  // Honeypot field: real visitors never see it, so anything here is a bot. Pretend success.
  if (company) {
    return response.status(200).json({ message: 'Message sent' });
  }

  const trimmedName = String(name ?? '').trim();
  const trimmedEmail = String(email ?? '').trim();
  const trimmedMessage = String(message ?? '').trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return response.status(400).json({ message: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return response.status(400).json({ message: 'Enter a valid email address' });
  }

  if (trimmedName.length > 200 || trimmedEmail.length > 200 || trimmedMessage.length > 5000) {
    return response.status(400).json({ message: 'Message is too long' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM ?? process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: trimmedEmail,
      subject: `Portfolio message from ${trimmedName.replace(/[\r\n]+/g, ' ')}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        '',
        trimmedMessage,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p>${escapeHtml(trimmedMessage).replaceAll('\n', '<br>')}</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return response.status(502).json({ message: 'Could not send message' });
  }

  return response.status(200).json({ message: 'Message sent' });
}
