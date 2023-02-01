const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

//회원 명단 불러오기
router.get('/admin/member', adminController.getMemberList);

//상품 목록 불러오기
router.get('/admin/goods', adminController.getGoodsList);

//지금까지 받은 모든 주문 내역 불러오기
router.get('/admin/order', adminController.getOrderList);

module.exports = router;