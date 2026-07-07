import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../../src/app.js';

describe('Integración: /api/health', () => {
    test('GET /api/health responde 200 y status ok', async () => {
        const res = await request(app).get('/api/health');
        assert.equal(res.status, 200);
        assert.equal(res.body.status, 'ok');
    });
});

describe('Integración: /api/events', () => {
    test('GET /api/events responde 200 con un arreglo', async () => {
        const res = await request(app).get('/api/events');
        assert.equal(res.status, 200);
        assert.ok(Array.isArray(res.body.payload));
    });

    test('POST /api/events con datos inválidos responde 400', async () => {
        const res = await request(app).post('/api/events').send({ title: 'ab' });
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
    });

    test('POST /api/events con datos válidos responde 201', async () => {
        const res = await request(app).post('/api/events').send({
            title: 'Evento de integración',
            description: 'Descripción suficientemente larga para pasar la validación',
            date: '2026-11-01',
            location: 'Guadalajara',
            capacity: 30,
        });

        assert.equal(res.status, 201);
        assert.equal(res.body.payload.title, 'Evento de integración');
    });
});

describe('Integración: ruta inexistente', () => {
    test('GET /api/no-existe responde 404', async () => {
        const res = await request(app).get('/api/no-existe');
        assert.equal(res.status, 404);
        assert.equal(res.body.status, 'error');
    });
});
