FROM node:18.12-alpine

COPY . .

RUN npm i

EXPOSE 8080 8080

CMD [ "npm", "start" ]