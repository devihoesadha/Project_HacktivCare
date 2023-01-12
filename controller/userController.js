const { User, Profile, Product, Cart } = require("../models/index")

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
            .catch((err)=>{
                res.send(err)
            })
    }
}

module.exports = userController