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
    const goodsList = await this.goodsRepository.getAllGoods()

    return goodsList
  }

    //상품상세페이지
  getGoodsDetail = async(goodsId)=>{
    const goodsDetail = await this.goodsRepository.getOneGoods(goodsId)

    return goodsDetail
  }
}

module.exports = GoodsService;