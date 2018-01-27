const RoomController = require('../Controllers/Rooms');
const Joi = require('joi');

const roomRoutes = [
    {
        method: 'post',
        path: '/api/addRoom',
        config: {
            validate: {
                payload: {

                    floor: Joi.string().required(),
                    roomNo: Joi.number().required(),
                    noOfBeds: Joi.number().max(2).required(),
                    // status: Joi.string().required(),
                    // price: Joi.number().required(),

                }
            }
        },

        handler: RoomController.rooms
    },
    {
        method: 'get',
        path: '/api/roomInformation',

        handler: RoomController.roomInfo
    },
    {
        method: 'post',
        path: '/api/roomDeleteRecord',
        config: {
            validate: {
                payload: {

                    id: Joi.string().required(),
                }
            }
        },
        handler: RoomController.roomDelete
    },
    {
        method: 'post',
        path: '/api/getRoomInfoBeforeEdit',
        config: {
            validate: {
                payload: {

                    roomId: Joi.string().required(),
                }
            }
        },
        handler: RoomController.roomInfoBeforeEdit
    },
    {
        method: 'put',
        path: `/api/rooms/{id}`,
        config: {
            validate: {
                params: {
                    id: Joi.string()
                },
                payload: {
                    floor: Joi.string().required(),
                    roomNo: Joi.number().required(),
                    noOfBeds: Joi.number().max(2).required(),
                    // status: Joi.string().required(),
                    // price: Joi.number().required(),
                }
            }
        },
        handler: RoomController.editRoomData
    },
    



]
module.exports = roomRoutes;




