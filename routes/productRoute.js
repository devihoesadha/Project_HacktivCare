const express = require('express')
// const Controller = require('../controller/controller')

const route = express.Router()

route.get("/", ) // menampilkan semua product (home/product)
route.get("/add") // form untuk add product
route.post("/add") // post product yg baru ditambah dan di redirect ke (home/product)
route.get("/:id") //show product by id
route.get("/edit/:id") // edit product
route.get("delete/:id") //delete product



module.exports = route