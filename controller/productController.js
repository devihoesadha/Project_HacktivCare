const { Op } = require("sequelize")
const { Product } = require("../models/index")
class ProductController {

    static findAllProduct(req, res) {
        let searchProduct = req.query.search

        let option = {
            where: {},
            order: [
                ["createdAt", "DESC"]
            ]
        }
        if (searchProduct) {
            option.where.name = {
                    [Op.iLike]: `%${searchProduct}%`
            }
        }

        Product.findAll(option)
            .then((dataProduct) => {
                // res.send(dataProduct)
                res.render("product", { dataProduct })
            }).catch((err) => {
                console.log(err);
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