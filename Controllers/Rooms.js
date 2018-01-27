
const roomSchema = require('../Models/roomSchema');

const controller = {};

controller.rooms = (request, reply) =>{
    const payload = request.payload;

    roomSchema.create(payload)    
        .then(function(data){
            reply(data)
        })
        .catch(function(err){
            reply(err)
            console.log("lolo",err)
        })
    
    
};
    controller.roomInfo = (request, reply)=>{
        roomSchema.find({},(err, data)=>{
            reply(data);
        })
    };

    controller.roomDelete = (request, reply)=>{
        const id = request.payload.id;
         roomSchema.deleteOne({ _id : id})  
        .then(function(data){
            reply(data)
        })
        .catch(function(err){
            reply(err)
        })
       
    };

    controller.roomInfoBeforeEdit = (request, reply)=>{
        const id = request.payload.roomId;
         roomSchema.findOne({_id : id},(err, data)=>{
            if(err){
                reply({"id":"false","message" : "Id is incorrect"})
            }
            else{
                reply(data)
            }
        })
    }

    controller.editRoomData = (request, reply)=>{
         const id = request.params.id;
        roomSchema.findByIdAndUpdate(id, { $set: request.payload},  { new: true } ,(err, data)=>{
            if(err){
                reply(err)
            }
            else{
                reply(data)
            }
        })
    }


module.exports = controller;


