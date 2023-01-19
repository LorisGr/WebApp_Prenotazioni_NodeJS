import express from 'express';
import {
  getAllReservations,
  getReservationsByDate,
  getReservationsByFiscalCode,
  getReservationByTicket,
  createReservation,
  deleteReservation
} from './src/controller/reservationController';

const app = express();
const router = express.Router();

router.get('/reservations', getAllReservations);
router.get('/reservations/date', getReservationsByDate);
router.get('/reservations/fiscalCode', getReservationsByFiscalCode);
router.get('/reservations/ticket', getReservationByTicket);
router.post('/reservations', createReservation);
router.delete('/reservations', deleteReservation);

app.use(router);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/',(_req, res) => {
  res.send('Hello World!')
});
