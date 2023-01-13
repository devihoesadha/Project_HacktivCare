const express = require('express')
const cartController = require("../controller/cartController")
const { middleWare, isLogin, isAdmin, isSeller, isCustomer } = require('../middleWares/middleWare')

const route = express.Router()

route.get("/", middleWare, isCustomer, cartController.cartForm)
route.get("/add/:id", middleWare, isCustomer, cartController.addToCart)
route.get("/delete/:id", middleWare, isCustomer, cartController.deleteCart)
module.exports = route