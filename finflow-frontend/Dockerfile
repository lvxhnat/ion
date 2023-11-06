FROM debian:buster-slim 
FROM node:14.17.3 as build-stage

WORKDIR /app/frontend
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install --silent

COPY . .

ARG REACT_APP_SERVER
ENV REACT_APP_SERVER=$REACT_APP_SERVER

RUN npm run build

EXPOSE 3000