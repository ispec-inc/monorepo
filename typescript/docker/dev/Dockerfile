FROM node:14.18

WORKDIR /app

ENV NUXT_HOST 0.0.0.0

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
