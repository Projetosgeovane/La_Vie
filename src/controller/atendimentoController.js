const Atendimentos = require('../model/Atendimentos');



const atendimentoController = {

    async buscarAtendimento(req, res) {
        try {
            const atendimentos = await Atendimentos.findAll();
            res.json(atendimentos);
        } catch (error) {
            console.error('Erro de busca');
        }
    },

    async buscarAtendimentoId(req, res) {
        try {
            const { id } = req.params;
            const atendimentos = await Atendimentos.findByPk(id)
            res.json(atendimentos);
        } catch (error) {
            console.error('Id não encontrado');
            res.status(404);
        }
    },

    async cadastrarAtendimento(req, res) {
        try {
            const { data_atendimento, observacao, paciente_id, psicologos_id} = req.body;
            const novoAtendimento = await Atendimentos.create({
                data_atendimento,
                observacao,
                paciente_id,
                psicologos_id,
                
            });

            // const psicologos = await Psicologos.findByPk(psicologos_id);
            // await novoPaciente.setPsicologos(psicologos)
            return res.status(201).json(novoAtendimento)

        } catch (error) {
            console.log('Falha ao cadastrar paciente');
            console.error(error);
            return res.status(400).json('Falha ao cadastrar paciente');
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