FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY .  .

EXPOSE 4000

CMD ["node", "cross-env", "NODE_ENV=production", "node ./server.js"]