const express = require('express');

const router = express.Router();

const utilRoutes = () => {
  router.get('/health', (req, res) => res.send('Healthy'));

  return router;
};

module.exports = utilRoutes;
