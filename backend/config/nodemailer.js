import nodemailer from 'nodemailer';

const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (user && pass && user !== 'your_email@gmail.com' && user !== 'admin@ajstudio.com') {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback to JSON transport for local testing if credentials are missing
  return nodemailer.createTransport({ jsonTransport: true });
};

export default createTransporter;
