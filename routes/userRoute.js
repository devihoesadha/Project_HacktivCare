const express = require('express')
const userController = require('../controller/userController')

const route = express.Router()

route.get("/", userController.listUsers)//menampilkan user list KHUSUS role Admin 
route.get("/register", userController.formRegister)//register form untuk user baru
route.post("/register", userController.addUser)//add registered user 
route.get("/login", )//login form untuk user 
route.post("/login", )//login user redirect ke product list
route.get("/logout", )//logout user
route.get("/profile/:id", userController.profileUsers)//menampilkan user/profile profile user


route.get


module.exports = route