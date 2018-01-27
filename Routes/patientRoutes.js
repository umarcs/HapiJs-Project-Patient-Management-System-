const PatientController = require('../Controllers/Patient');
const Joi = require('joi');

const patientRoutes = [
    {
        method: 'post',
        path: '/api/patient-registration',
        config: {
            validate: {
                payload: {
                    doctor : Joi.string().required(),
                    patientId: Joi.string().optional(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().optional().allow([null, ""]),
                    fatherName : Joi.string().required(),
                    contact: Joi.number().required(),
                    age: Joi.string().required(),
                    disease: Joi.string().required(),
                    gender: Joi.string().required(),
                    address: Joi.string().required(),
                    floor: Joi.string().required(),
                    roomNo: Joi.number().required(),
                    price: Joi.number().required(),
                }
            }
        },
        handler: PatientController.patientRegistration
    },
    {
        path: "/api/patient/patientInformation",
        method: "get",
        handler: PatientController.patientInfo
    },
    {
        path: "/api/patient/deletePatientRecord",
        method: "post",
        config: {
            validate: {
                payload: {
                    id: Joi.string().required()
                }
            }
        },
        handler: PatientController.deleteRecord
    },
    {
        path: "/api/patient/getPatientInfoBeforeEdit/{id}",
        method: "get",
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: PatientController.getPatientInfoById

    },
    {
        path: "/api/patient/editPatientInformation/{id}",
        method: "put",
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: {

                    firstName: Joi.string().required(),
                    lastName: Joi.string().optional().allow([null, ""]),
                    fatherName : Joi.string().required(),
                    contact: Joi.number().required(),
                    age: Joi.string().required(),
                    disease: Joi.string().required(),
                    gender: Joi.string().required(),
                    address: Joi.string().required(),

                }
            }
        },
        handler: PatientController.editinformation
    },
    //patient vivsit info
    {
        method: "get",
        path: "/api/patient/patientVisitInfo",
        handler: PatientController.patientVisitInformation
    },
    //patient visit info by by
    {
        method: 'get',
        path: `/api/patient/getPatientVisitInfoById/{id}`,
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: PatientController.patientVisitInfoById
    },

    //patient searching
    {
        method: "post",
        path: "/api/patient/patientSearching",
        handler: PatientController.patientSearching
    },
    //patient full check up
    {
        method: "post",
        path: "/api/patient/storePatientHistoryAfterCheckUp",
        config :{
            validate : { 
                payload : {
                    _id : Joi.required(),
                    doctor : Joi.string().required(),
                    disease: Joi.string().required(),
                    floor: Joi.string().required(),
                    roomNo: Joi.number().required(),
                    price: Joi.number().required(),
                    patient : Joi.required(),
                    MdcnAndSrvChrg :Joi.number().required(),
                    status : Joi.string().required(),
                    dateOut : Joi.required(),
                    totalPrice : Joi.number().required()
                }
            }
        },
        handler: PatientController.patientHistory
    }


]
module.exports = patientRoutes;