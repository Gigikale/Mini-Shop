const express = require('express')
const bodyParser = require('body-parser');
const  sequelize  = require('./config/database')
const route  = require('./routes/allRoutes')
const logger = require('morgan')
const app = express()
const dotenv = require("dotenv")

dotenv.config();
app.use(bodyParser.json());
app.use(logger("dev"));
app.use('/api', route)


sequelize.sync({})
.then(() => {
  console.log("Database is connected");
})
.catch((err) => {
  console.log(err);
});

app.listen(3000, ()=>{
  console.log("App running on port 3000")
})
