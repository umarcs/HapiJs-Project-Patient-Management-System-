const mongoose = require('mongoose');

const PatientVisitsSchema =  mongoose.Schema({
    
    patient: { type: mongoose.Schema.Types.ObjectId, required: true, ref : 'patients'},  
    doctor : { type : String, required : true},
    disease: { type: String, trim: true, required : true,lowercase : true},
    floor: { type: String, required : true },
    roomNo: { type : Number, required : true},
    price: { type : Number, required : true},
    dateOut  : { type : Date},
    totalPrice : { type : Number},
    MdcnAndSrvChrg : { type : Number},
    checkedOut : { type : Date},
    tokenNumber: { type: Number, default: 0},
    createdAt : { type : Date, default : new Date()},

    
    
});

PatientVisitsSchema.pre('save', function(next) {
    console.log('this.isNew', this.isNew, this.price)
    let _this = this;
    if (this.isNew) {
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        console.log('today: ', today)
        // in case of new record
        Patient.findOne({"createdAt": {$gte: today} })
            .select('tokenNumber')
            .sort({'tokenNumber': -1})
            .then( function(doc) {
                console.log('doc', doc)
                if(!doc) {
                    _this.tokenNumber = 1;
                } 
                else {
                    var max = doc.tokenNumber;
    
                    _this.tokenNumber = max + 1;
                } 
               
                next();
            });
    }
    
});

const Patient = mongoose.model('patient_visits', PatientVisitsSchema, 'patient_visits');

module.exports = Patient;