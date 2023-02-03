const MemberService = require('../services/member.service')

class MemberController{
  memberService = new MemberService()
  //장바구니
  getCartList = async(req, res, next) => {
    const memberId = req.authInfo.id
    const response = await this.memberService.getCartList(memberId)

    if (response.data) {
            return res.status(response.code).json({data: response.data});
        } else {
            return res.status(response.code).json({message: response.message});
        }
  }

  //장바구니 추가
  addCartList = async(req, res, next) => {
    const memberId = req.authInfo.id;
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const response = await this.memberService.addCartList(memberId, goodsId, quantity);

    return res.status(response.code).json({message: response.message});
  }

  //장바구니 주문
  orderCartList = async(req, res, next) => {
    const {cartId} = req.params;
    
    const response = await this.memberService.orderCartList(cartId)

    return res.status(response.code).json({message: response.message});
  }


}

module.exports = MemberController;