const config = require('../config/config');

let mongoose = require('mongoose')
const db = {};


mongoose.Promise = global.Promise;

db.mongoose= mongoose;
db.uri= config.uri;
db.students = require('../models/students')(mongoose);

db.mongoose
.connect(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});
module.exports= db