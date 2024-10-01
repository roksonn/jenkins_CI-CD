### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4200
RUN npm run build
CMD ["npm","run","start"]
