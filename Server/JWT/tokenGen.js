const jwt = require('jsonwebtoken');
const secretKey = 'SECRET_KEY';
function tokenGenrator(id){

    let token = jwt.sign({id},secretKey,{expiresIn:'30h'});
    return token;

}

module.exports = tokenGenrator;