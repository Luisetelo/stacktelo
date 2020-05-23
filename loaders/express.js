const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const routes = require('../api/routes');

module.exports = (app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(bearerToken());

  app.use(routes());
};
