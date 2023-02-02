const MemberService = require('../services/member.service')

class MemberController{
  memberService = new MemberService()
  //장바구니
  getCartList = async(req, res, next) => {
    const memberId = 1
    const cartList = await this.memberService.getCartList(memberId)

    return res.status(200).json({cartList})
  }

  //장바구니 추가
  addCartList = async(req, res, next) => {
    const memberId = 1;
    const {goodsId} = req.params;
    const {quantity} = req.body;

    await this.memberService.addCartList(memberId, goodsId, quantity);

    return res.status(200).json({msg:'장바구니 추가 완료'})
  }

  //장바구니 주문
  orderCartList = async(req, res, next) => {
    const {cartId} = req.params;
    
    await this.memberService.orderCartList(cartId)

    return res.status(200).json({msg:'장바구니 주문 완료'})
  }


}

module.exports = MemberController;