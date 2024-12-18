FROM node:18

WORKDIR /src

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["sh", "-c", "yarn migration:run && yarn prod"]