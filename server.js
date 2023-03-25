const mongoose = require('mongoose');
global.TextEncoder = require('fast-text-encoding').TextEncoder;

const app = require('./app');

const { DB_HOST, PORT = 4000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(
      `Database connection successfully established.\nListening port ${PORT}`
    );
  })
  .catch(error => {
    process.exit(1);
  });

module.exports = app;
