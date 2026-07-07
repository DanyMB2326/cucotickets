import "../setup.js";

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../../src/app.js";

const email = `current${Date.now()}@gmail.com`;
const password = "12345678";

test("GET /api/sessions/current - Usuario autenticado", async () => {

    await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email,
            password
        });

    const login = await request(app)
        .post("/api/sessions/login")
        .send({
            email,
            password
        });

    const cookie = login.headers["set-cookie"];

    const response = await request(app)
        .get("/api/sessions/current")
        .set("Cookie", cookie);

    assert.equal(response.status, 200);

    assert.equal(response.body.payload.email, email);

});

test("GET /api/sessions/current - Sin autenticación", async () => {

    const response = await request(app)
        .get("/api/sessions/current");

    assert.equal(response.status, 401);

});