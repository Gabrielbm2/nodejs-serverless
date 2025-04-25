FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install -g ts-node typescript

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
