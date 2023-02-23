const { Conflict } = require('http-errors');
const { hash } = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
require('dotenv').config();

const { User } = require('../../models');
const { sendVerificationEmail } = require('../../utils');

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new Conflict('Email in use');
  }

  const hashedPwd = await hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const mail = {
    to: email,
    subject: 'Please, confirm your registration',
    html: `<a href=http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}>Click</a> for confirmation`,
  };

  await User.create({ name, email, password: hashedPwd, avatarURL, verificationToken });
  await sendVerificationEmail(mail);

  res.status(201).json({ user: { name, email } });
};

module.exports = registerUser;
