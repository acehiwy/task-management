# Task Management System

## Description

Basic CRUD API for task management.

## Requirements

Docker and Docker Compose

See [Docker install instruction](https://docs.docker.com/get-docker/).

## Running the app

At project root directory run:

```bash
docker compose up
```

Wait for project to complete building.

You should see a green message display:

```
Nest application successfully started
```

## Interact with API

You can use your desire API client to make a request. Download a JSON OpenAPI specification [here](http://localhost:20001/api-json).

Or You can use Swagger UI to interact with the API by navigate to http://localhost:20001

Note: You need to use user id as a token for authorization since complete authentication/authorization flow is not implemented. You can create a user by making a request to `POST /users`

## Database client

The project provide a database client to interact with data inside database.

Simply navigate to http://localhost:20002

## License

Nest is [MIT licensed](LICENSE).
