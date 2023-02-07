const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();
const CartController =require('../controllers/cart.controller');
const cartController = new CartController();
const GoodsController =require('../controllers/goods.controller');
const goodsController = new GoodsController();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

const authToken = require("../middlewares/auth-token");

//관리자페이지 불러오기
router.get('/admin', adminController.getAdminPage)

//회원 명단 불러오기
router.get('/admin/member', authToken, adminController.getMemberList);

//관리자 페이지 상품목록 불러오기
router.get('/admin/goods', authToken, adminController.getGoodsList);

//관리자 - 상품 추가 페이지 불러오기
router.get('/admin/addGoods', authToken, adminController.addGoodsPage)

//관리자 - 상품 수정 페이지 불러오기
router.get('/admin/goods/:goodsId', authToken, adminController.editGoodsPage)

//지금까지 받은 모든 주문 내역 불러오기
router.get('/admin/order', authToken, adminController.getOrderList);

//메인페이지
router.get('/', goodsController.getMainPage);

//로그인페이지
router.get('/login', authController.getLoginPage);

//회원가입페이지
router.get('/register', authController.getRegisterPage);

//마이페이지
// router.get('/mypage', memberController.getMt);

//장바구니
router.get('/cart', authToken, cartController.getCartList);

//상품목록
router.get('/goodsList', goodsController.getGoodsList);

//상품상세페이지
router.get('/goodsList/:goodsId', goodsController.getGoodsDetail);



module.exports = router;