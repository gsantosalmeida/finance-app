// se refere às variáveis de ambientes (senhas, senha do banco de dados...)
require('dotenv').config(); 
const express = require('express'); 
// inicia express
const app = express();

const mongoose = require('mongoose'); 
// ele irá modelar a nossa base de dados
mongoose.connect(process.env.CONNECTION)
    .then(()=>{
        console.log('Conectei à base de dados');
        app.emit('pronto');
    })
    .catch(e => {console.log(e)});

//ira mandar cookies
const session = require('express-session');
//salva as sessoes na base de dados 
const MongoStore = require('connect-mongo'); 
// manda mensagens rapidas
const flash = require('connect-flash'); 

//rotas da nossa aplicação (paginas)
const routes = require('./routes'); 
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
// middlewares são funções que são executadas no meio do caminho entre rotas
const {middlewareGlobal, checkCSRFERROR, crsfMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'fdsjfiodsisass',
    store: MongoStore.MongoStore.create({mongoUrl: process.env.CONNECTION}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(checkCSRFERROR);
app.use(crsfMiddleware);
//nossos próprios middlewares
app.use(middlewareGlobal);
app.use(routes);

app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});