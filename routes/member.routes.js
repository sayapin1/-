const express = require("express")
const router = express.Router()

const MemberController = require('../controllers/member.controller')
const memberController = new MemberController()

//3. 장바구니 추가
//장바구니
router.post('/cart/:goodsId', memberController.addCartList);



//4. 장바구니 주문
router.post('/cart/order/:cartId', memberController.orderCartList);

module.exports = router
