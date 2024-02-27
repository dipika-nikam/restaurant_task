import { Response } from "express";

interface SuccessResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}

export const sendSuccess = (res: Response, statusCode:number, message: string, data: any = null) => {
  const successResponse: SuccessResponse = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(successResponse);
};

export const sendError = (res: Response, statusCode: number, message: string,  error: any = null) => {
  const errorResponse: ErrorResponse = {
    success: false,
    message,
    error,
  };
  return res.status(statusCode).json(errorResponse);
};
