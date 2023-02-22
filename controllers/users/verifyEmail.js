const { NotFound } = require('http-errors');

const { User } = require('../../models');

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
  res.json({ message: 'Verification successful' });
};

module.exports = verifyEmail;
