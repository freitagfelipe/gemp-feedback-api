export interface IAPIError {
    statusCode: number;
    message: string;
}

export class APIError extends Error implements IAPIError {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
    }
}
