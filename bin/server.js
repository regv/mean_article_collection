const http = require("http");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

//Setup Http-Logger Morgan Middleware
app.use(logger('dev'));

app.use(cors());

//Require Routes
const postRoute = require("../api/routes/post");
const userRoute = require("../api/routes/user");
const dashboardRoute = require("../api/routes/dashboard");

//Setup Body-Parser & Cookie-Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

//Require Passport 
require("../api/config/passport")(passport);

//Require Database Connection
const MongoConnection = require("../api/config/database");

//Handling CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      res.status(200).json({});
  }
  next();
});

//Post Route
app.use('/api', postRoute);

//User Router
app.use('/user', userRoute);

//Dashboard Route
app.use('/api', dashboardRoute);

//Setup Port & Listen to Server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server running on port ${port}!!`));