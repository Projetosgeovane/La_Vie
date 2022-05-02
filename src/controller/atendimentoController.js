const { Atendimentos, Paciente, Psicologos } = require('../model/');



const atendimentoController = {

    async buscarAtendimento(req, res) {
        try {
            const atendimentos = await Atendimentos.findAll({
                include: [Paciente, Psicologos]
                
            });
            res.json(atendimentos);
        } catch (error) {
            console.error('Erro de busca');
        }
    },

    async buscarAtendimentoId(req, res) {
        try {
            const { id } = req.params;
            const atendimentos = await Atendimentos.findByPk(id,{
                include: [Paciente, Psicologos]
            });
            if (atendimentos == null) {
                return res.status(404).json('Id não encontrado');
            }
            res.json(atendimentos);
        } catch (error) {
            console.error('Id não encontrado');
            res.status(404);
        }
    },

    async cadastrarAtendimento(req, res) {
        try {
            const { data_atendimento, observacao, paciente_id, psicologos_id } = req.body;
            const novoAtendimento = await Atendimentos.create({
                data_atendimento,
                observacao,
                paciente_id,
                psicologos_id,

            });

            
            return res.status(201).json(novoAtendimento)

        } catch (error) {
            return res.status(400).json('Falha ao cadastrar atendimento');
        }
    },


    async deletarAtendimento(req, res) {
        try {
            const { id } = req.params;

            await Atendimentos.destroy({
                where: {
                    id,
                }
            });

            res.status(204).json("Atendimento Deletado");
        } catch (error) {

        }
    }

}

module.exports = atendimentoController;