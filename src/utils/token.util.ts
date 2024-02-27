import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../interfaces/user.interface";
dotenv.config();

const secretKey = process.env.JWT_SECRET as string;
const tokenExpiration = process.env.tokenExpiration as string;

export const generateToken = (payload: TokenPayload): string => {
  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  if (!tokenExpiration) {
    throw new Error("tokenExpiration is not defined in the environment variables.");
  }

  return jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
};

export const decodeToken = (token:string) => {
  try {
    let tokenWithoutBearer = token.split(' ')[1];
    let decodedToken: JwtPayload | null = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string) as JwtPayload;    
    return decodedToken
  } catch (error) {
    return null;
  }
}
