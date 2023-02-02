const MembersRepository = require('../repositories/members.repository');
const OrdersRepository = require('../repositories/orders.repository');
const GoodsRepository = require('../repositories/goods.repository')

const {Members} = require('../models')
const {Orders} = require('../models')
const {Goods} = require('../models')

class AdminService {
    membersRepository = new MembersRepository(Members);
    ordersRepository = new OrdersRepository(Orders);
    goodsRepository = new GoodsRepository(Goods);

    getMemberList = async () => {
        try {
            const data = await this.membersRepository.getMemberList();
            return {code: 200, data}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '회원 목록 불러오기 오류'}
        }
    }

    getGoodsList = async () => {
        try {
            const data = await this.goodsRepository.getGoodsList();
            return {code: 200, data}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '상품 목록 불러오기 오류'}
        }
    }

    getOrderList = async () => {
        try {
            const data = await this.ordersRepository.getOrdersList();
            return {code: 200, data}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '주문 목록 불러오기 오류'}
        }
    }

    editMembershipLevel = async (memberId) => {
        try {
            await this.membersRepository.editMembershipLevel(memberId);
            return {code: 200, message: '등급 조정 완료.'}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '회원 등급 조정에 실패하였습니다.'}
        }
    }

    addGoods = async (goodsName, price, detail, photo) => {
        try {
            const existingGoods = await this.goodsRepository.findIfDuplicated(goodsName);
            if (existingGoods) {
                return {code: 412, message: '같은 이름의 상품이 있습니다.'}
            }

            if (!goodsName | !price | !detail | !photo) {
                return {code: 412, message: '모든 정보를 추가해주세요.'}
            }

            await this.goodsRepository.addGoods(goodsName, price, detail, photo);
            return {code: 200, message: '상품 추가 완료'}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '상품 추가 실패'}
        }
    }

    editGoods = async (goodsId, goodsName, price, detail, photo) => {
        try {
            const goods = await this.goodsRepository.getOneGoods(goodsId);
            if (!goods) {
                return {code: 404, message: '상품이 존재하지 않습니다.'}
            }

            const existingGoods = await this.goodsRepository.findIfDuplicated(goodsName);
            if (existingGoods) {
                return {code: 412, message: '같은 이름의 상품이 있습니다.'}
            }

            await this.goodsRepository.editGoods(goodsName, price, detail, photo);
            return {code: 200, message: '상품 수정 완료.'}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '상품 수정 실패'}
        }
    }

    deleteGoods = async (goodsId) => {
        try {
            const goods = await this.goodsRepository.getOneGoods(goodsId);
            if (!goods) {
                return {code: 404, message: '상품이 존재하지 않습니다.'}
            }

            await this.goodsRepository.deleteGoods(goodsId);
            return {code: 200, message: '상품 삭제 완료.'}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '상품 삭제 실패'}
        }
    }

    completeOrder = async (orderId) => {
        try {
            const order = await this.ordersRepository.getOneOrder(orderId);
            if(!order) {
                return { code: 404, message: '주문이 존재하지 않습니다.'}
            }

            await this.ordersRepository.completeOrder(orderId);
            return { code: 200, message: '주문 완료'}
        } catch (error) {
            console.error(error);
            return {code: 400, message: '주문 완료 실패'}
        }
    }


}


module.exports = AdminService;