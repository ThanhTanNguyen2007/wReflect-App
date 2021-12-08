import nodemailer from 'nodemailer';
import logger from '../../logger';

export const sendMail = (receiverEmail: string, subject: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wreflectteam@gmail.com',
      pass: 'Domaybiet!23',
    },
  });

  const options = {
    from: 'wreflectteam@gmail.com',
    to: `${receiverEmail}`,
    subject: `${subject}`,
    text: `${content}`,
  };

  transporter.sendMail(options, (err, data) => {
    if (err) {
      logger.error(`Error when send Mail to ${receiverEmail}`);
      return false;
    } else {
      logger.info(`Send mail successfully to ${receiverEmail}`);
      return true;
    }
  });
};
