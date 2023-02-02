const MemberService = require('../services/member.service')

class MemberController{
  memberService = new MemberService()


}

//1. 상품목록

//2. 장바구니

//3. 장바구니 추가

//4. 장바구니 주문

module.exports = MemberController;