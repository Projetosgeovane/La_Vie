const db = require('../database/la_vie');
const { DataTypes } = require('sequelize')
const Paciente = require('./Paciente');
const Psicologos = require('./Psicologos');

const PacientePsicologos = db.define('Paciente', {
    paciente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    psicologos_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Psicologos,
            key: 'id'
        }
    },


},
    {
        tableName: 'paciente_psicologos',
        timestamps: false

    })

module.exports = PacientePsicologos;