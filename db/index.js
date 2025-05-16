const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/job-board-db')
  .then(() => {
    console.log('db connected successfully');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
