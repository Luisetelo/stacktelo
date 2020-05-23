const express = require('express');
const loaders = require('./loaders');
const { port } = require('./config');

const startServer = async () => {
  const app = express();
  await loaders(app);

  app.listen(port, (error) => {
    if (error) {
      throw new Error('Error on listening');
    }
    console.log(`Server listening on port: ${port}`);
  });
};

startServer();
