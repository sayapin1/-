const express = require("express")
const router = express.Router()

const MemberController = require('../controllers/cart.controller')
const memberController = new MemberController()
const authToken = require("../middlewares/auth-token");

//3. 장바구니 추가
router.post('/:goodsId', authToken, memberController.addCartList);

//4. 장바구니 주문
router.post('/:cartId/order', authToken, memberController.orderCartList);

module.exports = router