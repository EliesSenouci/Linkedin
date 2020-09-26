FROM node:10
WORKDIR /Users/eliessenouci/Dev/epitech/TodoList/api/app
COPY ./src/package*.json ./
RUN npm install
COPY ./src .
CMD node index.js
EXPOSE 8081