const mongoose = require("mongoose");

//Require MongoDBUI
const Key = require("./keys").MONGO_DB_UI;

//Connecting to Database
mongoose.connect(Key, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for Errors
connection.on('error', (err) => {
  if (err) console.log(err);
});

//Check for Connections
connection.once('open', () => console.log(`connecting to mongodb...`));

module.exports = connection;