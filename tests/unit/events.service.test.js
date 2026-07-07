import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import eventsService from '../../src/services/events.service.js';

// Pruebas unitarias de la capa de servicio de eventos.
// Nota: por ahora el DAO usa un arreglo en memoria, así que estas pruebas
// verifican el comportamiento real de la capa completa (service -> repository -> dao).
// Cuando se migre a MongoDB, el DAO se podrá mockear para aislar el service.

describe('EventsService', () => {
    test('getAllEvents devuelve un arreglo', async () => {
        const events = await eventsService.getAllEvents();
        assert.ok(Array.isArray(events));
    });

    test('createEvent agrega un evento y luego puede recuperarse por id', async () => {
        const created = await eventsService.createEvent({
            id: 'evt-test-1',
            title: 'Evento de prueba',
            description: 'Descripción de prueba',
            date: '2026-09-01',
            location: 'CDMX',
            capacity: 50,
        });

        assert.equal(created.id, 'evt-test-1');

        const found = await eventsService.getEventById('evt-test-1');
        assert.ok(found);
        assert.equal(found.title, 'Evento de prueba');
    });

    test('getEventById devuelve null si el evento no existe', async () => {
        const found = await eventsService.getEventById('id-inexistente');
        assert.equal(found, null);
    });
});
