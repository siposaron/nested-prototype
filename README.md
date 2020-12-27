# Nested Prototype

This is a prototype for creating rest api endpoints.

Technology | Reason
--- | ---
NodeJS | Modern JS environment and engine
NestJS | Enterprise ready Node framework (Spring like)
Fastify | Faster than Express for REST endpoints
MongoDB | Fast document DB
Yarn 2 | Modern build tool


## 1. FEATURES

- Modular architecture
- REST API endpoints
- DTO validation
- MongoDB schemas with DTO transformation
- Swagger doc for REST API endpoints
  
## 2. RUNNING THE APP

### 2.1 Build the app

`yarn install`

`yarn run build`

### 2.2 Run the app

Run the application either within Docker engine with docker-compose or simply as a local process assuming you already have a mongodb running.

#### A) Run with Docker

Start:
`docker-compose up --build`

Stop:
`docker-compose down`

#### B) Run as local process

Ensure you have a running mongodb. Default connection URL points to `mongodb://localhost:27017/nested`
You can override it by setting the env variable MONGO_URL.

Start:
`yarn start:dev`

Stop:
`CMD+C` / `CTRL+C`

### 2.3 Overwrite default env variables

Env variable | Default value
--- | ---
MONGO_URL | mongodb://localhost:27017/nested
PORT | 3000
AUTH_SECRET | s3cr3t

These variables can be overwritten either locally or in docker-compose.yml.
## 3. ACCESS APP DOC

[localhost:3000/api-doc](http://localhost:3000/api-doc)