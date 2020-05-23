# Stacktelo

Stacktelo is a complete stack to create your favourite web applications!

## Prerequisites

- [Node](https://nodejs.org/)
- [Mongo](https://docs.mongodb.com/manual/administration/install-community/)

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install Stacktelo.

```bash
yarn
cd ./client && yarn
```

## Configuration

Create a `.env` file in the root folder and add the following environment variables:

- `JWT_SECRET`
- `MONGODB_URI`
- `PORT=5000`

## Running

Make sure you are in the root folder and run:

```bash
yarn dev
```

Go to http://localhost:3000/

## Built With

### Backend

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Agenda](https://github.com/agenda/agenda)

### Frontend

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Formik](https://github.com/jaredpalmer/formik)
- [i18next](https://react.i18next.com/)

## Deploy to Heroku

Just [connect your GitHub repository](https://devcenter.heroku.com/articles/github-integration) and add the following environment variables to Heroku:

- `JWT_SECRET`
- `MONGODB_URI`

## Configure ESLint

- TBD

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
