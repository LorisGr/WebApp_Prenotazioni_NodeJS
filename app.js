require = require("esm")(module);
const express =require('express');

const http = require('http');
const server = http.createServer(app);

const reservationController = require('./src/controller/reservationController');
const reservationModel = require('./src/routes/reservations');
const reservationRoutes = require('./src/models/reservation');


app.use('/reservations', reservationRoutes);
