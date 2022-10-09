# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.4.0-alpine3.16 AS build

ARG profile=production

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g envsub

COPY . .

RUN npm run build -- --output-path=./dist/out --configuration=$profile


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.22.0-alpine
COPY --from=build /app/dist/out/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Replace docker env variables in angular app configuration
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/config.template.json> /usr/share/nginx/html/assets/config.json && exec nginx -g 'daemon off;'"]

