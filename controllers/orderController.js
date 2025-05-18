const { Order, OrderItem } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
    async create(req, res, next) {
        try {
            const { userId, items } = req.body;

            // Создание нового заказа
            const order = await Order.create({
                userId,
                totalAmount: 0, // временно, пересчитаем позже
                status: "Pending", // статус по умолчанию
            });

            let totalAmount = 0;

            // Создание элементов заказа
            for (let item of items) {
                const { id, quantity, price } = item;
                console.log({id,quantity,price})

                await OrderItem.create({
                    orderId: order.id,
                    itemId: id,
                    quantity,
                    price
                });

                totalAmount += price * quantity;
            }

            // Обновление суммы заказа
            order.totalAmount = totalAmount;
            await order.save();

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        let {userId,limit,page} = req.query 
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        try {
            const orders = await Order.findAll({
                where: {userId},
                include: [{ model: OrderItem }],
                limit,
                offset
            });

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const order = await Order.findOne({
                where: { id },
                include: [{ model: OrderItem }],
            });

            if (!order) {
                return next(ApiError.badRequest("Заказ не найден"));
            }

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderController();
