class GoodsRepository {
    constructor(goodsModel) {
        this.goodsModel = goodsModel
    }
    //상품목록 불러오기
    getAllGoods = async()=>{
        const allGoods = await this.goodsModel.findAll()

        return allGoods

        // == return await this.goodsModel.findAll()
    }

    //상품 하나 불러오기
    getOneGoods = async(goodsId)=>{
        return await this.goodsModel.findOne({
            where: {
                id: goodsId
            }
        })

    }
}

module.exports = GoodsRepository;