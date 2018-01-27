const mongoose = require('mongoose');

const roomSchema =  mongoose.Schema({
    
    floor: {type : String, trim : true, required : true, lowercase : true},
    roomNo: {type: Number, required : true, unique: true},
    noOfBeds : {type: Number,  required : true,},
    // status: {type: String, trim: true, required : true,lowercase : true},
    // price: {type: Number, required : true,},
  

    
    
})

var rooms = mongoose.model('rooms', roomSchema, 'rooms');
module.exports = rooms;