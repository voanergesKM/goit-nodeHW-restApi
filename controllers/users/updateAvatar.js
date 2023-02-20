const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { NotAcceptable } = require('http-errors');

const { User } = require('../../models');

const destinationDir = path.join(__dirname, '../../public/avatars');

const updateAvatar = async (req, res, next) => {
  const { path: tempPath, filename, mimetype } = req.file;
  const { _id } = req.user;

  if (mimetype !== 'image/jpeg') {
    await fs.unlink(tempPath);
    throw new NotAcceptable('Please, select an image');
  }

  try {
    const fileExtention = filename.split('.').pop();
    const avatarName = `${_id}.${fileExtention}`;
    const avatarUpload = path.join(destinationDir, avatarName);

    const avatarURL = path.join('avatars', avatarName);

    const tempAvatar = await Jimp.read(tempPath);

    await tempAvatar.resize(250, 250).write(avatarUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    throw new Error(error);
  } finally {
    await fs.unlink(tempPath);
  }
};

module.exports = updateAvatar;
