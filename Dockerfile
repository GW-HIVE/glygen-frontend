# base image
FROM node:12.14.1-alpine as build

#set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.3.0 -g --silent

COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.1-alpine
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]