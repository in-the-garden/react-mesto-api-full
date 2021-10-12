const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCardInfo, validateCardId } = require('../middlewares/validate');

cardRouter.get('/', getCards);

cardRouter.post('/', validateCardInfo, createCard);

cardRouter.delete('/:cardId', validateCardId, deleteCard);

cardRouter.put('/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
