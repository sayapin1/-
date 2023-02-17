const CartService = require('../services/cart.service')

class CartOutputController {
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

}

module.exports = CartOutputController;