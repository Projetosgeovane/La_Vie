const { Paciente, Psicologos, Atendimentos } = require('../model/')
const sequelize = require('sequelize')

const dashboardController = {

    async buscarNumeroPacientes(req, res) {
        const numeroPacientes = await Paciente.count()
        return res.json(`Numero de Pacientes = ${numeroPacientes}`);
    },

    async buscarNumeroPsicologos(req, res) {
        const numeroPsicologos = await Psicologos.count();
        return res.json(`Numero de Psicologos = ${numeroPsicologos}`);
    },
    async buscarNumeroAtendimentos(req, res) {
        const numeroAtendimentos = await Atendimentos.count();
        return res.json(`Numero de Atendimentos = ${numeroAtendimentos}`);
    },
    async buscarMediaAtendimentos(req, res) {
        const mediaAtendimentos = await Atendimentos.findAll({
            attributes: ['id', [Atendimentos.sequelize.fn('AVG', Atendimentos.sequelize.col('id')), 'ratingAvg']],
            group: ['id']
        });

        return res.json(`Numero de Atendimentos = ${mediaAtendimentos}`);
    }
}

module.exports = dashboardController