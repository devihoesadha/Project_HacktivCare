const express = require('express')
const Controller = require("../controller/productController")
const { middleWare, isLogin, isAdmin, isSeller } = require('../middleWares/middleWare')

const route = express.Router()

route.get("/", Controller.findAllProduct) // menampilkan semua product (home/product)
route.get("/detail/:id", Controller.productDetail) // show detail product
route.get("/add", middleWare, isSeller, Controller.addProductForm) // form untuk add product
route.post("/add", middleWare, isSeller, Controller.addProductHandler) // post product yg baru ditambah dan di redirect ke (home/product)
route.get("/detail/:id/edit", middleWare, isSeller, Controller.getEditProductById) // edit product
route.post("/detail/:id/edit", middleWare, isSeller, Controller.postEditProduct) // post edit product
route.get("/delete/:id", isSeller, middleWare, Controller.deleteProduct) //delete product

module.exports = route