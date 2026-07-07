import "../setup.js";

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../../src/app.js";

const email = `logout${Date.now()}@gmail.com`;
const password = "12345678";

test("POST /api/sessions/logout debe cerrar la sesión", async () => {

    // Registrar usuario
    await request(app)
        .post("/api/sessions/register")
        .send({
            first_name: "Daniela",
            last_name: "Martinez",
            email,
            password
        });

    // Login
    const login = await request(app)
        .post("/api/sessions/login")
        .send({
            email,
            password
        });

    const cookie = login.headers["set-cookie"];

    // Logout
    const logout = await request(app)
        .post("/api/sessions/logout")
        .set("Cookie", cookie);

    assert.equal(logout.status, 200);
    assert.equal(logout.body.status, "success");

    // Intentar acceder nuevamente
    const current = await request(app)
        .get("/api/sessions/current");

    assert.equal(current.status, 401);

});