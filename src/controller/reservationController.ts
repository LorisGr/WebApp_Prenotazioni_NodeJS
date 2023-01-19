import { Reservations, Reservation } from '../routes/reservations';
const reservations = new Reservations();

export const getAllReservations = (req, res) => {
    res.json(reservations.getReservations());
};

export const getReservationsByDate = (req, res) => {
    const date = req.query.date;
    const filtered = reservations.getReservations().filter(reservation => reservation.getDate() === date);
    res.json(filtered);
};

export const getReservationsByFiscalCode = (req, res) => {
    const fiscalCode = req.query.fiscalCode;
    const filtered = reservations.getReservations().filter(reservation => reservation.getFiscalCode() === fiscalCode);
    res.json(filtered);
};

export const getReservationByTicket = (req, res) => {
    const ticket = req.query.ticket;
    const found = reservations.getReservations().find(reservation => reservation.getTicket() === ticket);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: "Reservation not found" });
    }
};

export const createReservation = (req, res) => {
    const date = req.query.date;
    const fiscalCode = req.query.fiscalCode;
    const newReservation = new Reservation(date, fiscalCode);
    reservations.save(newReservation);
    res.json({ ticket: newReservation.getTicket() });
};

export const deleteReservation = (req, res) => {
    const ticket = req.query.ticket;
    const found = reservations.getReservations().find(reservation => reservation.getTicket() === ticket);
    if (found) {
    reservations.delete(found.getTicket());
    res.json({ message: "Reservation deleted" });
    } else {
    res.status(404).json({ error: "Reservation not found" });
    }
};
