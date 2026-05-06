const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.CONNECTION)
        .then(() => {
            console.log('Conectei à base de dados');
            app.emit('pronto');
        })
        .catch(e => { 
            console.log(e);
            process.exit(1) 
        });
}

module.exports = connectDB;