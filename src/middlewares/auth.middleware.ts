import { NextFunction, Request, Response } from "express";
import { APIError } from "../types/types";

export function auth(req: Request, _res: Response, next: NextFunction): void {
    const { authorization: token } = req.headers;
    const authorization_token = process.env.AUTHORIZATION_TOKEN!;

    if (token === undefined) {
        return next({
            statusCode: 400,
            message: "No token provided",
        } as APIError);
    } else if (token !== authorization_token) {
        return next({
            statusCode: 401,
            message: "Invalid token",
        } as APIError);
    }

    next();
}
