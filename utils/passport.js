import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import user from '../src/models/user.js';
import { config } from "dotenv";

config()
//configure your passport credentials 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: 'http://localhost:8080/auth/google/callback', 
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => { 
    try {
        const existingUser = await user.findOne({ googleId: profile.id})
        if (existingUser) {
            return done(null, existingUser); 
        }
        const newUser = new user({
            fullName: profile.displayName, 
            email: profile.emails[0].value, 
            googleId: profile.id 
        }); 
        await newUser.save() 
        return done(null, newUser); 
    } catch (error) {
        return done(err)
    }} 

    
))

passport.serializeUser((user, done) => {
    done(null, user.id); 
}); 

passport.deserializeUser(async (id, done) => {
    try {
        const User = await user.findById(id); 
        done(null, User)
    } catch (err) {
        done(err)
    }
}); 


export { passport as Passport }