# Helio Frontend

# Quickstart

Using Helio-Frontend is very easy with docker. You only need to pull the latest version from Docker Hub with next command
```cmd
docker pull emiliocrespoperan/helio-frontend:latest
```

This docker image has the following docker environment variables:
* **HELIO_REST_HOST**. You can tell to Helio-Frontend where is Helio-Rest host. By default the host is http://localhost:4567.
* **HELIO_MODE**. Helio-Frontend has two modes:
  * *APP*. (Default) This mode manages Helio components and mappings.
  * *PLAYGROUND*. This mode fits for people who want to learn about Helio Ecosystem, which contains tutorials that it will be updated frequently.



Use docker compose with the following recipe if you want the  version for this project:

```yml
version: '3'
services:
  helio-publisher:
    image: acimmino/helio-rest:latest
    volumes: 
      - ./local/:/usr/src/app/local/
      - ./db/:/usr/src/app/db/
    ports:
      - "4567:4567"
  frontend:
    image: emiliocrespoperan/helio-frontend:latest
    depends_on:
      - helio-rest
    ports:
      - "4201:80"
```

Otherwise, if you want a minimal application to learn about [Helio-Ecosystem](https://github.com/helio-ecosystem), use this docker compose instead:

```yml
version: '3'
services:
  helio-publisher:
    image: acimmino/helio-rest:latest
    volumes: 
      - ./local/:/usr/src/app/local/
      - ./db/:/usr/src/app/db/
    ports:
      - "4567:4567"
  frontend:
    image: emiliocrespoperan/helio-frontend:latest
    depends_on:
      - helio-rest
    ports:
      - "4201:80"
      - HELIO_REST_HOST=http://localhost:4567
      - HELIO_MODE=PLAYGROUND
```
