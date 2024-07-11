import express from "express";
// import {authRoutes, likeRoutes,profileRoutes} from '../src/routes/index.js'
// import { Authorization } from "./middlewares/authorization.js";
import { Passport } from "../utils/passport.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 
import session from 'express-session';
import mongoose from "mongoose";
import { db } from "./config/db.js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { AuthRoute, UserRoute } from "./routes/index.js";

//import { generatedOtp } from "../utils/otpGenerator.js";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
//init sockect.io
// const httpServer = createServer(app);
// const io = new Server(httpServer);

// //check io connection
// io.on("connection", (socket) => {
//   console.log(`${socket} connected`);
// });

// Increase the payload limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
//add errorhandler here 
// app.use(errorHandler);
//routes

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    next(); 
}); 


//configure session middleware 
app.use(session({
    secret: process.env.JWT_SECRET, 
    resave: false, 
    saveUninitialized: true, 
}))


//initiaze passport
app.use(Passport.initialize()); 
app.use(Passport.session()); 

//.env config
config();


// define the googleOauth routes 
app.use("/api/v1/auth", AuthRoute);
  

//user route
app.use("/api/v1/user", UserRoute);

//like routed 
// app.use("/api/v1/like", likeRoutes); 


//profile routed 
// app.use("/api/v1/profile", profileRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to Sellfast inventory system!');
  });

//app routes
//app.use("/api/v1/app", authorization, appRoute);



 


app.listen( process.env.PORT|| 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port http://localhost:${process.env.PORT}  `);
});