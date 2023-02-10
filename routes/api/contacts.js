const express = require('express');
const { controllerWrapper, validation, isValidId } = require('../../middlewares');
const { contactJoiSchema, contactFavoriteSchema } = require('../../models');

const {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
} = require('../../controllers/contacts/');

const router = express.Router();

router.post('/', validation(contactJoiSchema), controllerWrapper(addContact));

router.get('/', controllerWrapper(getAllContacts));

router.get('/:contactId', isValidId, controllerWrapper(getContact));

router.put(
  '/:contactId',
  isValidId,
  validation(contactJoiSchema),
  controllerWrapper(updateContactById)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(contactFavoriteSchema),
  controllerWrapper(updateStatusContact)
);

router.delete('/:contactId', isValidId, controllerWrapper(deleteContact));

module.exports = router;
