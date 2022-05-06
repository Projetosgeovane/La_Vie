const { Paciente, Psicologos, Atendimentos } = require('../model/')
const sequelize = require('sequelize')

const dashboardController = {

    async buscarNumeroPacientes(req, res) {
        const numeroPacientes = await Paciente.count()
        return res.json(numeroPacientes);
    },

    async buscarNumeroPsicologos(req, res) {
        const numeroPsicologos = await Psicologos.count();
        return res.json(numeroPsicologos);
    },
    async buscarNumeroAtendimentos(req, res) {
        const numeroAtendimentos = await Atendimentos.count();
        return res.json(numeroAtendimentos);
    },
    async buscarMediaAtendimentos(req, res) {
        const numeroAtendimentos = await Atendimentos.count();
        const numeroPsicologos = await Psicologos.count();

        return res.json(numeroAtendimentos/numeroPsicologos);
    }
}

module.exports = dashboardController