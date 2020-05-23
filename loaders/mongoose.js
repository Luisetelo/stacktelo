const mongoose = require('mongoose');
const { mongodbUri } = require('../config');

module.exports = async () => {
  // To debug a connection error but it is shown in the console anyway
  // mongoose.connection.on('error', (error) => {
  //   console.error('Mongoose connection error:', error);
  // });
  const mongooseInstance = await mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return mongooseInstance.connection;
};
