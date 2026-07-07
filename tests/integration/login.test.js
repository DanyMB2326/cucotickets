import "../setup.js";

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../../src/app.js";

const email = `login${Date.now()}@gmail.com`;
const password = "12345678";

test("POST /api/sessions/login debe iniciar sesión correctamente", async () => {

    // Registrar usuario
    await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email,
            password
        });

    // Hacer login
    const response = await request(app)
        .post("/api/sessions/login")
        .send({
            email,
            password
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");

    // Debe crear la cookie
    assert.ok(response.headers["set-cookie"]);

});

test("POST /api/sessions/login debe rechazar credenciales incorrectas", async () => {

    const response = await request(app)
        .post("/api/sessions/login")
        .send({
            email: "correo@inexistente.com",
            password: "12345678"
        });

    assert.equal(response.status, 401);

    assert.equal(
        response.body.message,
        "Credenciales inválidas"
    );

});