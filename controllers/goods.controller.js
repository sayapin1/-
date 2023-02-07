const GoodsService = require('../services/goods.service')

class GoodsController {
    goodsService = new GoodsService()

    //메인페이지
    getMainPage = (req, res, next) => {
        if (req.cookies.accessToken === undefined) {
            res.render("index", {
                title: "홈",
                loginId: false,
            });
        } else {
            res.render("index", {
                title: "홈",
                loginId: true,
            });
        }
    }

    //상품목록
    getGoodsList = async (req, res, next) => {
        const response = await this.goodsService.getGoodsList()

        if (response.data) {
            if (req.cookies.accessToken === undefined) {
                return res.status(response.code).render("goods", {
                    data: response.data,
                    title: "상품 목록",
                    loginId: false,
                });
            } else {
                return res.status(response.code).render("goods", {
                    data: response.data,
                    title: "상품 목록",
                    loginId: true,
                });
            }
        } else {
            return res.status(response.code).json({message: response.message});
        }
    }

    //상품상세페이지
    getGoodsDetail = async (req, res, next) => {
        const {goodsId} = req.params;

        const response = await this.goodsService.getGoodsDetail(goodsId)

        if (response.data) {
            return res.status(response.code).json({data: response.data});
        } else {
            return res.status(response.code).json({message: response.message});
        }
    }
}

module.exports = GoodsController;