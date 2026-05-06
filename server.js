require('dotenv').config() ;
const app = require('./app');
const connectDB = require('./src/config/database');

await connectDB();

app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});