class OrdersRepository {
    constructor(ordersModel) {
        this.ordersModel = ordersModel
    }
      //주문생성
    createOrder = async(memberId,goodsId,quantity)=>{
        await this.ordersModel.create({
            memberId,goodsId,quantity
        })
    }
}

module.exports = OrdersRepository