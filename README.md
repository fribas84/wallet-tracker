
# Wallet Tracker

This test project allows users to track their favorite Ethereum Wallets balances and update the exchange rate to USD and EUR.
This project uses 2 separate applications, a Web Application developed with Next.JS and a Server Application made with Nest.JS

This mono repo uses a [PNPM Workspace](https://pnpm.io/workspaces). The folder structure:

- Root
    - apps:
        -  web: Next.js Application
        -  server: Nest.js Backend 

## NestJS Modules
![NestJS Module](https://github.com/fribas84/wallet-tracker/blob/main/desing/backend-NestJsmodules.png)

## NextJs pages
![Nesxt pages](https://github.com/fribas84/wallet-tracker/blob/main/desing/backend-UI.png)
## Features
![home](https://github.com/fribas84/wallet-tracker/blob/main/desing/home.jpeg)
### User Register
When a user signups an email confirmation is sent to the user's email address. He can only access the application once the user confirms.
![register](https://github.com/fribas84/wallet-tracker/blob/main/desing/signup.jpeg)
![confirmationEmail](https://github.com/fribas84/wallet-tracker/blob/main/desing/confirmationEmail.jpeg)
### Password Recovery
Same as, the user Register, when to recover a password, an email is sent to the user to trigger the password recovery process.

### Add Wallets to track
The user can add any Ethereum valid address and monitor the balance, it can select the fiat currency, or display units wei/Ethereum
![newWallet](https://github.com/fribas84/wallet-tracker/blob/main/desing/newWalletModal.jpeg)
![walletList](https://github.com/fribas84/wallet-tracker/blob/main/desing/walletList.jpeg)
### Rates
The exchange rates are valid for five minutes; the user can update them, which will be stored in the database, but they will only be valid for a certain period. 
![walletDetail](https://github.com/fribas84/wallet-tracker/blob/main/desing/walletDetailModal.jpeg)
### User Authentication
For the User Authentication, the backend uses PassportJS to create JWT authentication. To get a valid token:
- The user must log in with the User/password
    - an Access Token is the return
- This Access Token must be sent as an Authentication Bearer Token Header to access the platform

## Deployment

Currently, the applications are deployed in Railway and are fully functional:

- [Front End](https://nextjs-web-production.up.railway.app/)
- [Back End](https://nest-js-server-production.up.railway.app/)

*Disclaimer: Due to this development phase, and entities not being fully finished, Nest JS is using the synchronize feature for the entities.*

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the different root applications folder:

### Web Application
```
NEXT_PUBLIC_BACKEND_API= <Back end API>
```

### Server Application

The server uses the following ENV variables:

```
ETHERSCAN_API_KEY= <Etherscan API Kwy>
JWT_SECRET= <JWT Secret>
PORT= <Local port>
EMAILJS_PUBLIC_KEY= <Email JS User ID>
EMAILJS_PRIVATE_KEY= <Email JS private Key>
EMAILJS_CONFIRM_TEMPLATE_ID= <Email JS User confirmation email template Id>
EMAILJS_RESET_TEMPLATE_ID= <Email JS password reset email template Id>
EMAILJS_SERVICE_ID= <Email JS service ID >
FRONTEND_URL= <URL of the Front End>
MONGO_URL= <Mongo DB connection String>
```



## Run Locally

Clone the project

```bash
  git clone https://github.com/fribas84/wallet-tracker
```

Go to the project directory

```bash
  cd wallet-tracker
```

Install dependencies

```bash
  pnpm install
```

Copy .env.example files to .env and complete with your enviroment variables

```bash

cd apps
cd server
cp .env.example .env
cd ..
cd web
cp .env.example .env
```

### Run Web App and Server
To run the application you can run them in the same terminal (parallel) or independentlly.

Start the applications in parallel mode

```bash
    pnpm run --parallel dev
```

#### Run Web application 

Go to the apps/web folder:
```bash
    cd apps/web
````

Start Next.js application:

```bash
    pnpm run dev
````

#### Run Nest.Js Server


Go to the apps/server folder:
```bash
    cd apps/server
````

Start Nest.js application:

```bash
    pnpm run start:watch
```




## Roadmap


- Build Unit Tests
- Build Integration Tests


## Running Tests

TODO


## API Reference

The API Documentation is available in this [Swagger](https://nest-js-server-production.up.railway.app/api/).

# Stack

The stack used in this project:
- Nest.Js
- Next.Js
- Tailwind CSS
- Mongo DB
- TypeOrm
- Node.Js
-Passport.js

![stack](https://github.com/fribas84/wallet-tracker/blob/main/desing/backend-Libraries.png)
