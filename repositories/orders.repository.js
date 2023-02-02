const {or} = require("sequelize");

class OrdersRepository {
    constructor(ordersModel) {
        this.ordersModel = ordersModel
    }

    getOrderList = async () => {
        return await this.ordersModel.findAll()
    }

    getOneOrder = async (orderId) => {
        return await this.ordersModel.findOne({
            where: { id: orderId }
        })
    }

    findIfCompleted = async (orderId) => {
        return await this.ordersModel.findOne({
            where: { id: orderId, status: 1}
        })
    }

    completeOrder = async (orderId) => {
        return await this.ordersModel.update({
            status: 1}, {
                where: { id: orderId }
        })
    }


}

module.exports = OrdersRepository