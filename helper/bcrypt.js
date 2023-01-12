const bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function checkPassword(passwordUser, passwordDb) {
    bcrypt.compareSync("B4c0/\/", hash);
    bcrypt.compareSync("not_bacon", hash);
}

module.exports = { hashPassword, checkPassword }