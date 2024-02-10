FROM debian:buster-slim 
FROM node:14.17.3 as build-stage

WORKDIR /app/frontend
ENV PATH /app/node_modules/.bin:$PATH

# Update package sources to use Debian Buster repositories
RUN sed -i 's/stretch/buster/' /etc/apt/sources.list

# Install Certbot and cron, execute the script
RUN apt-get update && apt-get install -y certbot cron
COPY docker/frontend/docker-entrypoint.sh .
RUN chmod +x /app/frontend/docker-entrypoint.sh
RUN echo "0 23 * * * root /app/frontend/docker-entrypoint.sh" > /etc/cron.d/certificate_renewal

COPY frontend/package.json .
RUN npm install --silent

COPY frontend .

ARG REACT_APP_SERVER
ENV REACT_APP_SERVER=$REACT_APP_SERVER

RUN npm run build

EXPOSE 3000

FROM nginx:latest
# We copy from build stage as this entired script is compiled in build-time not run-time!
COPY  --from=build-stage /app/frontend/build /var/www/finflow.cloud/html
COPY  --from=build-stage /app/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf