import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Telegraf } from "telegraf";
import { IAPIError, APIError } from "./types/types";
import { validator } from "./middlewares/validator.middleware";
import { validateEnvs } from "./utils/validateEnvs";

const { BOT_API_TOKEN, PORT, USER_ID, CORS } = validateEnvs("BOT_API_TOKEN", "PORT", "USER_ID", "CORS");

const app = express();
const bot = new Telegraf(BOT_API_TOKEN);

app.use(
    cors({
        origin(requestOrigin, callback) {
            if (requestOrigin === CORS) {
                callback(null, true);
            } else {
                callback(new APIError("CORS not allowed", 401));
            }
        },
    })
);

bot.launch();

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "ok",
    });
});

app.use(validator);

app.get("/send", (req: Request, res: Response) => {
    const { type, text } = req.query;
    const translatedType = type === "positive" ? "positivo" : "negativo";
    const emojis = type === "positive" ? "🥳🥳🥳" : "😭😭😭";

    bot.telegram.sendMessage(
        USER_ID,
        `*Você recebeu um feedback!!!*\n\nEle é ${translatedType} ${emojis}\n\nO conteúdo do feedback é:\n${text}`,
        {
            parse_mode: "Markdown",
        }
    );

    res.json({
        message: "ok",
    });
});

app.use((err: IAPIError, _req: Request, res: Response, next: NextFunction) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });

    next();
});

app.listen(PORT, () => {
    console.log(`Listening the port ${PORT}`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
