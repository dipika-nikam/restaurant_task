import User from "../models/user.model"
import { IUser } from "../interfaces/user.interface"
import { hashPassword } from "../utils/passwordUtils";
import sendEmail from "../utils/sendEmail"



/**
 * Login a  user service
 *
 * @body email, password
 *
 * @returns {user , token}
 */
export const createUserService = async (username: string, email: string, password: string) => {    
    const hashedPassword = await hashPassword(password);    
    const user = await User.create({
        username: username,
        email: email,
        password: password
    });
    return user
}


/**
 * Login a  user service
 *
 * @body email, password
 *
 * @returns {user , token}
 */
export const loginUserService = async (email: string) => {
    let user = await User.findOne({ email });    
    return user
}

/**
 * Send link a  user service
 *
 * @body email
 *
 * @returns {link}
 */

export const forgotPasswordService = async (email:string) =>{
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const resetToken = await user.generateAuthToken();
        const resetUrl = `http://localhost:8001/api/auth/reset-password/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}`,
        }); 
        user.tokens = resetToken;
        await user.save();

        return user;
    } catch (error) {
        throw new Error("Error sending password reset email: " + error);
    }
};

export const changeUserPassword = async (userId: string, newPassword: string, authorizationHeader: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }        
        const hashedNewPassword = await hashPassword(newPassword);
        user.password = hashedNewPassword;
        const newToken: string = await user.generateAuthToken();
        user.tokens = newToken;
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Error changing password: " + error);
    }
};

export const getUserById = async (userId: string) => {
    try {
        const user = await User.findById(userId);     
        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error);
    }
};