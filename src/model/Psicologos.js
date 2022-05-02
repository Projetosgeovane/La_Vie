const db = require('../database/la_vie');
const { DataTypes } = require('sequelize')

const Psicologos = db.define('Psicologos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        length: 45,
        notNull: true
    },
    email: {
        type: DataTypes.STRING,
        length: 45,
        notNull: true
    },
    senha: {
        type: DataTypes.STRING,
        length: 255,
        notNull: true
    },
    apresentacao: {
        type: DataTypes.INTEGER,
        length: 500,
        notNull: true
    }

},
    {
        tableName: 'psicologos',
        timestamps: false
        
    })

module.exports = Psicologos;