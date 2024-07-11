import express from 'express'; 
import { Passport } from '../../utils/passport.js';



const router = express.Router(); 



router.get('/auth/google', Passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', Passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: 'http://localhost:4000/api/v1/user/login'
}));


export { router as authRoute }