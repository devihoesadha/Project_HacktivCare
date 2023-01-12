const cart = require('../models/cart')
const { Profile, Cart, Profile } = require('../models/index')

class cartController {
    static addCart(req, res) {
        let productId = req.params.id
        let profileId = req.session.id
        Cart.create({ ProfileId: profileId, ProductId: productId })
            .then(() => {
                res.redirect('/products')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteCart(req, res) {
        let id = req.params.id
        Cart.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/products/cart')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = cartController
