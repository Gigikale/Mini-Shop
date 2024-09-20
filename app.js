const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const route = require('./routes/allRoutes');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();


app.use(cors()); 
app.use(bodyParser.json());
app.use(logger('dev'));


app.use('/api', route);


sequelize.sync({})
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
