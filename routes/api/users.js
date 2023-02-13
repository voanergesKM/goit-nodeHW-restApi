const { Router } = require('express');
const { controllerWrapper, auth } = require('../../middlewares');

const {
  usersControllers: { getCurrent },
} = require('../../controllers');

const router = Router();

router.get('/current', auth, controllerWrapper(getCurrent));

module.exports = router;
