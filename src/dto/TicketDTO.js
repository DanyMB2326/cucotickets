class TicketDTO {

    constructor(ticket) {

        this.id =
            ticket._id ?? ticket.id;

        this.quantity =
            ticket.quantity;

        this.status =
            ticket.status;

        this.reservationCode =
            ticket.reservationCode;

        this.createdAt =
            ticket.createdAt;

        this.cancelledAt =
            ticket.cancelledAt;

        this.event =
            ticket.event
                ? {

                    id:
                        ticket.event._id,

                    title:
                        ticket.event.title,

                    date:
                        ticket.event.date,

                    location:
                        ticket.event.location

                }
                : null;

        this.user =
            ticket.user
                ? {

                    id:
                        ticket.user._id,

                    first_name:
                        ticket.user.first_name,

                    last_name:
                        ticket.user.last_name,

                    email:
                        ticket.user.email

                }
                : null;

    }

}

export default TicketDTO;