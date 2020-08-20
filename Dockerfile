# This file is a template, and might need editing before it works on your project.
FROM node:lts-alpine

# Uncomment if use of `process.dlopen` is necessary
# apk add --no-cache libc6-compat

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

CMD [ "yarn", "start" ]
