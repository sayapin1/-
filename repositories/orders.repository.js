class OrdersRepository {
    constructor(ordersModel, membersModel, goodsModel) {
        this.ordersModel = ordersModel;
        this.membersModel = membersModel;
        this.goodsModel = goodsModel
    }

    getAllOrders = async () => {
        return await this.ordersModel.findAll({
            attributes: ["id", "quantity", "status", "goodsId", "Good.price", "Good.goodsName", "Member.loginId"],
            include: [
                {
                    model: this.goodsModel,
                    attributes: ["goodsName", "price"],
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

    //특정 고객의 주문 내역 불러오기
    getMemberOrder = async (id) => {
        return await this.ordersModel.findAll({
            attributes: ["id", "quantity", "status", "goodsId", "Good.price", "Good.goodsName"],
            include: [
                {
                    model: this.goodsModel,
                    attributes: ["goodsName", "price"],
                    as: 'Good'
                }
            ],
            where: {memberId: id}
        })
}
}

module.exports = OrdersRepository