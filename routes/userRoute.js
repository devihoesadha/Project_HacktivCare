const express = require('express')

const userController = require('../controller/userController')
const { middleWare, isLogin, isAdmin } = require('../middleWares/middleWare')

const route = express.Router()

route.get("/", middleWare, isAdmin, userController.listUsers)//menampilkan user list KHUSUS role Admin 
route.get("/register", isLogin, userController.formRegister)//register form untuk user baru
route.post("/register", isLogin, userController.addUser)//add registered user 
route.get("/login", isLogin, userController.formLogin)//login form untuk user 
route.post("/login", isLogin, userController.loginUser)//login user redirect ke product list
route.get('/logout', middleWare, userController.logout)
route.get("/profile/:id/edit", middleWare, userController.formEditProfile)
route.post("/profile/:id/edit", middleWare, userController.editProfile)
route.get("/profile/:id", middleWare, isAdmin, userController.profileUsers)//menampilkan user/profile profile user


module.exports = route