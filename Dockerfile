# Depends on `ng build -prod` being run

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./dist /usr/share/nginx/html
