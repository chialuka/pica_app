import nodemailer from 'nodemailer';

const { USER_MAIL, PASSWORD_MAIL, HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: HOST,
  secure: false,
  tls: { rejectUnauthorized: false },
  debug: true,
  auth: {
    user: USER_MAIL,
    pass: PASSWORD_MAIL,
  },
});

/**
 * function for sending email
 * @name mailer
 * @param {Object} param object containing details for sending email
 * @returns {Null} null
 */
const mailer = ({ email, subject, content }) => transporter.sendMail({
  from: `Pica App ${USER_MAIL}`,
  to: email,
  subject,
  html: content,
});

export default mailer;
