import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const [ticket, setTicket] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/reservations?date=${selectedDate}&fiscalCode=${fiscalCode}`);
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err);
    }
  };

  const createReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/reservations', {
        method: 'POST',
        body: JSON.stringify({ date: selectedDate, fiscalCode }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTicket(data.ticket);
      fetchReservations();
    } catch (err) {
      setError(err);
    }
  };

  const deleteReservation = async (ticket) => {
    try {
      await fetch(`/reservations?ticket=${ticket}`, {
        method: 'DELETE',
      });
      fetchReservations();
    } catch (err) {
        setError(err);
        }
        };
        
        return (
        <div>
        <form>
        <label>
        Data:
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </label>
        <br />
        <label>
        Codice fiscale:
        <input type="text" value={fiscalCode} onChange={e => setFiscalCode(e.target.value)} />
        </label>
        <br />
        <button onClick={createReservation}>Prenota</button>
        </form>
        {error && <p>{error}</p>}
        <h2>Prenotazioni</h2>
        <ul>
        {reservations.map(reservation => (
        <li key={reservation.ticket}>
        {reservation.date} - {reservation.fiscalCode}
        <button onClick={() => deleteReservation(reservation.ticket)}>Cancella prenotazione</button>
        </li>
        ))}
        </ul>
        </div>
        );
        }
        
        export default App;
