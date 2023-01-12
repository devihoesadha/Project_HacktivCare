const bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function checkPassword(passwordUser, passwordDb) {
   return bcrypt.compareSync(passwordUser, passwordDb);
}

module.exports = { hashPassword, checkPassword }