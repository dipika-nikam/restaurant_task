import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as UserQueryService from "../services/user.service"
import { sendSuccess, sendError } from "../messages/response.json";
import { userSchema } from "../schema/user.schema";
import {decodeToken } from '../utils/token.util'


/**
 * Register a user
 *
 * @body username, email, password
 *
 * @returns {user}
 */
export const userRegisterHandler = async (req: Request, res: Response) => {
    const {error}  = userSchema.validate(req.body)    
    if (error){
        const errorMessage = error.details[0].message.replace(/"/g, '')
        const capitalizedErrorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
        return sendError(res, 404, capitalizedErrorMessage)
    }
    const { username, email, password } = req.body;
    try {
        let user = await UserQueryService.createUserService(username, email, password);
        sendSuccess(res, 201, "User created successfully", { user });

    } catch (error) {             
        console.log(error);
                       
        sendError(res, 500, "Email already register.")
    }

}


/**
 * Login a user
 *
 * @body email, password
 *
 * @returns {user , token}
 */

export const userLoginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
        return sendError(res, 404, "Email is required for login.");
    }

    if (!password) {
        return sendError(res, 404, "Password is required for login.");
    }

    try {
        let user = await UserQueryService.loginUserService(email);        
        if (!user) {
            return sendError(res, 404, "User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendError(res, 404, "Invalid password");
        }
        const newToken: string = await user.generateAuthToken();
        user.tokens = newToken;
        await user.save();

        return sendSuccess(res, 200, "Login success", user);
    } catch (error) {
        console.error(error);
        return sendError(res, 500, "Something went wrong");
    }
};

/**
 * Forgot password
 *
 * @body email
 *
 * @returns {link}
 */

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserQueryService.forgotPasswordService(email);
        if (!user) {
            return sendError(res, 404, 'User not found');
        }

        return sendSuccess(res, 200, 'Password reset email sent');
    } catch (error) {
        console.error(error);
        return sendError(res, 500, "Something went wrong.");
    }
};


export const changePassword = async (req: Request, res: Response) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return sendError(res, 404, "Your confirm password doesn't match with new password");
        }

        let authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return sendError(res, 401, "Authorization header not provided");
        }

        let token = await decodeToken(authorizationHeader);
        if (!token) {
            return sendError(res, 401, "Invalid token");
        }

        const userId = token['userId'];       

        const user = await UserQueryService.getUserById(userId);
        if (!user) {
            return sendError(res, 404, "User not found")
        }

        const data =  await UserQueryService.changeUserPassword(userId, newPassword, authorizationHeader);   
        if (data instanceof Error) {
            return sendError(res, 400, data.message);
        }     
        return sendSuccess(res, 200, "Password changed successfully.");
    } catch (error) {
        console.error(error);
        return sendError(res, 500, "Internal Server Error");
    }
};