# BirdsGate

## How to run:

copy/rename .env.example to .env and provide required configuration

```sh
cp ./.env.example .env
```

install dependencies

```sh
npm i
```

At this point it's expected that DB is up and running. npm start will run both fe and be.

```sh
npm start
```

(alternative) there is a docker-compose file to run app in docker.
```sh
npm run build && docker compose up
```

It will run FE on localhost:4200 and BE on localhost:3000
