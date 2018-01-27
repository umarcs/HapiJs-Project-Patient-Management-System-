
const Patient = require('../Models/patientSchema');
const PatientVisits = require('../Models/patientVisitsSchema');

const controller = {};

controller.patientRegistration = (request, reply) => {
    const payload = request.payload;
    payload.createdAt = Date.now();

    if (payload.patientId) {
        console.log("comming data",request.payload)
        // existing patient
        // verify patient
        Patient.findById(payload.patientId)
            .then((existinP) => {
                if (!existinP) {
                    return reply({ status: "fail", message: "Patient not found" })
                }
                //also update patient data if phone or addreee is changed
                Patient.findByIdAndUpdate(payload.patientId, { $set: request.payload }, { new: true }, (err, data) => {
                    // if (err) {
                    //     reply(err)
                    //     console.log(err)
                    // }
                    // else {
                    //     reply(data)
                    // }
                })
                const pId = existinP._id;


                payload.patient = pId;

                return PatientVisits.create(payload)
            })
            .then(newPatientV => {
                reply({ status: 'ok', message: "Patient created", pData : newPatientV });
            })
            .catch(function (err) {
                reply(err)
                console.log(err)
            })
    } else {
        Patient.create(payload)
            .then((newPatient) => {
                const nPId = newPatient._id;


                payload.patient = nPId;

                return PatientVisits.create(payload)
            })
            .then(newPatientV => {
                reply({ status: 'ok', message: "Patient created", pData : newPatientV });
                console.log(newPatientV)
            })
            .catch(function (err) {
                reply(err)
                console.log(err)
            })
    }


};
// patient information
controller.patientInfo = (request, reply) => {
    Patient.find({}, (err, data) => {
        if (err) {
            reply(data);
            console.log(err)
        }
        else {
            reply(data)
        }

    })
};
//delete record
controller.deleteRecord = (request, reply) => {
    const id = request.payload.id;
    Patient.deleteOne({ _id: id })

        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
            console.log(err)
        })
}
// get patient info by id
controller.getPatientInfoById = (request, reply) => {
    const id = request.params.id
    Patient.findOne({ _id: id }, (err, data) => {
        if (err) {
            reply({ "id": "false", "message": "Id is incorrect" })
            console.log(err)
        }
        else {
            reply(data)
        }
    })
}
// Edit patient information
controller.editinformation = (request, reply) => {
    const id = request.params.id;
    const data = request.payload;
   // console.log(id, data)
    Patient.findByIdAndUpdate(id, { $set: data }, { new: true }, (err, data) => {
        if (err) {
            reply(err)
            console.log(err)
        }
        else {
            reply(data)
        }
    })
};

// Storing Patient History After check up
controller.patientHistory = (request, reply) => {
    const payload = request.payload;
    payload.patient = payload.patient._id;
    console.log("hello",payload)
    const id =  payload._id;
     PatientVisits.findByIdAndUpdate(id, { $set: payload }, { new: true }, (err, data) => {
        if (err) {
            reply(err)
            console.log(err)
        }
        else {
            reply(data)
            console.log(data)
        }
    })

};
//patient vivsit Info
controller.patientVisitInformation = (request, reply) => {
    PatientVisits.find()
        .populate('patient')
        .then(function (patients) {
            reply(patients)
        })
        .catch(function (err) {
            reply(err)
            console.log(err)
        })
};
controller.patientVisitInfoById = (request, reply) => {
    const id = request.params.id;
   // console.log(id)
    PatientVisits.findOne({ _id: id })
        .populate('patient')
        .then(function (patients) {
            reply(patients)
        })
        .catch(function (err) {
            reply(err)
            console.log(err)
        })

};
//Patient searching
controller.patientSearching = (request, reply) => {
   // console.log(request.payload);
    const findBy = request.payload;
    const query = { 
        $or: [
            { 'firstName': { $regex: new RegExp('^'+findBy, "ig") } }, 
            { 'lastName': { $regex: new RegExp('^'+findBy, "ig") } }, 
        ] 
    };
    //console.log(query)
    Patient.find(query)
        .exec()
        .then( data => {
            reply({status: 'ok', data})
        })
        .catch( err => {
            reply({err})
            console.log(err)
        })
   
};
   

module.exports = controller;