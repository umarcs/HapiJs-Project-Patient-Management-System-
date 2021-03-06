const mongoose = require('mongoose');

const staffSchema =  mongoose.Schema({
    
    firstName: { type : String, trim : true, required : true, lowercase : true},
    lastName: { type: String, trim: true, required : true,lowercase : true},
    address: { type: String, trim: true, required : true,lowercase : true},
    gender: { type: String, required : true },
    contact : { type: Number, required : true},
    position: { type: String, required : true},
    salary: {type: Number, required : true},
    age : {type: Number, required : true}
 
    
    
})

var staffInformation = mongoose.model('staff', staffSchema, 'staff');
module.exports = staffInformation;