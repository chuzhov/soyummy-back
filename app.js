const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');

const usersRouter = require("./routes/api/auth");
const mainRouter = require("./routes/api/mainPage");
const ingredientsRouter = require('./routes/api/ingredients')
const recipesRouter = require('./routes/api/ownRecipes')
const popularRecipeRouter = require('./routes/api/popularRecipe');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); //allows to get static files from /public folder
app.set('view engine', 'ejs'); // sets EJS as the view engine for the Express application

app.use("/", mainRouter);
app.use("/auth", usersRouter);
app.use('/recipes', recipesRouter);
app.use('/popular-recipe', popularRecipeRouter);
app.use("/ingredients", ingredientsRouter);
app.use('/ownRecipes', recipesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

//catching mongoose cast error
app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(404).send(err.message);
  }
  next(err);
});

//catching mongoose validation error
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    let errors = {};
    Object.keys(err.errors).forEach(key => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).send(errors);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
