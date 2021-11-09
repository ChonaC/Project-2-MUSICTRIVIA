const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();
const sess = {
  secret: process.env.JAWSDB_SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
});
