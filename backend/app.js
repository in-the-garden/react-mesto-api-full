const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateRegister } = require('./middlewares/validate');

const { PORT = 3003 } = process.env;
const app = express();

const corsOption = {
  origin: '*',
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  credentials: true,
};

app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .catch((err) => {
    throw err;
  });

// Подключаем логгер запросов
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', validateRegister, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

// Подключаем логгер ошибок
app.use(errorLogger);

// Если нет корректного маршрута
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Обработка ошибок Celebrate
app.use(errors());

// Подключение центрального обработчика ошибок
app.use(errorHandler);

app.listen(PORT);
