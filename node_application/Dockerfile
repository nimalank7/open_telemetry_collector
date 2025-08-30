FROM node:latest

COPY index.js logger.js package.json package-lock.json ./
RUN npm install

ENTRYPOINT ["node", "index.js"]