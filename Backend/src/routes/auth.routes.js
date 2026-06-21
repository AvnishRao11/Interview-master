import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
import * as middlewares from "../middlewares/auth.middleware.js";
const authRouter=Router();
;

/**
 * @route  POST /api/auth/register
 * @description Register a new user
 * @access Public
 * 
 */

authRouter.post('/register',authController.register);

/**
 * @route POST /api/auth/login
 * @description Login a existing user 
 * @acess Public 
 */
authRouter.post('/login',authController.login);

/**
 * @route POST /api/auth/refresh-token
 * @description To generate access token using refresh token 
 * @access Public 
 */
authRouter.post("/refresh-token",authController.refreshController);

/**
 * @route POST /api/auth/logout
 * @description To logout a user by blacklisting the refresh token 
 * @access Public 
 */
authRouter.post("/logout",authController.logout);


/**
 * @route GET/api/auth/get-user
 * @description To get the user details of the logged in user 
 * @access Private 
 */

authRouter.get("/get-user",middlewares.authMiddleware,authController.getUserDetails);



export default  authRouter ;