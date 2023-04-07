FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ../../ion-frontend/ ./

RUN yarn

# start app
CMD ["yarn", "start"]