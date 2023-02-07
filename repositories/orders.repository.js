class OrdersRepository {
    constructor(ordersModel, membersModel, goodsModel) {
        this.ordersModel = ordersModel;
        this.membersModel = membersModel;
        this.goodsModel = goodsModel
    }

    getAllOrders = async () => {
        return await this.ordersModel.findAll({
            attributes: ["id", "quantity", "status", "Good.goodsName", "Member.loginId"],
            include: [
                {
                    model: this.goodsModel,
                    attributes: ["goodsName"],
                    as: 'Good'
                },
                {
                    model: this.membersModel,
                    attributes: ["loginId"],
                    as: 'Member'
                }
            ]
        })
    }

    getOneOrder = async (orderId) => {
        return await this.ordersModel.findOne({
            where: {id: orderId}
        })
    }

    findIfCompleted = async (orderId) => {
        return await this.ordersModel.findOne({
            where: {id: orderId, status: 1}
        })
    }

    completeOrder = async (orderId) => {
        return await this.ordersModel.update({
            status: 1
        }, {
            where: {id: orderId}
        })
    }

    //주문생성
    createOrder = async (memberId, goodsId, quantity) => {
        await this.ordersModel.create({
            memberId, goodsId, quantity
        })
    }
}

module.exports = OrdersRepository