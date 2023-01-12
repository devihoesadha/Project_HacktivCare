const express = require('express')
const Controller = require('../controllers/controller')
const route = express.Router()

const routeUser = require('./userRoute')
const routeProduct = require('./productRoute')

route.get('/', Controller.renderHome)

route.use('/user', routeUser)
route.use('/products', routeProduct)

module.exports = route