
const doctorSchema = require('../Models/doctorSchema');

const controller = {};
// add doctors information
controller.addDoctor = (request, reply) => {
    const payload = request.payload;

    doctorSchema.create(payload)
        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })
};
//Get doctors Information
controller.doctorsInfo = (Request, reply) => {
    doctorSchema.find({}, (err, data) => {
        if (err) {
            reply(err)
        }
        else {
            reply(data)
        }
    })
};

// delete doctor record

controller.deleteDoctorRecord = (request, reply) => {
    const id = request.payload.id
    //reply(id)
    doctorSchema.deleteOne({ _id: id })
        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })
}

// doctor info by id
controller.doctorInfoById = (request, reply) => {
    const id = request.params.id;

    doctorSchema.findOne({ _id: id }, (err, data) => {
        if (err) {
            reply({ "id": "false", "message": "Id is incorrect" })
        }
        else {
            reply(data)
        }
    })
}
// edit doctor
controller.editDoctor = (request, reply) => {
    const id = request.params.id;
    doctorSchema.findByIdAndUpdate(id, { $set: request.payload }, { new: true }, (err, data) => {
        if (err) {
            reply(err)
        }
        else {
            reply(data)
        }
    })



   
}
 module.exports = controller;
