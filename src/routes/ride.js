const express = require('express');
const bodyParser = require('body-parser');

const ridesService = require('../service/ride');
const logger = require('../util/logger');

const router = express.Router();
const jsonParser = bodyParser.json();

const riderRoutes = (db) => {
  const service = ridesService(db);

  router.post('/rides', jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (
      startLatitude < -90 || startLatitude > 90
      || startLongitude < -180 || startLongitude > 180
    ) {
      return res.json({
        error_code: 'VALIDATION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

    const lastID = await service.insert(values);

    const last = await service.getOne(lastID);

    res.send(last);
  });

  router.get('/rides', async (req, res) => {
    const rows = await service.getAll();
    res.send(rows);
  });

  router.get('/rides/p/:page', async (req, res) => {
    const { page } = req.params;
    const { size } = req.query;
    try {
      const paged = await service.getPage(+page, +size);
      res.send(paged);
    } catch (e) {
      logger.error(`Error while fetching rides' page: ${e}`);
      res.status(500).send(e);
    }
  });

  router.get('/rides/:id', async (req, res) => {
    try {
      const ride = await service.getOne(req.params.id);
      res.send(ride);
    } catch (e) {
      logger.error(`Error while fetching ride: ${JSON.stringify(e)}`);
      res.status(400).send(e);
    }
  });

  return router;
};

module.exports = riderRoutes;
