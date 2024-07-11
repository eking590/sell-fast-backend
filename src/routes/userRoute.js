import express from 'express'; 
import { RegisterUser } from '../controllers/Auth/RegisterUser.js';
import { userLogin } from '../controllers/Auth/LoginUser.js';
// import { Authorization } from '../middlewares/authorization.js';



const router = express.Router(); 



//create user 
router.post("/register", RegisterUser); 

//login user 
router.post("/login", userLogin)






export { router as userRoute }