# Helio Frontend

# Quickstart

Use docker compose with the following recipe if you want the full version for this project:

```yml
version: '2'
services:
  helio-rest:
    image: acimmino/helio-rest:latest
    volumes: 
      - type: volume
        source: helio-db
        target: /helio/app
        volume: {}
    ports:
      - "4567:4567"

  frontend:
    image: emiliocrespoperan/helio-frontend:latest
    depends_on:
      - helio-rest
    ports:
      - "4201:80"

volumes:
  helio-db:
    name: helio-db
```

Otherwise, if you want a minimal application to learn about [Helio-Ecosystem](https://github.com/helio-ecosystem), use this docker compose instead:

```yml
version: '2'
services:
  helio-rest:
    image: acimmino/helio-rest:latest
    volumes: 
      - type: volume
        source: helio-db
        target: /helio/app
        volume: {}
    ports:
      - "4567:4567"

  playground:
    image: emiliocrespoperan/helio-frontend-playground:latest
    depends_on:
      - helio-rest
    ports:
      - "4202:80"
        
volumes:
  helio-db:
    name: helio-db
```
