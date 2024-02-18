const mongoose = require('mongoose');
 
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
  .connect('mongodb://127.0.0.1:27017/pusherPoll')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));