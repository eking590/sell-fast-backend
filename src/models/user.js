import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    googleId: {type: String}
    
   
}, { timestamps: true });



const user = mongoose.model('user', UserSchema);
export default user;
