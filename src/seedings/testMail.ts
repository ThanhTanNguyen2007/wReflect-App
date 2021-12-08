import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wreflectteam@gmail.com',
    pass: 'Domaybiet!23',
  },
});

const options = {
  from: 'wreflectteam@gmail.com',
  to: 'nguyentanmanh2323@gmail.com',
  subject: 'testing and testing',
  html: '<h1>Your account was hacked, sorry u must follow this link to validate<h1>',
};

transporter.sendMail(options, (err, data) => {
  if (err) {
    console.log('have error');
  } else {
    console.log('send mail successfully', data);
  }
});
