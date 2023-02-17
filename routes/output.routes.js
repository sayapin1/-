const express = require('express');
const router = express.Router();

const AdminOutputController = require('../controllers/adminOutput.controller');
const adminOutputController = new AdminOutputController();
const CartOutputController = require('../controllers/cartOutput.controller');
const cartOutputController = new CartOutputController();
const GoodsOutputController = require('../controllers/goodsOutput.controller');
const goodsOutputController = new GoodsOutputController();
const MemberOutputController = require('../controllers/memberOutput.controller');
const memberOutputController = new MemberOutputController();

const authToken = require("../middlewares/auth-token");

//관리자페이지 불러오기
router.get('/admin', adminOutputController.getAdminPage)

//회원 명단 불러오기
router.get('/admin/member', authToken, adminOutputController.getMemberList);

//관리자 페이지 상품목록 불러오기
router.get('/admin/goods', authToken, adminOutputController.getGoodsList);

//관리자 - 상품 추가 페이지 불러오기
router.get('/admin/addGoods', authToken, adminOutputController.addGoodsPage)

//관리자 - 상품 수정 페이지 불러오기
router.get('/admin/goods/:goodsId', authToken, adminOutputController.editGoodsPage)

//지금까지 받은 모든 주문 내역 불러오기
router.get('/admin/order', authToken, adminOutputController.getOrderList);

//로그인페이지
router.get('/login', memberOutputController.getLoginPage);

//회원가입페이지
router.get('/register', memberOutputController.getRegisterPage);

// 마이페이지
router.get("/myPage", authToken, memberOutputController.getMember);

//장바구니
router.get('/cart', authToken, cartOutputController.getCartList);

//상품목록
router.get('/goods', goodsOutputController.getGoodsList);

//상품상세페이지
router.get('/goods/:goodsId', goodsOutputController.getGoodsDetail);

//메인페이지
router.get('/', goodsOutputController.getMainPage);




module.exports = router;