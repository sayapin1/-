class OrdersRepository {
    constructor(ordersModel) {
        this.ordersModel = ordersModel
    }

    getAllOrders = async () => {
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

      //주문생성
    createOrder = async(memberId,goodsId,quantity)=>{
        await this.ordersModel.create({
            memberId,goodsId,quantity
        })
    }
}

module.exports = OrdersRepository