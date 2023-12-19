import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const emailRegister = async (email: string, token: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    } as SMTPTransport.Options);

    const emailToSend = {
      from: 'WalletTracker <noreply@wallettracker.com>',
      to: email,
      subject: 'WalletTracker - Confirm your email',
      html: `
            <h1>WalletTracker</h1>
            <p>Click <a href="${process.env.FRONTEND_URL}/confirm/${token}">here</a> to confirm your email.</p>
            <p>If you didn't register, please ignore this email.</p>
            `,
    };

    await transport.sendMail(emailToSend);
  } catch (error) {
    throw new Error(error);
  }
};

export const emailRecoverPassword = async (email: string, token: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    } as SMTPTransport.Options);

    const emailToSend = {
      from: 'WalletTracker <noreply@wallettracker.com>',
      to: email,
      subject: 'WalletTracker - Recover Password',
      html: `
            <h1>WalletTracker</h1>
            <p>Click <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">here</a> to recover your password.</p>
            <p>If you didn't requested this, please ignore this email.</p>
            `,
    };

    await transport.sendMail(emailToSend);
  } catch (error) {
    throw new Error(error);
  }
};
