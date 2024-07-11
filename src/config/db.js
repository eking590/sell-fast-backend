import mongoose from "mongoose"; 
import { config } from "dotenv";

config() 

const Mongoose = process.env.MONGO_URL; 

export const db = mongoose.connect(Mongoose, { })
.then(() => console.log('Connected to sellfast database...')) 
.catch(err => console.log('Could not connect to sellfast database...'))