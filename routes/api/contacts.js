const express = require('express');
const { controllerWrapper, validation, isValidId } = require('../../middlewares');
const { contactJoiSchema } = require('../../models');

const {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
  updateContactById,
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

router.delete('/:contactId', isValidId, controllerWrapper(deleteContact));

module.exports = router;
