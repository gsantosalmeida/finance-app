//importar express
const express = require('express'); 
// inicia express
const app = express();
// configurar view e definir como EJS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
// pasta public como static
app.use(express.static(path.resolve(__dirname, 'public')));
// middlewares de parsing
//lê dados de formularios HTMl
app.use(express.urlencoded({extended: true}));
// lê dados de JSON
app.use(express.json());
// importar session
const session = require('express-session');
// configurar a session
const sessionOptions = session({
    secret: 'fdsjfiodsisass',
    resave: false,
    saveUninitialized: false,
});

const routes = require('./src/routes/authRoutes');

module.exports = app;