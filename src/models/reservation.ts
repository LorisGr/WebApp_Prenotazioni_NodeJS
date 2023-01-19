const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/all', reservationController.getAllReservations);
router.get('/date', reservationController.getReservationsByDate);
router.get('/fiscalCode', reservationController.getReservationsByFiscalCode);
router.get('/ticket', reservationController.getReservationByTicket);
router.post('/', reservationController.createReservation);
router.delete('/', reservationController.deleteReservation);

module.exports = router;