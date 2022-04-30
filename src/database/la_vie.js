const Sequelize = require('sequelize');
const db = new Sequelize('la_vie', 'root', '12345678', {
    host: "localhost",
    dialect: "mysql",
});

async function hasConnection() {
    try {
        await db.authenticate();
        console.log('Banco de dados conectado');
    } catch (error) {
        console.error('Falha ao conectar banco de dados');
    }

}

Object.assign(db, {
    hasConnection
});

module.exports = db;