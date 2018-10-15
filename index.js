const express = require('express');
const mongoose= require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const app = express();
app.use(cookieSession({
	maxAge:30*24*60*60*1000,
	keys:[keys.cookiekey]
}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/addRoutes')(app);
mongoose.connect(keys.clientURI);
app.listen(4000,
	()=>{
		console.log("Server is up and running");
	});

