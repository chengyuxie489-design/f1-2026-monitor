FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY index.html styles.css calendar.css app.js calendar.js sync-stability.js server.js races-live.json ./

ENV NODE_ENV=production
ENV PORT=4173
ENV UPDATE_INTERVAL_MS=120000

EXPOSE 4173

CMD ["node", "server.js"]
