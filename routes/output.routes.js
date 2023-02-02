const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();
const MemberController =require('../controllers/member.controller');
const memberController = new MemberController();
const GoodsController =require('../controllers/goods.controller');
const goodsController = new GoodsController();

//회원 명단 불러오기
router.get('/admin/member', adminController.getMemberList);

//관리자 페이지 상품목록 불러오기
router.get('/admin/goods', adminController.getGoodsList);

//지금까지 받은 모든 주문 내역 불러오기
router.get('/admin/order', adminController.getOrderList);

//메인페이지 
// router.get('/mainpage', memberController.get);

//마이페이지
// router.get('/mypage', memberController.getMt);

//장바구니
router.get('/cart', memberController.getCartList);

//상품목록
router.get('/goodslist', goodsController.getGoodsList);

//상품상세페이지
router.get('/goodslist/:goodsId', goodsController.getGoodsDetail);


module.exports = router;