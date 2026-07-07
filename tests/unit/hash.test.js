import test from "node:test";
import assert from "node:assert/strict";

import {
    createHash,
    isValidPassword
} from "../../src/utils/hash.js";

test("createHash debe generar un hash diferente al password", () => {

    const password = "12345678";

    const hash = createHash(password);

    assert.notEqual(hash, password);

});

test("isValidPassword debe validar correctamente la contraseña", () => {

    const password = "12345678";

    const hash = createHash(password);

    const valid = isValidPassword(password, hash);

    assert.equal(valid, true);

});

test("isValidPassword debe rechazar una contraseña incorrecta", () => {

    const password = "12345678";

    const hash = createHash(password);

    const valid = isValidPassword("passwordIncorrecto", hash);

    assert.equal(valid, false);

});