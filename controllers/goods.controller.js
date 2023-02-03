const GoodsService = require('../services/goods.service')

class GoodsController{
  goodsService = new GoodsService()

  //상품목록
  getGoodsList = async(req, res, next) => {
    const response = await this.goodsService.getGoodsList()

    if (response.data) {
            return res.status(response.code).json({data: response.data});
        } else {
            return res.status(response.code).json({message: response.message});
        }
  }

  //상품상세페이지
  getGoodsDetail = async(req,res,next)=>{
    const {goodsId} = req.params;
    
    const response =await this.goodsService.getGoodsDetail(goodsId)

    if (response.data) {
            return res.status(response.code).json({data: response.data});
        } else {
            return res.status(response.code).json({message: response.message});
        }
  }
}

module.exports = GoodsController;