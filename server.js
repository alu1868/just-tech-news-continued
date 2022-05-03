const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();

// require "express-handlebars" to set up template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set to use "express-handlebars"
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
