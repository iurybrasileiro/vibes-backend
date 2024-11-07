FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "migration:run"]
