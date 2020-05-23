const { Router } = require('express');
const react = require('./react');
const auth = require('./auth');

module.exports = () => {
  const router = Router();
  auth(router);
  react(router);
  return router;
};
