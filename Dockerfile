FROM --platform=linux/arm64 node:20-slim AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM --platform=linux/arm64 node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist

EXPOSE 20001
CMD [ "yarn", "start:prod" ]