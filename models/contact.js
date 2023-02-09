const { model, Schema } = require('mongoose');
const Joi = require('joi');

const emailRegex =
  /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegex },
    phone: { type: String, required: true, unique: true },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const handleError = (error, data, next) => {
  const { name, code } = error;

  if (name === 'MongoServerError' && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }

  next();
};

contactSchema.post('save', handleError);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegex),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, contactJoiSchema };
