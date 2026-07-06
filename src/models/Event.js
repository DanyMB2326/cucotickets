// Modelo base de Evento.
// En próximas entregas se sumarán cupos, inscripciones y relación con sesiones.

export class Event {
    constructor({ id, title, description, date, location, capacity = 0 }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.capacity = capacity;
    }
}

export default Event;
