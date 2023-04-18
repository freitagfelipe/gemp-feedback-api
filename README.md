# GEMP feedback API

- This API serves as a bridge between the [GEMP feedback](https://www.github.com/freitagfelipe/gemp-feedback) website and my Telegram chat.

## How GEMP feedback API was made

- GEMP feedback API is written in [TypeScript](https://www.typescriptlang.org/), using [express](https://www.npmjs.com/package/express) and other libraries like:
    - [cors](https://www.npmjs.com/package/cors)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [telegraf](https://www.npmjs.com/package/telegraf)

## How it was implemented

- The API listen to the port setted in the enviroment variables and have only one main route that is /send that only accept GET requests. Before the request hit the route, it will pass by a CORS to check if the origin is acceptable checking if it is equal to the setted in the enviroment variables by the  name CORS. After that, if the CORS succeed the request will pass by a validator middleware to check if the request contains a type equal to positive or negative and a text query. If both middlewares succeed a message will be sent to the user setted in the .env using [telegraf](https://www.npmjs.com/package/telegraf), otherwise it will return an error.