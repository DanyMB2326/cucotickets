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