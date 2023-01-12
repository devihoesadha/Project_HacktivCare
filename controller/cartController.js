const cart = require('../models/cart')
const { Cart, Profile, Product } = require('../models/index')
const formatRupiah = require("../helper/formatRupiah")

class cartController {
    static addToCart(req, res) {
        let UserId = req.session.UserId
        let id = req.params.id

        Profile.findOne({
            where: {
                UserId: UserId
            }
        })
            .then((dataProfile) => dataProfile)
            .then((dataProfile) => {
                Cart.create({ ProfileId: dataProfile.id, ProductId: id })
                return res.redirect('/products')
            })
            .catch((err) => {
                // console.log(err);
                res.send(err)
            });
    }

    static cartForm(req, res) {
        let userId = req.session.UserId

        Cart.findAll({
            include: [{
                model: Profile, where: {
                    UserId: userId
                }
            },
            {
                model: Product
            }],
        })
            .then((dataCart) => {
                // res.send(dataCart)
                let totalPrice
                // console.log(dataCart)
                totalPrice = dataCart.map(perData => {
                    return perData.Product.price
                });
                const sumPrice = totalPrice.reduce((partialSum, a) => partialSum + a, 0);
                // console.log(sumPrice)
                res.render('formCart.ejs', { dataCart, formatRupiah, sumPrice })
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }

    static deleteCart(req, res) {
        let id = req.params.id
        console.log(id)
        Cart.destroy({ where: { ProductId: id } })
            .then(() => {
                res.redirect('/cart')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = cartController
