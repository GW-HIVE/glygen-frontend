# base image
FROM node:12.14.1-alpine as build

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.3.0 -g --silent

# set env variables
ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV

ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

ARG REACT_APP_DOMAIN
ENV REACT_APP_DOMAIN=$REACT_APP_DOMAIN

ARG REACT_APP_BETA_DOMAIN
ENV REACT_APP_BETA_DOMAIN=$REACT_APP_BETA_DOMAIN

ARG REACT_APP_DATA
ENV REACT_APP_DATA=$REACT_APP_DATA

ARG REACT_APP_SPARQL
ENV REACT_APP_SPARQL=$REACT_APP_SPARQL

ARG REACT_APP_BASELINE
ENV REACT_APP_BASELINE=$REACT_APP_BASELINE

COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.1-alpine
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]