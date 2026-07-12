import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    host: process.env.MAIL_HOST,

    port: Number(process.env.MAIL_PORT),

    secure: Number(process.env.MAIL_PORT) === 465,

    auth: {

        user: process.env.MAIL_USER,

        pass: process.env.MAIL_PASS

    }

});

class MailService {

    async sendTicketConfirmation(
        userEmail,
        event,
        quantity,
        reservationCode
    ) {

        // Si no hay configuración de correo,
        // simplemente no se envía el email.
        if (
            !process.env.MAIL_HOST ||
            !process.env.MAIL_USER ||
            !process.env.MAIL_PASS ||
            !process.env.MAIL_FROM
        ) {

            console.warn(
                "Servicio de correo no configurado. Se omite el envío del email."
            );

            return;

        }

        await transporter.sendMail({

            from: process.env.MAIL_FROM,

            to: userEmail,

            subject: "Confirmación de inscripción",

            html: `
                <h2>Inscripción confirmada</h2>

                <p>Tu inscripción fue realizada correctamente.</p>

                <ul>
                    <li><strong>Evento:</strong> ${event.title}</li>
                    <li><strong>Fecha:</strong> ${new Date(event.date).toLocaleString()}</li>
                    <li><strong>Lugar:</strong> ${event.location}</li>
                    <li><strong>Cantidad:</strong> ${quantity}</li>
                    <li><strong>Código de reservación:</strong> ${reservationCode}</li>
                </ul>

                <p>Gracias por utilizar la Plataforma de Eventos.</p>
            `

        });

    }

}

export default new MailService();