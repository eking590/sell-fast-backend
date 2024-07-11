import express from "express"; 



import pkg from 'jsonwebtoken'; 
import {  PasswordCorrect } from "../../../utils/hashpassword.js";
import asyncHandler from "express-async-handler"
import user from "../../models/user.js";




export const userLogin =   asyncHandler(async (req, res,next) => {
    
    const jwt = pkg; 
    const { email,  password } = req.body; 
    
        //userName must be alphanumeric combination; 
         //check if user with email  already exists
        const userExists = await user.findOne( { email } ); 
        if(!userExists){
            res.status(404);
            throw new Error(`the user with ${email} does not exist!!!`); 
         
        } 
        //check if password is correct 
        const passwordCorrect = await PasswordCorrect(password, userExists)
        if (passwordCorrect){
            const user = {
                data: userExists
            }
            const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            }) 
            return res.status(200).send({
                msg: "user Login Successfully", 
                accessToken
            })
        } 
        if(!passwordCorrect) {
            res.status(404);
           throw new Error("Incorrect password ")
        }
    
        throw new Error("Something went Wrong!!!"); 
    }
)    



