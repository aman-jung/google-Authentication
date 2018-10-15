const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const keys = require('../config/keys');
passport.serializeUser((user,done)=>{
	console.log("user id is:",user.id);
	done(null,user.id);
});
passport.deserializeUser((id,done)=>{
	Users.findById(id).then(user=>{
		done(null,user);
	});
});
passport.use(new GoogleStrategy(
{
	clientID:keys.googleClientID,
	clientSecret:keys.googleClientSecret,
	callbackURL:'/auth/google/callback'
},
async (accessToken,refreshToken,profile,done)=>
{
	const existingUser = await Users.findOne({googleId:profile.id})
	if(existingUser){
		return done(null,existingUser)
	}
		const user = await new Users({googleId:profile.id}).save()
		done(null,user);
}
));