import _ from 'lodash';
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const reservationController = require('./controller/reservationController');
const reservationModel = require('./src/models/reservation');
const reservationRoutes = require('./src/routes/reservation');


app.use('/reservations', reservationRoutes);
