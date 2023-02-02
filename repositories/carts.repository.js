class CartsRepository {
  constructor(cartsModel) {
      this.cartsModel = cartsModel
  }

    //장바구니 전체 불러오기
    getAllCarts = async(memberId)=>{
      return await this.cartsModel.findAll({
        where:{
          memberId
        }
      })
    }
      //장바구니 추가
    addCart = async(memberId, goodsId, quantity)=>{
      await this.cartsModel.create({
        memberId,
        goodsId,
        quantity
      })
    }
    // 장바구니 하나 불러오기
    getOneCart = async(cartId)=> {
      return await this.cartsModel.findOne({
        where: {
          id : cartId
        }
      })
    }
}

module.exports = CartsRepository