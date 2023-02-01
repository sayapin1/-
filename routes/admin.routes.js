const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

//회원 등급 조정
router.put('/member/:memberId', adminController.editMembershipLevel);

//상품 추가
router.post('/goods', adminController.addGoods);

//상품 수정
router.put('/goods/:goodsId', adminController.editGoods);

//상품 삭제
router.delete('/goods/:goodsId', adminController.deleteGoods);

//주문 상태 변경(주문 완료)
router.put('/order/:orderId', adminController.completeOrder);


module.exports = router;