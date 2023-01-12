const { User, Profile, Product, Cart } = require("../models/index")
const user = require("../models/user")

class userController {
    static listUsers(req, res) {
        User.findAll({ include: Profile })
            .then((dataUser) => {
                // res.send(dataUser[0].Profile)
                res.render('usersList.ejs', { dataUser })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static profileUsers(req, res) {
        Profile.findAll()
            .then((dataProfile) => {
                res.render('profileUsers.ejs', { dataProfile })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static formRegister(req, res) {
        const errors = req.query.errors
        res.render('formRegister.ejs', { errors })
    }

    static addUser(req, res) {
        // console.log(req.body)
        const { userName, email, password, role } = req.body
        User.create({ userName, email, password, role }, { returning: true })
            .then((data) => {
                console.log(data)
                return Profile.create({ UserId: data.id })
            })
            .then(() => {
                res.redirect('/products')
            })
            .catch((err) => {
                if (err.errors) {
                    let notif = err.errors.map((perData) => { return perData.message })
                    res.redirect(`/user/register?errors=${notif.join(";")}`)
                } else {
                    res.send(err)
                }
            })
    }
}

module.exports = userController