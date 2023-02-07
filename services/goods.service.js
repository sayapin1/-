// const MembersRepository = require("../repositories/members.repository");
// const OrdersRepository = require('../repositories/orders.repository');
// const CartsRepository = require('../repositories/carts.repository')
const GoodsRepository = require('../repositories/goods.repository')

// const {Members} = require('../models')
// const {Orders} = require('../models')
// const {Carts} = require('../models')
const {Goods} = require('../models')

class GoodsService {
  // ordersRepository = new OrdersRepository(Orders);
  // cartsRepository = new CartsRepository(Carts);
  goodsRepository = new GoodsRepository(Goods);

    //상품목록
  getGoodsList = async()=>{
    try {
      const data = await this.goodsRepository.getAllGoods()
    return {code:200, data}
    } catch (error) {
      console.error(error);
      return { code: 500, message: '상품 목록 불러오기 오류'}
    }
  }

    //상품상세페이지
  getGoodsDetail = async(goodsId)=>{
    try {
      if ( ! goodsId ){
        return { code: 404, message: '존재하는 상품이 아닙니다.'}
      }
      const data = await this.goodsRepository.getOneGoods(goodsId);
    return {code:200, data}
    } catch (error) {
      console.error(error);
      return { code: 500, message: '상품 상세 페이지 불러오기 오류'}
    }
  }
}

module.exports = GoodsService;