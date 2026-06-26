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
    return response.status(500).json({
      message: `Missing email configuration: ${missingEnv.join(', ')}`,
    });
  }

  const { name, email, message } = request.body ?? {};
  const trimmedName = String(name ?? '').trim();
  const trimmedEmail = String(email ?? '').trim();
  const trimmedMessage = String(message ?? '').trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return response.status(400).json({ message: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return response.status(400).json({ message: 'Enter a valid email address' });
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

  await transporter.sendMail({
    from: process.env.CONTACT_FROM ?? process.env.SMTP_USER,
    to: process.env.CONTACT_TO,
    replyTo: trimmedEmail,
    subject: `Portfolio message from ${trimmedName}`,
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

  return response.status(200).json({ message: 'Message sent' });
}
