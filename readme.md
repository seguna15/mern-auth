# This is a skeleton for react authentication using JWT and Oauth

***
 This app can be used as an auth skeleton for anyone building a fullstack MERN App. The authentication is based on using access token and refresh token for authenticating request. Upon login in with the right credential or using Oauth. HTTP Only Refresh token cookie is created. This refresh token will be used to generate short-live access token for validating request on protected routes on the Backend API
 ***

## If you git clone this app you need to perform the following steps

### Backend Node JS

1. To install backend dependencies

``` bash
cd backend && npm install
```

2. Create a .env file using .env.example as a template
3. Setup a Mongo DB Cluster [How to create a mongodb atlas database](https://www.mongodb.com/basics/create-database)
4. Create other .env variables
5. To run in development mode

``` bash
npm run dev
```

### Frontend React + vite

1. To install dependencies

``` bash
cd frontend && npm install
```

2. Set up firebase app. [How to set up a firebase app](https://firebase.google.com/docs/web/setup)


### Routes

1. [Home Route](http://localhost:5173)
2. [About Route](http://localhost:5173/about)
3. [Profile Route](http://localhost:5173/profile)
4. [Sign Up Route](http://localhost:5173/sign-up)
5. [Sign In Route](http://localhost:5173/sign-in)
