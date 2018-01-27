const usersController = require('../Controllers/Users');
const Joi = require('joi');

const usersRoutes = [
{
    path : "/api/login",
    method : "post",
    config :{
        auth : false
    },
    handler : usersController.login
}
   
   
]
module.exports = usersRoutes;


