import test from "node:test";
import assert from "node:assert/strict";

import {
    generateToken,
    verifyToken
} from "../../src/utils/jwt.js";

const user = {
    _id: "507f1f77bcf86cd799439011",
    email: "daniela@gmail.com",
    role: "user"
};

test("generateToken debe generar un JWT válido", () => {

    const token = generateToken(user);

    assert.ok(token);

});

test("verifyToken debe devolver el payload correcto", () => {

    const token = generateToken(user);

    const payload = verifyToken(token);

    assert.equal(payload.email, user.email);
    assert.equal(payload.role, user.role);
    assert.equal(payload.id, user._id);

});

test("verifyToken debe lanzar error con un token inválido", () => {

    assert.throws(() => {

        verifyToken("token_invalido");

    });

});