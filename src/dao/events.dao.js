// DAO de eventos.
// Por ahora usa un arreglo en memoria como placeholder.
// En próximas entregas este archivo se reemplazará por el acceso
// real a MongoDB (Mongoose) sin modificar las capas superiores.

const events = [];

class EventsDao {
    async getAll() {
        return events;
    }

    async getById(id) {
        return events.find((event) => event.id === id) || null;
    }

    async create(eventData) {
        events.push(eventData);
        return eventData;
    }
}

export default new EventsDao();
