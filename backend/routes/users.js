const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, updateUserInfo, updateAvatar,
} = require('../controllers/users');
const { validateURL } = require('../utils/validation');

userRouter.get('/', getUsers);

userRouter.get('/me', getUser);

userRouter.patch('/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().hex().required(),
    }).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo);

userRouter.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().hex().required(),
    }).unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
