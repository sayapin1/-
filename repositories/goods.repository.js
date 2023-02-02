class GoodsRepository {
    constructor(goodsModel) {
        this.goodsModel = goodsModel
    }


    getGoodsList = async () => {
        return await this.goodsModel.findAll()
    }

    findIfDuplicated = async (goodsName) => {
        return await this.goodsModel.findOne(
            {where: {goodsName}}
        )
    }

    addGoods = async (goodsName, price, detail, photo) => {
        await this.goodsModel.create({
            goodsName,
            price,
            detail,
            photo
        })
    }

    getOneGoods = async (goodsId) => {
        return await this.goodsModel.findOne({
            where: { id: goodsId }
        })
    }

    editGoods = async (goodsId, goodsName, price, detail, photo) => {
        await this.goodsModel.update({
            goodsName,
            price,
            detail,
            photo
        }, {
            where: { id: goodsId }
        })
    }

    deleteGoods = async (goodsId) => {
        await this.goodsModel.destroy({
            where: { id: goodsId }
        })
    }

}


module.exports = GoodsRepository