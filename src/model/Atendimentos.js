const db = require('../database/la_vie');
const { DataTypes } = require('sequelize');
const Paciente = require('./Paciente');
const Psicologos = require('./Psicologos');

const Atendimentos = db.define('Atendimentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    data_atendimento: {
        type: DataTypes.DATE,
        notNull: true
    },
    observacao: {
        type: DataTypes.STRING,
        length: 45,
        notNull: true
    },
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
        tableName: 'atendimentos',
        timestamps: false

    })

module.exports = Atendimentos;