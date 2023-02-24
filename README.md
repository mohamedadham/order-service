# Order service

This is the repository for the Order Service, built with NestJS and Prisma. The service receives messages from the RabbitMQ service and exposes a GraphQL API using the code-first approach.

## Running the Service
To run the service, you need to have Docker and Docker Compose installed on your machine. Once you have those, navigate to the root directory of the repository and run:
```
docker-compose up
```
This will start all the necessary services, including PostgreSQL, RabbitMQ, and Elasticsearch.

## Service Architecture
The Order Service is part of a larger microservices architecture. The architecture consists of the following services:

- User Service
- Product Service
- Order Service
- Payment Service
- Gateway
Each service is responsible for a specific domain of the application. The Gateway service acts as a single entry point for all the other services.

## Dependencies
The Order Service depends on the following technologies:

NestJS
Prisma
RabbitMQ
GraphQL

## Configuration

The Order Service can be configured using environment variables. The following environment variables are available:

DATABASE_URL: The URL for the database.
RABBITMQ_URL: The URL for the RabbitMQ service. Defaults to amqp://guest:guest@rabbitmq:5672.
ELASTICSEARCH_URL: The URL for the Elasticsearch service. Defaults to http://localhost:9200.

## Contributing
Contributions to the Order Service are always welcome! If you have a feature request or a bug to report, please open an issue on the repository. If you would like to contribute code, please fork the repository and submit a pull request.