const express = require('express')
const cartController = require("../controller/cartController")

const route = express.Router()

route.get("/", cartController.cartForm)
route.get("/add/:id", cartController.addToCart)
route.get("/delete/:id", cartController.deleteCart)
module.exports = route