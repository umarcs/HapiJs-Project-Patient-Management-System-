
const staffSchema = require('../Models/staffSchema');

const controller = {};
// add staff information
controller.addStaff = (request, reply) => {
    const payload = request.payload;

    staffSchema.create(payload)
        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })


};
// staff informatio
controller.staffInfo = (request, reply) => {
    staffSchema.find({}, (err, data) => {
        if(err){
        reply(data);
        }
    else{
        reply(data)
    }
    })
};
// staff delete
controller.deleteStaff = (request, reply) => {
    const id = request.payload.id;

    staffSchema.deleteOne({ _id: id })

        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })

};
// Get info of staff by id to display before edit
controller.getInfoStaffByID = (request, reply) => {
    const id = request.params.id;
    staffSchema.findOne({ _id: id }, (err, data) => {
        if (err) {
            reply({ "id": "false", "message": "Id is incorrect" })
        }
        else {
            reply(data)
        }
    })
}

// Edit Staff Information
controller.editStaffInfo = (request, reply) => {
   
    const id = request.params.id;
    staffSchema.findByIdAndUpdate(id, { $set: request.payload }, { new: true }, (err, data) => {
        if (err) {
            reply(err)
        }
        else {
            reply(data)
        }
    })

}



module.exports = controller;


