const JWT = require('jsonwebtoken');
const Config = require('../Config');

controller = {};
controller.login = (request, reply)=>{
    const  payload = request.payload;
    
    //const { username, password } = payload
    console.log(payload)
    if(request.payload.username=="admin" && request.payload.password=="admin"){
        let jwtPayload  = { 

            username : request.payload.username
        }
        const { securityCode } = Config.jwt;

        const generateToken = JWT.sign(jwtPayload, securityCode)

        console.log(generateToken);
        reply({"msg" : "umer",generateToken})


    }
    else{
        reply(false)
    }
}


module.exports = controller