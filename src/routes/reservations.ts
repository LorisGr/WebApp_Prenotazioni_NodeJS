import _ from 'lodash';

class Reservation {
    private date: string;
    private fiscalCode: string;
    private ticket: string;

    // Costruttore che accetta data e codice fiscale come argomenti
    // e genera un ticket univoco per la prenotazione
    constructor(date: string, fiscalCode: string) {
        this.date = date;
        this.fiscalCode = fiscalCode;
        this.ticket = this.generateTicket();
    }

    public getDate(): string {
        return this.date;
    }

    public getFiscalCode(): string {
        return this.fiscalCode;
    }

    public getTicket(): string {
        return this.ticket;
    }

    // Metodo privato per generare un ticket univoco
    private generateTicket(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

class Reservations {
    private reservations: Reservation[] = [];

    // Metodo per aggiungere una prenotazione al database in memoria
    public save(reservation: Reservation): void {
        this.reservations.push(reservation);
    }

    // Metodo per rimuovere una prenotazione dal database in memoria
    // utilizzando il ticket univoco come identificatore 
    public delete(ticket: string): void {
        _.remove(this.reservations, (res) => res.getTicket() === ticket);
    }

    public getReservations(): Reservation[] {
        return this.reservations;
    }
    
}

export { Reservation, Reservations };