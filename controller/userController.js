const { checkPassword } = require("../helper/bcrypt")
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
        Profile.findAll({ include: User })
            .then((dataProfile) => {
                res.render('profileUsers.ejs', { dataProfile })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static formRegister(req, res) {
        console.log("hai");
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
                    console.log(err)
                    let notif = err.errors.map((perData) => { return perData.message })
                    res.redirect(`/user/register?errors=${notif.join(";")}`)
                } else {
                    res.send(err)
                }
            })
    }

    static formLogin(req, res) {
        res.render("formLogin.ejs")
    }

    static loginUser(req, res) {
        // console.log(req.body)
        const { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then((data) => {
                if (data) {
                    let checkPswd = checkPassword(password, data.password)
                    if (checkPswd) {
                        req.session.UserId = data.id
                        res.redirect("/user")
                    } else {
                        res.redirect('/user/login?error=passwordsalah')
                    }
                } else {
                    res.redirect("/user/login?error=emailsalah")
                }
            }).catch((err) => {
                res.send(err)
            });
    }

    static formEditProfile(req, res) {
        let id = req.params.id
        Profile.findOne({ where: { id: id } })
            .then((data) => {
                res.render('formEditProfile.ejs', { data })
            }).catch((err) => {
                res.send(err)
            })
    }

    static editProfile(req, res) {
        let id = req.params.id
        const { firstName, lastName, dateOfBirth } = req.body
        Profile.update({ firstName, lastName, dateOfBirth }, { where: { id: id } })
            .then((data) => {
                res.redirect("/products")
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = userController