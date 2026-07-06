import eventsDao from '../dao/events.dao.js';

// El repositorio abstrae el origen de los datos (DAO) de la capa de servicios.
// Esto permite cambiar la fuente de datos (memoria, MongoDB, etc.)
// sin afectar la lógica de negocio.

class EventsRepository {
    async getAll() {
        return eventsDao.getAll();
    }

    async getById(id) {
        return eventsDao.getById(id);
    }

    async create(eventData) {
        return eventsDao.create(eventData);
    }
}

export default new EventsRepository();
