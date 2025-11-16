import nodemailer from 'nodemailer';

export type AdminMail = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM } = process.env;

  // If any of the SMTP essentials are missing, use Ethereal for dev preview
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    // Default from if not provided
    (transporter as any)._from = MAIL_FROM || `Portfolio <${testAccount.user}>`;
    return transporter;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  (transporter as any)._from = MAIL_FROM || `Portfolio <${SMTP_USER}>`;
  return transporter;
}

async function getTransporter() {
  if (!transporterPromise) transporterPromise = createTransporter();
  return transporterPromise;
}

export async function sendAdminNotification(to: string, data: AdminMail) {
  const transporter = await getTransporter();
  const from = (transporter as any)._from as string;
  const subject = data.subject && data.subject.trim() ? data.subject : 'New contact form submission';

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    replyTo: `${data.name} <${data.email}>`,
    text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    html: `<p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p><p>${data.message.replace(/\n/g, '<br/>')}</p>`,
  });

  // Log preview URL when using Ethereal
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) {
    // eslint-disable-next-line no-console
    console.log(`[mail] Admin preview: ${preview}`);
  }
}

export async function sendAutoReply(to: string, name: string) {
  const transporter = await getTransporter();
  const from = (transporter as any)._from as string;

  const info = await transporter.sendMail({
    from,
    to,
    subject: 'Thanks for contacting us',
    text: `Hi ${name},\n\nThanks for reaching out. We received your message and will get back to you soon.`,
    html: `<p>Hi ${name},</p><p>Thanks for reaching out. We received your message and will get back to you soon.</p>`,
  });
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) {
    // eslint-disable-next-line no-console
    console.log(`[mail] Auto-reply preview: ${preview}`);
  }
}

