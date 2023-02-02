// const MembersRepository = require("../repositories/members.repository");
// const GoodsRepository = require('../repositories/goods.repository')
const OrdersRepository = require('../repositories/orders.repository');
const CartsRepository = require('../repositories/carts.repository')

// const {Members} = require('../models')
// const {Goods} = require('../models')
const {Orders} = require('../models')
const {Carts} = require('../models')

class MemberService {
  ordersRepository = new OrdersRepository(Orders);
  cartsRepository = new CartsRepository(Carts);

  //장바구니
  getCartList = async(memberId) => {
    const cartList = await this.cartsRepository.getAllCarts(memberId)

    return cartList
  }

  //장바구니 추가
  addCartList = async(memberId, goodsId, quantity) => {
    await this.cartsRepository.addCart(memberId, goodsId, quantity)

    return {msg:'장바구니 추가 완료'}
  }

  //장바구니 주문
  orderCartList = async(cartId)=>{
    const oneCart = await this.cartsRepository.getOneCart(cartId)
    const {memberId,goodsId,quantity} = oneCart

    await this.ordersRepository.createOrder(memberId,goodsId,quantity)

    return {success: true, msg:'장바구니 주문 완료'}
  }
}

module.exports = MemberService
