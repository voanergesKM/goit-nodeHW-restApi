const { NotFound, BadRequest } = require('http-errors');

const { User } = require('../../models');
const { sendVerificationEmail } = require('../../utils');

const resendVerify = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Please, confirm your registration',
    html: `<a href=http://localhost:${process.env.PORT}/api/users/verify/${user.verificationToken}>Click</a> for confirmation`,
  };

  await sendVerificationEmail(mail);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendVerify;
