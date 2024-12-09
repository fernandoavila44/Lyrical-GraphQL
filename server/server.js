const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./schema/schema');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI = 'mongodb+srv://admin-fernando:hEGDN0WTTzMJ4Vqk@cluster0.23yhe.mongodb.net/lyrical?retryWrites=true&w=majority&appName=Cluster0';
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );

app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// Webpack middleware for development
app.use(webpackMiddleware(webpack(webpackConfig)));

// Fallback for React Router routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

module.exports = app;
