const reservationModel = require('../routes/reservations.ts');

exports.getAllReservations = (req, res) => {
    // Codice per trovare tutte le prenotazioni
    Reservation.find()
        .then(reservations => res.json(reservations))
        .catch(err => res.status(500).json({error: 'Impossibile effettuare la prenotazione'}));
};

exports.getReservationsByDate = (req, res) => {
    // Prenotazioni filtrate per data
    const date = req.query.date;
    Reservation.find({date: date})
        .then(reservations => res.json(reservations))
        .catch(err => res.status(500).json({error: 'Impossibile effettuare la prenotazione'}));
};

exports.getReservationsByFiscalCode = (req, res) => {
    // Prenotazioni filtrate per codice fiscale
    const fiscalCode = req.query.fiscalCode;
    Reservation.find({fiscalCode: fiscalCode})
        .then(reservations => res.json(reservations))
        .catch(err => res.status(500).json({error: 'Impossibile effettuare la prenotazione'}));
};

exports.getReservationByTicket = (req, res) => {
    // Prenotazioni filtrate per ticket
    const ticket = req.query.ticket;
    Reservation.findOne({ticket: ticket})
        .then(reservation => res.json(reservation))
        .catch(err => res.status(500).json({error: 'Impossibile effettuare la prenotazione'}));
};

exports.createReservation = (req, res) => {
    // Codice per creare e salvare nuove prenotazioni nel db
    const date = req.query.date;
    const fiscalCode = req.query.fiscalCode;
    const newReservation = new Reservation(date, fiscalCode);
    newReservation.save()
        .then(() => res.json({ticket: newReservation.ticket}))
        .catch(err => res.status(500).json({error: 'Prenotazione non riuscita'}));
};

exports.deleteReservation = (req, res) => {
    // Codice per eliminare la prenotazione dal db
    const date = req.query.date;
    const fiscalCode = req.query.fiscalCode;
    const ticket = req.query.ticket;
    Reservation.findOneAndDelete({date: date, fiscalCode: fiscalCode, ticket: ticket})
        .then(() => res.json({message: 'Prenotazione Cancellata'}))
        .catch(err => res.status(500).json({error: 'Cancellazione prenotazione fallita'}));
};
