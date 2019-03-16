const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsPath = path.join(__dirname, '../models');
// const modelsPath = path.resolve('server/models');

mongoose.connect('mongodb://localhost/practice', {
  useNewUrlParser: true,
  createIndexes: true,
});
mongoose.connection.on('connected', () => console.log('Connected to Mongodb'));

fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => require(path.join(modelsPath, file)));