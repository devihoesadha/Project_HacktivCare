const express = require('express')

const Controller = require('../controller/index')
const route = express.Router()

const routeUser = require('./userRoute')
const routeProduct = require('./productRoute')
const routeCart = require('./cartRoute')

// route.use(function (req, res, next) {
//   console.log(`aksjdssssssssssssssssssssssssssss`)
//   next()
// })
route.get('/', Controller.renderHome)

route.use('/user', routeUser)
route.use('/products', routeProduct)
route.use('/cart', routeCart)

module.exports = route