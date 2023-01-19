import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, [selectedDate, fiscalCode]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/reservations?date=${selectedDate}&fiscalCode=${fiscalCode}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.toString());
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
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchReservations();
    } catch (err) {
      setError(err.toString());
    }
  };

  const deleteReservation = async (ticket) => {
    try {
      const response = await fetch(`/reservations?ticket=${ticket}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchReservations();
    } catch (err) {
      setError(err.toString());
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
        <div>
        <p>{error}</p>
      </div>
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
};

export default App;

