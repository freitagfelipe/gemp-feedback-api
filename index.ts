import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Telegraf } from "telegraf";
import { auth } from "./src/middlewares/auth.middleware";
import { APIError } from "./src/types/types";
import { validator } from "./src/middlewares/validator.middleware";

const app = express();
const bot = new Telegraf(process.env.BOT_API_TOKEN!);
const port: number = process.env.PORT as unknown as number;

app.use(cors());

bot.launch();

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "ok",
    });
});

app.use(auth);
app.use(validator);

app.get("/send", (req: Request, res: Response) => {
    const { type, text } = req.query;
    const translatedType = type === "positive" ? "positivo" : "negativo";
    const emojis = type === "positive" ? "🥳🥳🥳" : "😭😭😭";

    bot.telegram.sendMessage(
        process.env.USER_ID!,
        `*Você recebeu um feedback!!!*\n\nEle é ${translatedType} ${emojis}\n\nO conteúdo do feedback é:\n${text}`,
        {
            parse_mode: "Markdown",
        }
    );

    res.json({
        message: "ok",
    });
});

app.use((err: APIError, _req: Request, res: Response, _next: NextFunction) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });
});

app.listen(port, () => {
    console.log(`Listening the port ${port}`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
