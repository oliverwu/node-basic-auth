"use strict";

const express = require("express");

//NPM package for Basic Auth
//npm install basic-auth
const basicAuth = require("basic-auth");

const app = express();

//User Info
const authUser = {
	name: "hinterlands",
	password: "password123"
};

//Basic Auth Middleware functions
const auth = function(req, resp, next) {
	function unauthorized(resp) {
		//Prompt Auth form for Username and Password
		resp.set("WWW-Authenticate", "Basic realm=Input User&Password");
		return resp.sendStatus(401);
	}

	const user = basicAuth(req);

	//To Activate the prompt form
	if (!user || !user.name || !user.pass) {
		return unauthorized(resp);
	}

	if (user.name === authUser.name && user.pass === authUser.password) {
		return next();
	} else {
		return unauthorized(resp);
	}
};

//No Basic Auth
app.get("/", (req, resp) => {
	resp.status(200).send("No Authorization");
});

//Add Basic Auth Middleware functions as callback
app.get("/auth", auth, (req, resp) => {
	resp.status(200).send("Basic Authorization");
});

app.listen(3003, () => {
	console.log("connect to http://localhost:3003/");
});
