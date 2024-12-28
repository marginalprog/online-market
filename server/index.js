require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');
const https = require('https');
const fs = require('fs');
const { swaggerUi, swaggerSpec } = require('./swagger');

const PORT = process.env.PORT || 3443;
const app = express();

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', router);
app.use(express.static(path.resolve(__dirname, 'static')));

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Swagger available on https://localhost:${PORT}/api-docs`);
    });
    // app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
  } catch (e) {
    console.log(e);
  }
};

start();
