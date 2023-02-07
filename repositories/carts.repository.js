const {QueryTypes} = require("sequelize");
const {sequelize} = require('../models/index');

class CartsRepository {
    constructor(cartsModel, goodsModel, membersModel) {
        this.cartsModel = cartsModel;
        this.membersModel = membersModel;
        this.goodsModel = goodsModel
    }

    //장바구니 전체 불러오기
    getAllCarts = async (memberId) => {
        const query = `SELECT c.id, c.quantity, c.goodsId, g.goodsName
                       from Carts c
                                inner join Goods g on c.goodsId = g.id
                       WHERE c.memberId = ?`

        const allCarts = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: [memberId]
            }
        )

        return allCarts;
    }
    //장바구니 추가
    addCart = async (memberId, goodsId, quantity) => {
        await this.cartsModel.create({
            memberId,
            goodsId,
            quantity
        })
    }
    // 장바구니 하나 불러오기
    getOneCart = async (cartId) => {
        return await this.cartsModel.findOne({
            where: {
                id: cartId
            }
        })
    }

    //주문완료시 장바구니 상품 삭제하기
    deleteCart = async (cartId) => {
        await this.cartsModel.destroy({
            where: {id: cartId}
        })
    }

    // 장바구니 수량 수정
    editCart = async (cartId, quantity) => {
        return await this.cartsModel.update({
            quantity
        }, {
            where: { id: cartId }
        })
    }
}

module.exports = CartsRepository