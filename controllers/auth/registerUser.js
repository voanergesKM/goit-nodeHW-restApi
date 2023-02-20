const { Conflict } = require('http-errors');
const { hash } = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new Conflict('Email in use');
  }

  const hashedPwd = await hash(password, 10);
  const avatarURL = gravatar.url(email);

  await User.create({ name, email, password: hashedPwd, avatarURL });

  res.status(201).json({ user: { name, email } });
};

module.exports = registerUser;
