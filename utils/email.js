const nodemailer = require('nodemailer')
const ErrorResponse = require('./ErrorResponse.js')
const User = require('../model/User.js')

const sendMail = async (user, subject, html, res, next) => {
  try {

      var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSCODE,
        },
      })
    
      var mailOptions = {
          from: `Zwitter <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject,
          html,
      }

      res.status(200).json({
          success: true,
          id: user._id,
          email: true
      });

      await transporter.sendMail(mailOptions) 

      console.log(`Message sent successfully to ${user.email}`);

  } catch (err) {
      console.log(err)
      // await User.deleteOne({ email: user.email })
      return next(new ErrorResponse('email could not be sent', 500));
  }
}

module.exports = sendMail
