import Ticket from "../models/Ticket.js";

class TicketsDao {

    async create(ticket) {
        return await Ticket.create(ticket);
    }

    async findById(id) {
        return await Ticket.findById(id)
            .populate(
                "event",
                "title date location"
            )
            .populate(
                "user",
                "first_name last_name email"
            );
    }

    async findByUser(userId) {
        return await Ticket.find({
            user: userId
        }).populate(
            "event",
            "title date location"
        );
    }

    async findByEvent(eventId) {
        return await Ticket.find({
            event: eventId
        }).populate(
            "user",
            "first_name last_name email"
        );
    }

    async findActiveByUserAndEvent(userId, eventId) {

        return await Ticket.findOne({
            user: userId,
            event: eventId,
            status: {
                $ne: "cancelled"
            }
        });

    }

    async countReservedSeats(eventId) {

        const result = await Ticket.aggregate([
            {
                $match: {
                    event: eventId,
                    status: {
                        $ne: "cancelled"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$quantity"
                    }
                }
            }
        ]);

        return result.length > 0
            ? result[0].total
            : 0;

    }

    async update(id, data) {

        return await Ticket.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

    }

}

export default new TicketsDao();