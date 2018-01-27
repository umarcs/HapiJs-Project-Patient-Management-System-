const doctorsController = require('../Controllers/doctors');
const Joi = require('joi');

const doctorsRoutes = [
   
     {
        method: 'post',
        path: '/api/doctors/addDoctor',
        config : {
            validate : {
                payload : {

                    firstName : Joi.string().required(),
                    lastName : Joi.string().required(),
                    email : Joi.string().required(),
                    degree : Joi.string().required(),
                    contact : Joi.number().required(),
                    age : Joi.number().required(),
                    gender : Joi.string().required(),
                    //position : Joi.string().required(),
                    salary : Joi.number().required(),
                    address : Joi.string().required(),
        
                }
            }
        },

        handler: doctorsController.addDoctor
    },
     
    {
        method: 'get',
        path: '/api/doctors/doctorsInformation',

        handler: doctorsController.doctorsInfo
    },
    
    {
        method : "post",
        path : "/api/doctors/deleteDoctorRecord",
        config : {
            validate : {
                payload : {
                    id : Joi.string().required()
                }
            }
        },
        handler : doctorsController.deleteDoctorRecord

    },
    {
        method : "get",
        path : "/api/doctors/doctorInformationById/{id}",
         config : {
            validate : {
                params : {
                    id: Joi.string().required()
                }
            }
        },
        handler : doctorsController.doctorInfoById

    },
    {
    method : 'put',
    path : `/api/staff/editDoctorInformation/{id}`,
    config : {
            validate : {
                params : {
                    id: Joi.string().required()
                },
                 payload : {
                    firstName : Joi.string().required(),
                    lastName : Joi.string().required(),
                    email : Joi.string().required(),
                    degree : Joi.string().required(),
                    contact : Joi.number().required(),
                    age : Joi.number().required(),
                    gender : Joi.string().required(),
                    //position : Joi.string().required(),
                    salary : Joi.number().required(),
                    address : Joi.string().required(),
        
                }
            }
        },
         handler : doctorsController.editDoctor
    }

]
module.exports = doctorsRoutes;


