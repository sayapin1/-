const GoodsService = require('../services/goods.service')

class GoodsController{
  goodsService = new GoodsService()

  //상품목록
  getGoodsList = async(req, res, next) => {
    const goodsList = await this.goodsService.getGoodsList()

    return res.status(200).json({goodsList})
  }

  //상품상세페이지
  getGoodsDetail = async(req,res,next)=>{
    const {goodsId} = req.params;
    
    const goodsDetail =await this.goodsService.getGoodsDetail(goodsId)

    return res.status(200).json({goodsDetail})
  }
}

module.exports = GoodsController;