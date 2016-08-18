# Depends on `ng build -prod` being run

FROM nginx:latest

COPY ./dist /usr/share/nginx/html
