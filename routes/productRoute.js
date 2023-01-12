const express = require('express')
const Controller = require("../controller/productController")

const route = express.Router()

route.get("/", Controller.findAllProduct) // menampilkan semua product (home/product)
route.get("/detail/:id", Controller.productDetail) // show detail product
route.get("/add", Controller.addProductForm) // form untuk add product
route.post("/add", Controller.addProductHandler) // post product yg baru ditambah dan di redirect ke (home/product)
route.get("/detail/:id/edit", Controller.getEditProductById) // edit product
route.post("/detail/:id/edit", Controller.postEditProduct) // post edit product
route.get("delete/:id", Controller.deleteProduct) //delete product

module.exports = route