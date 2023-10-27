const verifyToken  = (headers)=>{

    let bearerToken = headers['authorization'];
    if(bearerToken){
        let token = bearerToken.split(' ');
        return token[1];
    }
    else{
        console.log('Token is Expire');
    }
}
module.exports = verifyToken;