const { Router } = require('express');

const { updateSubscriptionJoiSchema, verifyEmailJoiSchema } = require('../../models');
const { controllerWrapper, auth, validation, upload } = require('../../middlewares');

const {
  usersControllers: { getCurrent, updateSubscription, updateAvatar, verifyEmail, resendVerify },
} = require('../../controllers');

const router = Router();

router.post('/verify', validation(verifyEmailJoiSchema), controllerWrapper(resendVerify));

router.get('/current', auth, controllerWrapper(getCurrent));

router.get('/verify/:verificationToken', controllerWrapper(verifyEmail));

router.patch(
  '/',
  auth,
  validation(updateSubscriptionJoiSchema),
  controllerWrapper(updateSubscription)
);

router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(updateAvatar));

module.exports = router;
