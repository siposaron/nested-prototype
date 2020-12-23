# Base Node Image
FROM node:lts-alpine AS base

LABEL maintainer="Aron"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn run build

# Release
# FROM base as release
# COPY --from=base /usr/src/app/dist/ ./dist/
# RUN yarn install
# EXPOSE 3000

CMD yarn run start
