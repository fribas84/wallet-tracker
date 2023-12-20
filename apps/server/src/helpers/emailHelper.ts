import axios from 'axios';
import { Logger } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';
const logger = new Logger('HELPER');
export const emailRegister = async (email: string, token: string) => {
  
  const params = {
    email_to: email,
    url: `${process.env.FRONTEND_URL}/confirm/${token}`,
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_CONFIRM_TEMPLATE_ID as string,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
        privateKey: process.env.EMAILJS_PRIVATE_KEY as string,
      },
    );
  } catch (error) {
    logger.error(
      'Failed to send email',
      error.message || JSON.stringify(error),
    );
    throw error; // Or handle the error as per your application's needs
  }
};

export const emailRecoverPassword = async (email: string, token: string) => {

  const params = {
    email_to: email,
    url: `${process.env.FRONTEND_URL}/forgot-password/${token}`,
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_RESET_TEMPLATE_ID as string,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
        privateKey: process.env.EMAILJS_PRIVATE_KEY as string,
      },
    );
  } catch (error) {
    logger.error(
      'Failed to send email',
      error.message || JSON.stringify(error),
    );
    throw error; // Or handle the error as per your application's needs
  }
  
};
