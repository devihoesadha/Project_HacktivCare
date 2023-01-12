const express = require('express')

const userController = require('../controller/userController')

const route = express.Router()

route.get("/", userController.listUsers)//menampilkan user list KHUSUS role Admin 
route.get("/register", userController.formRegister)//register form untuk user baru
route.post("/register", userController.addUser)//add registered user 
route.get("/login", userController.formLogin )//login form untuk user 
route.post("/login", userController.loginUser )//login user redirect ke product list
route.get("/logout", )//logout user
route.get("/profile/:id/edit", userController.formEditProfile)
route.post("/profile/:id/edit", userController.editProfile)
route.get("/profile/:id", userController.profileUsers)//menampilkan user/profile profile user


module.exports = route