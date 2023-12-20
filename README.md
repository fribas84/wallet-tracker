
# Wallet Tracker

This is a test project, that allows user to track their favorites Ethereum Wallets balances and update the exchange rate to USD and EUR.
This project is uses 2 seperated applicaitons, a Web Application developt with Next.JS and a Server Application made with Nest.JS

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

### User Register
When a user signups an email conformation is sent to the users email address. He can only access the application once the user confirms.

### Pasword Recovery
Same as, user Register, when to recover a password, an email is sent to the user to trigger the password recover process.

### Add Wallets to track
The user can add any Ethereum valid address and monitor the balance, it can select the fiat currency, or display units wei/Ethereum

### Rates
The exchange rates are valid for five minutes, the user can update them and this will be stores in the database, but they will only be valid for a certain period of time. 

### User Authentication
For the User Authentication, the backend uses PassportJS to create JWT authentication. In order to get a valid token:
- The user must log in with User / password
    - an Access Token is return
- This Access Token must be sent as a Authentication Bearer Token Header to access the platform

## Deployment

Currently the applications are deployed in Railway and are fully functional:

- [Front End](https://nextjs-web-production.up.railway.app/)
- [Back End](https://nest-js-server-production.up.railway.app/)

*Disclaimer: Due to this is a development phase, and entities are not fully finished, Nest JS is using the syncronize feature for the entities.*

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

![Swagger](https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png)

![RestAPI](https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png)
![TailwindCSS](https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png)
![React](https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png)
![NestJS](https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574)
![NextJS](https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704)
![MongoDB](https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png)