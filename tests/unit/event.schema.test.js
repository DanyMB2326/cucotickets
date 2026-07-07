import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createEventSchema } from '../../src/schemas/event.schema.js';

describe('createEventSchema', () => {
    test('acepta un evento válido', () => {
        const result = createEventSchema.safeParse({
            title: 'Conferencia de Tecnología',
            description: 'Una conferencia sobre las últimas tendencias en tecnología',
            date: '2026-10-15',
            location: 'CDMX',
            capacity: 100,
        });

        assert.equal(result.success, true);
    });

    test('rechaza un evento sin título', () => {
        const result = createEventSchema.safeParse({
            description: 'Una descripción válida y suficientemente larga',
            date: '2026-10-15',
            location: 'CDMX',
        });

        assert.equal(result.success, false);
    });

    test('rechaza una fecha inválida', () => {
        const result = createEventSchema.safeParse({
            title: 'Evento válido',
            description: 'Una descripción válida y suficientemente larga',
            date: 'no-es-una-fecha',
            location: 'CDMX',
        });

        assert.equal(result.success, false);
    });
});
