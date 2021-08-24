# Alloy Take Home Challenge Backend

## Proposed Solution

### Stack

- NodeJS
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

**ACCOUNT URLS**

- GET `/account` [AUTH REQUIRED] <br />
  A route that serve account back to the client: <br />

  ```
  // Account
  {
    email: "some@email.com",
    isSlackAuthenticated: true | false,
    isShopifyAuthenticated: true | false,
  }
  ```

**AUTH URLS**

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

**SHOPIFY URLS**

- get `/shopify/url` [AUTH REQUIRED] <br />
  A route to serve that serve the url for client to redirect: <br />

  ```
  // Shopify url
  {
    "url": some.myshopify.com/admin/url
  }
  ```

- POST `/shopify/webhook` <br />
  A route to handle order event subscription that when order is more 100 or more sends slack notification: <br />

  - [HEADER] x-shopify-shop-domain <br />

  ```
  // Shopify webhook response
  {
    "subtotal_price": 120.0
  }
  ```

  - POST `/shopify/oauth_redirect` <br />
    A route to handle oauth shopify redirect allow to attach shopify credenciales o account: <br />

    Query params

    - shop
    - code
    - state <br />

    ```
    Redirects back to client
    ```

**SLACK URLS**

- get `/slack/url` [AUTH REQUIRED] <br />
  A route to serve that serve the url for client to redirect: <br />

  ```
  // Slack url
  {
    "url": some.slack.com/admin/url
  }
  ```

- POST `/slack/oauth_redirect` <br />
  A route to handle oauth shopify redirect allow to attach shopify credenciales o account: <br />

  Query params

  - code <br />

  ```
  Redirects back to client
  ```

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

## Test in "production"

BACKEND URL: https://alloy-take-home-backend.herokuapp.com

### TESTS

- TODO

### TODO

- Dockerize
- Better authentication. Maybe have a refresh token and access token
- Shopify better verification with state and hmac [https://shopify.dev/apps/auth/oauth#how-the-installation-flow-works]
- Tests
