const db = require('../database/la_vie');
const { DataTypes } = require('sequelize')

const Paciente = db.define('Paciente', {
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
    idade: {
        type: DataTypes.DATE,
        notNull: true
    }

},
    {
        tableName: 'paciente',
        timestamps: false
        
    })

module.exports = Paciente;