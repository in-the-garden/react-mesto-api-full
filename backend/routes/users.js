const userRouter = require('express').Router();
const {
  getUser, getUsers, updateUserInfo, updateAvatar,
} = require('../controllers/users');
const { validateUpdateInfo, validateUpdateAvatar } = require('../middlewares/validate');

userRouter.get('/', getUsers);

userRouter.get('/me', getUser);

userRouter.patch('/me', validateUpdateInfo, updateUserInfo);

userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRouter;
