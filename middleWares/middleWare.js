function middleWare(req, res, next) {
    if(req.session.UserId){
        next()
    }else{
        res.redirect("/user/login?errors=login-Dulu-uiiii")
    }
}

module.exports = middleWare