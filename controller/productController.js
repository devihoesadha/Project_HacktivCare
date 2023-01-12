const { Op } = require("sequelize")
const { Product, User, Profile } = require("../models/index")
class ProductController {

    static findAllProduct(req, res) {
        let userId = req.session.UserId
        let searchProduct = req.query.search

        Product.searchProductByTitle(searchProduct)
            .then((product) => product)
            .then((dataProduct) => {
                if (userId) {
                    User.findOne({ include: Profile, where: { id: userId } }).then((user) => {
                        return res.render("product", { dataProduct, user })
                    })
                } else {
                    return res.render("product", { dataProduct, user: {} })
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
                // console.log(detail, ">>>");
                res.render("productDetail", { detail })
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static addProductForm(req, res) {
        res.render("addProduct")
    }

    static addProductHandler(req, res) {
        const { imageURL, name, price, description, stock } = req.body
        Product.create({ imageURL, name, price, description, stock })
            .then(() => {
                res.redirect("/products")
            }).catch((err) => {
                console.log(err);
                res.send(err)
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