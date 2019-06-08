import mailer from './mailModule';


const { SERVER_URL } = process.env;

/**
 * function for composing and sending verification email
 * @name sendVerifyEmail
 * @param {String} email
 * @returns {Function} function that sends email to user
 */
const sendVerifyEmail = (email, confirmCode) => {
  const data = {
    email,
    subject: 'Welcome to Pica: Verify Email',
    content: `
    <div style="text-align:center">
    <p style="font-size:16px">
    Welcome onboard, our amazing journey has started!
    <br>
    Let's confirm your email.</p>
    <p>By clicking on the following link, 
    you're confirming your email address</p>
    <p style="margin:30px">
    <a style="text-decoration:none; background-color:blue;
    padding:20px; color:white; border-radius:4px"
    href=${SERVER_URL}/users/verifyEmail/${email}/${confirmCode}>
    Confirm Email</a></p>
    <p>Kindly disregard this email 
    if you did not sign up for an Pica account.</p>
    <p><a style="text-decoration:none; font-size:14px; font-weight:bold"
    href=${SERVER_URL}>Pica World</a>
    <br>
    <span style="font-style:italic; font-size:10px">
    Share, Inspire, Grow...</span></p>
    <p style="margin:10px">© Pica World Inc. Lagos, Nigeria.</p>
    </div>
    `,
  };
  return mailer(data);
};

export default sendVerifyEmail;
