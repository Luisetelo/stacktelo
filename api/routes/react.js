const express = require('express');
const path = require('path');
const { environment } = require('../../config');

module.exports = (router) => {
  if (environment === 'production') {
    // Serve any static files
    router.use(
      express.static(
        path.join(__dirname.replace('api/routes', ''), 'client/build')
      )
    );

    // Handle React routing, return all requests to React app
    router.get('*', (req, res) => {
      res.sendFile(
        path.join(
          __dirname.replace('api/routes', ''),
          'client/build',
          'index.html'
        )
      );
    });
  }
};
