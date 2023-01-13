function middleWare(req, res, next) {
    if (req.session.UserId) {
        next()
    } else {
        res.redirect("/user/login?errors=login-first-pliss")
    }
}

function isLogin(req, res, next) {
    if (req.session.serId) {
        res.redirect(`/products?errors=you-already-logged-in`)
    } else {
        next()
    }
}

function isAdmin(req, res, next) {
    if (!req.session.role !== "Admin") {
        res.redirect("/products?errors= Only Admin can acces this fitur")
    } else {
        next()
    }
}

function isSeller(req, res, next) {
    if (!req.session.role !== "Seller") {
        res.redirect("/products?errors= Only Seller can acces this fitur")
    } else {
        next()
    }
}

function isCustomer(req, res, next) {
    if (!req.session.role !== "Customer") {
        res.redirect("/products?errors= Only customer can acces this fitur")
    } else {
        next()
    }
}

module.exports = { middleWare, isLogin, isAdmin, isSeller, isCustomer }