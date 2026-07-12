import "../setup.js";

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../../src/app.js";

import User from "../../src/models/User.js";
import Event from "../../src/models/Event.js";
import Ticket from "../../src/models/Ticket.js";

let organizerCookie;
let userCookie;

let organizerId;
let userId;

let eventId;
let ticketId;

const organizerEmail =
    `organizer${Date.now()}@gmail.com`;

const userEmail =
    `user${Date.now()}@gmail.com`;

const password = "12345678";

/* ==========================================================
   PREPARAR DATOS
========================================================== */

test("Preparar usuarios y evento", async () => {

    // Limpiar colecciones
    await Ticket.deleteMany({});
    await Event.deleteMany({});

    /*
     * Registrar organizer
     */

    await request(app)
        .post("/api/sessions/register")
        .send({

            first_name: "Oscar",

            last_name: "Organizer",

            email: organizerEmail,

            password

        });

    // Convertir en organizer
    await User.updateOne(

        {
            email: organizerEmail
        },

        {
            role: "organizer"
        }

    );

    const organizer =
        await User.findOne({
            email: organizerEmail
        });

    organizerId = organizer.id.toString();

    /*
     * Login organizer
     */

    const loginOrganizer =
        await request(app)

            .post("/api/sessions/login")

            .send({

                email: organizerEmail,

                password

            });

    assert.equal(
        loginOrganizer.status,
        200
    );

    organizerCookie =
        loginOrganizer.headers["set-cookie"];

    /*
     * Crear evento
     */

    const createEvent =
        await request(app)

            .post("/api/events")

            .set(
                "Cookie",
                organizerCookie
            )

            .send({

                title: "Evento Test",

                description: "Evento para pruebas",

                category: "Workshop",

                date: "2030-12-20T10:00:00.000Z",

                location: "UNAM",

                capacity: 5,

                price: 100

            });
    
    assert.equal(
        createEvent.status,
        201
    );

    eventId =
        createEvent.body.payload.id;

    /*
     * Publicar evento
     */

    const publish =
        await request(app)

            .patch(
                `/api/events/${eventId}/status`
            )

            .set(
                "Cookie",
                organizerCookie
            )

            .send({

                status: "published"

            });

    assert.equal(
        publish.status,
        200
    );

    /*
     * Registrar user
     */

    await request(app)

        .post("/api/sessions/register")

        .send({

            first_name: "Daniela",

            last_name: "User",

            email: userEmail,

            password

        });

    const user =
        await User.findOne({

            email: userEmail

        });

    userId =
        user.id.toString();

    /*
     * Login user
     */

    const loginUser =
        await request(app)

            .post("/api/sessions/login")

            .send({

                email: userEmail,

                password

            });

    assert.equal(
        loginUser.status,
        200
    );

    userCookie =
        loginUser.headers["set-cookie"];

});

/* ==========================================================
   TICKETS
========================================================== */

test("Crear ticket", async () => {

    const response =
        await request(app)

            .post(`/api/events/${eventId}/tickets`)

            .set(
                "Cookie",
                userCookie
            )

            .send({

                quantity: 1

            });

    assert.equal(
        response.status,
        201
    );

    assert.equal(
        response.body.status,
        "success"
    );

    ticketId =
        response.body.payload.id;

});

test("No permitir ticket duplicado", async () => {

    const response =
        await request(app)

            .post(`/api/events/${eventId}/tickets`)

            .set(
                "Cookie",
                userCookie
            )

            .send({

                quantity: 1

            });

    assert.equal(
        response.status,
        409
    );

});

test("Mis tickets", async () => {

    const response =
        await request(app)

            .get("/api/tickets/my-tickets")

            .set(
                "Cookie",
                userCookie
            );

    assert.equal(
        response.status,
        200
    );

    assert.ok(
        Array.isArray(
            response.body.payload
        )
    );

    assert.equal(
        response.body.payload.length,
        1
    );

});

test("Organizer consulta tickets de su evento", async () => {

    const response =
        await request(app)

            .get(
                `/api/events/${eventId}/tickets`
            )

            .set(
                "Cookie",
                organizerCookie
            );

    assert.equal(
        response.status,
        200
    );

});

test("User no puede consultar tickets del evento", async () => {

    const response =
        await request(app)

            .get(
                `/api/events/${eventId}/tickets`
            )

            .set(
                "Cookie",
                userCookie
            );

    assert.equal(
        response.status,
        403
    );

});

test("Evento inexistente", async () => {

    const response =
        await request(app)

            .post(
                "/api/events/64aaaaaaaaaaaaaaaaaaaaaa/tickets"
            )

            .set(
                "Cookie",
                userCookie
            )

            .send({

                quantity: 1

            });

    assert.equal(
        response.status,
        404
    );

});

test("Crear ticket sin autenticación", async () => {

    const response =
        await request(app)

            .post(
                `/api/events/${eventId}/tickets`
            )

            .send({

                quantity: 1

            });

    assert.equal(
        response.status,
        401
    );

});

/* ==========================================================
   CANCELACIONES
========================================================== */

test("Cancelar ticket", async () => {

    const response =
        await request(app)

            .patch(
                `/api/tickets/${ticketId}/cancel`
            )

            .set(
                "Cookie",
                userCookie
            );

    assert.equal(
        response.status,
        200
    );

    assert.equal(
        response.body.payload.status,
        "cancelled"
    );

});

test("No cancelar dos veces", async () => {

    const response =
        await request(app)

            .patch(
                `/api/tickets/${ticketId}/cancel`
            )

            .set(
                "Cookie",
                userCookie
            );

    assert.equal(
        response.status,
        400
    );

});

test("Después de cancelar puede volver a inscribirse", async () => {

    const response =
        await request(app)

            .post(
                `/api/events/${eventId}/tickets`
            )

            .set(
                "Cookie",
                userCookie
            )

            .send({

                quantity: 1

            });

    assert.equal(
        response.status,
        201
    );

});



test("No hay cupos suficientes", async () => {

    await Event.findByIdAndUpdate(
        eventId,
        {
            capacity: 1
        }
    );

    const email =
        `nuevo${Date.now()}@gmail.com`;

    await request(app)

        .post("/api/sessions/register")

        .send({

            first_name: "Nuevo",

            last_name: "Usuario",

            email,

            password

        });

    const login =
        await request(app)

            .post("/api/sessions/login")

            .send({

                email,

                password

            });

    const cookie =
        login.headers["set-cookie"];

    const response =
        await request(app)

            .post(
                `/api/events/${eventId}/tickets`
            )

            .set(
                "Cookie",
                cookie
            )

            .send({

                quantity: 2

            });

    assert.equal(
        response.status,
        400
    );

});

/* ==========================================================
   LIMPIEZA
========================================================== */

test("Limpiar base de datos de pruebas", async () => {

    await Ticket.deleteMany({});

    await Event.deleteMany({});

    await User.deleteMany({

        email: {
            $in: [
                organizerEmail,
                userEmail
            ]
        }

    });

    assert.ok(true);

});