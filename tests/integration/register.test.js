import "../setup.js";

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../../src/app.js";

test("POST /api/sessions/register debe responder", async () => {

    const response = await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Prueba",
            last_name: "Testing",
            email: `test${Date.now()}@gmail.com`,
            password: "12345678"
        });

    console.log("Status:", response.status);
    console.log("Body:", response.body);

    assert.equal(response.status, 201);

});

test("POST /api/sessions/register - Email inválido", async () => {

    const response = await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email: "correo-invalido",
            password: "12345678"
        });

    assert.equal(response.status, 400);

});

test("POST /api/sessions/register - Password demasiado corta", async () => {

    const response = await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email: `short${Date.now()}@gmail.com`,
            password: "123"
        });

    assert.equal(response.status, 400);

});

test("POST /api/sessions/register - Usuario duplicado", async () => {

    const email = `duplicado${Date.now()}@gmail.com`;

    await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email,
            password: "12345678"
        });

    const response = await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email,
            password: "12345678"
        });

    assert.equal(response.status, 400);

});