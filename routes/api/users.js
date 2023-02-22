const { Router } = require('express');

const { updateSubscriptionJoiSchema } = require('../../models');
const { controllerWrapper, auth, validation, upload } = require('../../middlewares');

const {
  usersControllers: { getCurrent, updateSubscription, updateAvatar },
} = require('../../controllers');

const router = Router();

router.get('/current', auth, controllerWrapper(getCurrent));

router.patch(
  '/',
  auth,
  validation(updateSubscriptionJoiSchema),
  controllerWrapper(updateSubscription)
);

router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(updateAvatar));

module.exports = router;
