import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

interface IJwtPayload {
    userId: string;
}

export interface IRequest extends Request {
    user?: object;
    token?: string;
}

export const authenticateToken = async (
    req: IRequest,
    res: Response,
    next: NextFunction) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).send({
                status: 401,
                message: "Unauthorized, please login.",
                error: true,
                data: {},
            });
        }

        const token = req.header('Authorization')?.replace("Bearer ", "");
        // .header("Authorization").replace("Bearer ", "")

        if (!token) {
            return res.status(401).send({
                status: 401,
                message: "Unauthorized, please login.",
                error: true,
                data: {},
            });
        }

        const decoded = jwt.verify(token, secretKey) as IJwtPayload;

        const user = await User.findOne({
            _id: decoded.userId,
            "tokens.token": token,
        });

        req.token = token;
        // req?.user = user;
        next();
    } catch (error) {
        console.log(error);

        if (error === "TokenExpiredError") {
            return res.status(403).send({
                status: 403,
                message: "Forbidden - Token expired, please login.",
                error: true,
                data: {},
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Something went wrong",
            error: true,
            data: {},
        });
    }
};
