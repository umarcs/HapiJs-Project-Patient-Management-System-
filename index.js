'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Joi = require('joi');
const Config = require('./Config');
const validate = require('./Authentication');

//---mongoose connection

var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/PMS';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function () {
	console.log('database conneced');
});
//---------end connection-------------------
mongoose.Promise = require('bluebird');
//----- server connection-------
server.connection({
	port: "2222",
	host: "localhost",
	routes: {
		cors: {
			origin: ['*']
		}
	}
});
//----end connection-----


//---All Routes Here----
server.route({
	method: "get",
	path: "/",
	handler: (request, reply) => {
		reply("WELCOME")
	}

})
server.route(require('./Routes/users'))
server.route(require('./Routes/patientRoutes'))
server.route(require('./Routes/RoomRoutes'))
server.route(require('./Routes/StaffRoutes'))
server.route(require('./Routes/DoctorRoutes'))

//Auth
server.register(require('hapi-auth-jwt2'), function (err) {

	if (err) {
		console.log(err);
	}

	server.auth.strategy('jwt', 'jwt',
		{
			key: Config.jwt.securityCode,          // Never Share your secret key
			validateFunc: validate,            // validate function defined above
			verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
		});

	//server.auth.default('jwt');

});


	//---start server---
	server.start((err) => {

		if (err) {
			throw err;
		}
		console.log(`Server running at: ${server.info.uri}`);
	});
//--end--