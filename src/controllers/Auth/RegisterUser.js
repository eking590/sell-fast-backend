import express from "express"; 
import user from "../../models/user.js";

import { hashPassword } from "../../../utils/hashpassword.js";

// import bcrypt from "bcryptjs"; 
import asyncHandler from "express-async-handler"


export const RegisterUser = asyncHandler(async (req, res) => { 

    const { fullName, email } = req.body; 

    const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    const password = await hashPassword(req.body.password); 
    const User = new user ({ fullName, email,  password}) 
    try {
        //check if user with email already exists 
        const userExists = await user.findOne( { email }); 
        if(userExists){
            console.log(userExists)
            return res.status(201).send({ msg: "user Already exist"})
        }
        //save user to database 
        await User.save(); 
        //also save the user to the  database 
         

        // console.log(User);
               
        //send Welcome email here 
        // welcomeEmail(user.email, user.fullName); 
        const data = User 
        res.status(201).send({
            data: data, 
            msg: "User Registered SUCCESSFUL!!!!"
        })
    } catch (error) {
        console.log("there is an error", error); 
        res.status(400).send(error); 
    }  

}) 