import mongoose, { Schema, Document } from "mongoose";
import { generateToken } from "../utils/token.util";
import { hashPassword } from "../utils/passwordUtils";

import { TokenPayload } from "../interfaces/user.interface";

import { setCurrentTimestamp } from "../helper/dateFunction";

import { IUser } from "../interfaces/user.interface";

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: setCurrentTimestamp },
  tokens: {type: String,}
});

// Define generateAuthToken method before creating the schema
userSchema.methods.generateAuthToken = function (): string {
    const payload: TokenPayload = {
      userId: this._id.toString(),
      username: this.username,
    };
  
    return generateToken(payload);
  };
  
  userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
      try {
        const hashedPassword = await hashPassword(this.password);
        
        this.password = hashedPassword;
      } catch (error: any) {
        console.log("Getting error while hashing a password", error);
        return next(error);
      }
    }
    next();
  });

const User = mongoose.model<IUser>("user", userSchema);

export default User;
