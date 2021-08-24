# Alloy Take Home Challenge

## Introduction

The project will consist of building a a mini workflow engine that listens for new Shopify orders, and when orders are placed, triggers off a Slack alert if the order total exceeds $100.

## User Stories

- As a client, to have page where to authenticate pages.

- As a client, I want to get a notification when shopify order exceeds $100 or more.

## Proposed Solution

### Stack

- NodeJS
- React
- Typescript
- MongoDB

### Models

- `Account` <br />
  Represents account that will be linked to slack and shopify.

  - `email` - REQUIRED STRING <br />
    Account email
  - `password` - REQUIRED STRING <br />
    Encrypted password
  - `shopifyUrl` - REQUIRED STRING <br />
    Channel that the bot will message to.
  - `shopifyAccessToken` - STRING <br />
    Shopify token to be able add webhook and access api.
  - `slackAccessToken` - STRING <br />
    Slack token to be able to message
  - `slackChannelId` - STRING <br />
    Channel that the bot will message to.

### APIS

- GET `/account` <br />
  A route that serve account back to the client: <br />

  ```
  // Account
  {
    email: "some@email.com",
    isSlackAuthenticated: true | false,
    isShopifyAuthenticated: true | false,
  }
  ```

- POST `/auth/login` <br />
  A route to serve login event for the client. <br />
  Request must have: <br />

  - email
  - password<br />

  ```
  // Login token
  {
    "token": some-JWT-token
  }
  ```

- POST `/auth/register` <br />
  A route to handle registering new accounts <br />
  Request must have: <br />

  - email
  - password
  - shopifyUrl <br />

## Setup and Run Backend

To run the backend locally:

```
cd /path/to/alloy/backend

# Create and copy example .env
cp example.env .env

# Install packages
npm i

# Run backend
npm run dev
```

## Setup and Run Frontend

To run a local server use the command

```
cd /path/to/alloy/frontend

# Install packages
npm i

# Run backend
npm run start
```

### TESTS

- TODO

### TODO

- Dockerize
- ....
