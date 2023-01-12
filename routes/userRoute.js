const express = require('express')
const Controller = require('../controllers/controller')

const route = express.Router()

route.get("/")//menampilkan user list KHUSUS role Admin 
route.get("/profile/:id",/*COntroller */ )//menampilkan user/profile profile user
route.get("/register", )//register form untuk user baru
route.post("/register", )//add registered user  

route.get


module.exports = route