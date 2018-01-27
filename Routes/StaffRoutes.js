const staffController = require('../Controllers/staff');
const Joi = require('joi');

const staffRoutes = [
   
    {
        method: 'get',
        path: '/api/staffInformation',

        handler: staffController.staffInfo
    },
     {
        method: 'post',
        path: '/api/staff/addStaff',
        config : {
            validate : {
                payload : {

                    firstName : Joi.string().required(),
                    lastName : Joi.string().required(),
                    contact : Joi.number().required(),
                    age : Joi.number().required(),
                    gender : Joi.string().required(),
                    position : Joi.string().required(),
                    salary : Joi.number().required(),
                    address : Joi.string().required(),
        
                }
            }
        },

        handler: staffController.addStaff
    },
     {
        method: 'post',
        path: '/api/staff/deleteStaff',
        config: {
            validate: {
                payload: {

                    id: Joi.string().required(),
                }
            }
        },
        handler: staffController.deleteStaff
    },
    {
        method: 'get',
        path: `/api/staff/getStaffById/{id}`,
        config: {
            validate: {
                params: {
                    id: Joi.string()
                }               
            }
        },
        handler: staffController.getInfoStaffByID
    },
    {
        method: 'put',
        path: `/api/staff/editStaffInformation/{id}`,
        config : {
            validate : {
                params : {
                    id : Joi.string().required()
                },
                payload : {

                   firstName : Joi.string().required(),
                    lastName : Joi.string().required(),
                    contact : Joi.number().required(),
                    age : Joi.number().required(),
                    gender : Joi.string().required(),
                    position : Joi.string().required(),
                    salary : Joi.number().required(),
                    address : Joi.string().required(),
        
                }
            }
        },

        handler: staffController.editStaffInfo
    },
    
]
module.exports = staffRoutes;


