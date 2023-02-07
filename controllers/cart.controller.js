const CartService = require('../services/cart.service')

class CartController {
 cartService = new CartService()
  //장바구니
  getCartList = async(req, res, next) => {
    const { id, loginId } = req.authInfo;
    const response = await this.cartService.getCartList(id, loginId);

    if (response.code === 200) {
            return res.status(response.code).render("cart", {
                data: response.data,
                loginId: loginId,
                title: "cart"
            });
        } else {
            return res.status(response.code).json({message: response.message});
        }
  }

  //장바구니 추가
  addCartList = async(req, res, next) => {
    const memberId = req.authInfo.id;
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const response = await this.cartService.addCartList(memberId, goodsId, quantity);

    return res.status(response.code).json({message: response.message});
  }

  //장바구니 주문
  orderCartList = async(req, res, next) => {
    const {cartId} = req.params;
    
    const response = await this.cartService.orderCartList(cartId)

    return res.status(response.code).json({message: response.message});
  }


}

module.exports = CartController;