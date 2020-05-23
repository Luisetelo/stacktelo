const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
