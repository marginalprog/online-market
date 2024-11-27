require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors'); // отправка запросов с фронта
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors()); // использование приложением cors
app.use(express.json()); // парсинг json-ов
app.use(fileUpload({}));
app.use('/api/v1', router); // парсинг json-ов
app.use(express.static(path.resolve(__dirname, 'static'))); // отображение статики по адресу

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // авторизация в бд
    await sequelize.sync({ alter: true }); // сверка состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
  } catch (e) {
    console.log(e);
  }
};

start();
