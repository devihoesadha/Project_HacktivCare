const cart = require('../models/cart')
const { Cart, Profile } = require('../models/index')

class cartController {
    static addToCart(req, res) {
        let productId = req.params.id
        let profileId = req.session.id
        Cart.create({ ProfileId: profileId, ProductId: productId })
            .then(() => {
                res.redirect('/products')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static cartForm(req, res) {
        let profileId = req.session.id
        Cart.findAll({ where: { ProfileId: profileId } })
            .then((dataCart) => {
                res.render('formCart.ejs', { dataCart })
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
