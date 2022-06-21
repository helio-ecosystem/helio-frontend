# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.4.0-alpine3.16 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.22.0-alpine
COPY --from=build /usr/src/app/dist/helio-frontend/ /usr/share/nginx/html

EXPOSE 80