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
    try {
      const data = await this.cartsRepository.getAllCarts(memberId)
      return {code: 200, data}
    } catch (error) {
      console.error(error);
      return {code: 500, message: '장바구니 목록 불러오기 오류'}
    }
  }

  //장바구니 추가
  addCartList = async(memberId, goodsId, quantity) => {
    try {
      if ( !quantity ) {
        return {code: 404, message: '수량을 정해주세요.'}
      }
    await this.cartsRepository.addCart(memberId, goodsId, quantity)
    return {code: 200, message: '장바구니 추가 완료.'}
    } catch (error) {
      console.error(error);
      return {code: 500, message: '장바구니 추가 오류'}
    }
  }

  //장바구니 주문
  orderCartList = async(cartId)=>{
    try {
      if( !cartId ) {
        return { code: 404, message: '구매할 상품이 선택되지 않았습니다.'}
      }
      const oneCart = await this.cartsRepository.getOneCart(cartId)
      const {memberId,goodsId,quantity} = oneCart

      await this.ordersRepository.createOrder(memberId,goodsId,quantity);
      await this.cartsRepository.deleteCart(cartId)

      return {code: 200, message:'주문 완료'}
    } catch (error) {
      console.error(error);
      return {code: 500, message: '주문 오류'}
    }
  }
}

module.exports = MemberService
