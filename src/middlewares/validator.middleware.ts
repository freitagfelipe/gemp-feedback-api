import { IAPIError } from "../types/types";
import { NextFunction, Request, Response } from "express";

export function validator(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const { type, text } = req.query;

    if (type === undefined) {
        return next({
            statusCode: 400,
            message: "No type provided",
        } as IAPIError);
    } else if (type !== "positive" && type !== "negative") {
        return next({
            statusCode: 406,
            message: "Invalid type",
        } as IAPIError);
    }

    if (text === undefined) {
        return next({
            statusCode: 400,
            message: "No text provided",
        } as IAPIError);
    }

    next();
}
