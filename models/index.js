const { Contact, contactJoiSchema, contactFavoriteSchema } = require('./contact');
const {
  User,
  registerJoiSchema,
  loginJoiSchema,
  updateSubscriptionJoiSchema,
  verifyEmailJoiSchema,
} = require('./userAuth');

module.exports = {
  Contact,
  contactJoiSchema,
  contactFavoriteSchema,
  User,
  registerJoiSchema,
  loginJoiSchema,
  updateSubscriptionJoiSchema,
  verifyEmailJoiSchema,
};
