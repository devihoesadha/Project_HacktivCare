const { Op } = require("sequelize")
const { Product, User, Profile } = require("../models/index")
const formatRupiah = require("../helper/formatRupiah")
const QRCode = require('qrcode')

class ProductController {

    static findAllProduct(req, res) {
        let userId = req.session.UserId
        let searchProduct = req.query.search
        const errors = req.query.errors

        Product.searchProductByTitle(searchProduct)
            .then((product) => product)
            .then((dataProduct) => {
                if (userId) {
                    User.findOne({ include: Profile, where: { id: userId } }).then((user) => {
                        return res.render("product", { dataProduct, user, formatRupiah, errors })
                    })
                } else {
                    return res.render("product", { dataProduct, user: {}, formatRupiah, errors })
                }
            })
            .catch((err) => {
                res.send(err)
            });
    }


    static productDetail(req, res) {
        const id = req.params.id

        Product.findByPk(id)
            .then((detail) => {
                // console.log(detail.imageURL, ">>>");
                QRCode.toDataURL(detail.imageURL)
                    .then(url => {
                        // console.log(url)
                        res.render("productDetail", { detail, formatRupiah, url })
                    })

            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static addProductForm(req, res) {
        const errors = req.query.errors
        res.render("addProduct", { errors })
    }

    static addProductHandler(req, res) {
        const { imageURL, name, price, description, stock } = req.body
        Product.create({ imageURL, name, price, description, stock })
            .then(() => {
                res.redirect("/products")
            }).catch((err) => {
                if (err.errors) {
                    console.log(err)
                    let notif = err.errors.map((perData) => { return perData.message })
                    res.redirect(`/products/add?errors=${notif.join(";")}`)
                } else {
                    res.send(err)
                }

            });
    }

    static getEditProductById(req, res) {
        const id = req.params.id
        Product.findByPk(id)
            .then((dataId) => {
                res.render("editProduct", { dataId })
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static postEditProduct(req, res) {
        const id = req.params.id
        // console.log(id);
        const { imageURL, name, price, description, stock } = req.body
        Product.update({ imageURL, name, price, description, stock }, {
            where: {
                id
            }
        })
            .then(() => {
                res.redirect(`/products/detail/${id}`)
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });

    }

    static deleteProduct(req, res) {
        const id = req.params.id
        Product.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.redirect("/products")
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }
}

module.exports = ProductController