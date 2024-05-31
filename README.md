<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Gamification-Auth is a robust and secure authentication service designed to manage access to applications implementing gamification strategies. This service is developed using Node.js and NestJS, following a hexagonal architecture to ensure separation of concerns and facilitate scalability and maintainability.

## Features
- User Registration: Allows administrators to register new users.

- User Login: Enables users to log in using valid credentials.

- User Logout: Provides functionality for users to log out securely.

- Role-Based Access Control: Ensures that only users with the appropriate roles can access specific resources.

- Account Activation: Validates that user accounts are active before allowing login.

- Token Management: Manages JWT tokens for authentication, including token generation and invalidation.


# Installation

## 1. Clone this repository
```bash
# HTTP
$ git clone https://github.com/Riwi-io-Medellin/Gamification-Auth.git

# SSH
$ git clone git@github.com:Riwi-io-Medellin/Gamification-Auth.git
```

## 2. Install dependencies
```bash
$ npm install
# or
$ npm i
```

## 3. Set environment variables
```bash
# PORT
PORT =

# PERSISTENCE
DB_CONNECTION = mongodb://
DB_HOST_LOCAL = localhost:27017
DB_HOST_PRODUCTION =
DB_NAME =
DB_USERNAME =
DB_PASSWORD =
ENVIRONMENT =

#STRATEGY KEY
JWT_SECRET = # YOUR JWT_SECRET
ACCESS_TOKEN_EXPIRY = # TOKEN EXPIRATION TIME

# EXAMPLE STRING CONNECTION
mongodb+srv://<DB_USERNAME>:<DB_PASSWORD><DB_HOST_PRODUCTION>/<DB_NAME>
```

## Generate JWT_SECRET secure in your CMD
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Endpoints
```bash

# Prefix
/api/v1/auth

# Register | Protected
@Post("register")

# Login
@Post("login")

# logout | Protected
@Post("logout")
```

# Swagger
``` bash
http://localhost:{PORT}/api-doc
```

# Postman collection

[Auth Postman](RIWI-COINS.postman_collection.json)


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
