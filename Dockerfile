FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
 
RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/build ./build

USER node

EXPOSE 5000

CMD ["npm", "start"]

