# GEMP feedback API

- This API serves as a bridge between the [GEMP feedback](https://www.github.com/freitagfelipe/gemp-feedback) website and my Telegram chat.

## How GEMP feedback API was made

- GEMP feedback API is written in [TypeScript](https://www.typescriptlang.org/), using [express](https://www.npmjs.com/package/express) and other libraries like:
    - [cors](https://www.npmjs.com/package/cors)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [telegraf](https://www.npmjs.com/package/telegraf)

## How it was implemented

- The API listen to the port setted in the .env and have only one main route /send that only accept GET requests. Before the request hit the route, it will pass my two middlewares, one to check if the header has an authorization and is equal to the authorization setted in the .env, the second middleware is just to check if the request contains a type equal to positive or negative and a text query. If both middlewares succeed a message will be sent to the user setted in the .env using [telegraf](https://www.npmjs.com/package/telegraf), otherwise it will return an error.