import express from 'express';
import {registerController, loginControlller, testController, logoutController, forgotPasswordController, updateProfileController, getAllUsersController} from '../controllers/authController.js';
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


//register - post method
router.post('/register', registerController);

//Login - post method
router.post("/login", loginControlller)

//Logout - get method
router.get("/logout", logoutController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//forgot password \\ post
router.post('/forgot-password', forgotPasswordController)

//protected User route auth
router.get('/user-auth', requireSignin, (req,res) => {
    res.status(200).send({ok:true});
})

//protected Admin route auth
router.get('/admin-auth', requireSignin, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

//Update profile
router.put('/profile', requireSignin, updateProfileController)

//Get all users (Admin only)
router.get('/all-users', requireSignin, isAdmin, getAllUsersController)

export default router;