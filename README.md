# search

Elasticsearch microservice for hrs75-thesis.

## Team

- Ming Feng
- Ali Elgiadi
- Oliver Ullman
- Kriz Cortes

## Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1Uc6yfhYeWaZFlB6Q7AkCwsTridQs7q7b_kHSwMbx0tY/edit)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](##installing-dependencies)
1. [Database Initialization](#database-initialization)
1. [Running the App](#running-the-app)

## Usage

Used to return results that match a query from pledgeit.

Used to maintain an project index for elasticsearch to work for pledgeit.


## Requirements

- Node 6.9.x
- Postgresql 9.6.x
- Bookshelf
- Knex
- Docker
- Elasticsearch

## Development

### Installing System Dependencies

```
brew install yarn
brew install postgresql

View elasticsearch installation [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

```

## Database Initialization

IMPORTANT: connecting to database on hrsf75-thesis repo.


## Running the App

To run server: `yarn run start`

To run elasticsearch: `elasticsearch`
