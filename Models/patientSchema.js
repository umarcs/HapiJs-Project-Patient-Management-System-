const mongoose = require('mongoose');

const PatientSchema =  mongoose.Schema({
    firstName: { type : String, trim : true, required : true, lowercase : true},
    lastName: { type: String, trim: true,  lowercase : true},
    fatherName: { type: String, trim: true, required : true, lowercase : true},
    contact : { type: Number, required : true},
    age: { type: String, required : true},
    gender: { type: String, required : true },
    address: { type: String, trim: true, required : true, lowercase : true},
    disease: { type: String, trim: true, required : true,lowercase : true},
    createdAt : { type : Date, default : new Date()},
    updatedAt : { type : Date }
    
    
});

const Patient = mongoose.model('patients', PatientSchema, 'patients');

module.exports = Patient;