const { Atendimentos, Paciente, Psicologos } = require('../model/');
const { Op } = require('sequelize');



const atendimentoController = {

    async paginacaoBuscarAtendimentos(req, res) {
        try {
            const { termo, page = 1, limit = 10 } = req.query;
            const offset = parseInt(limit) * (parseInt(page) - 1);

            const filter = {
                limit: parseInt(limit),
                offset,
                include: [{
                    model: Psicologos,
                    attributes: ['id', 'nome', 'email', 'apresentacao']
                },
            {
                model: Paciente
            }]
            };

            if (termo) {
                Object.assign(filter, {
                    where: {
                        data_atendimento: { [Op.substring]: termo }
                    },
                })
            }

            const paginacaoAtendimentos = await Atendimentos.findAll(filter)
            return res.status(200).json(paginacaoAtendimentos);
        } catch (error) {
            return res.status(500).json('Falha ao buscar lista de atendimentos');
        }
    },

    async buscarAtendimentoId(req, res) {
        try {
            const { id } = req.params;
            const atendimentos = await Atendimentos.findByPk(id, {
                include: [Paciente, Psicologos]
            });
            if (atendimentos == null) {
                return res.status(404).json('Id não encontrado');
            }
            res.json(atendimentos);
        } catch (error) {
            return res.status(404).json('Id não encontrado');
        }
    },

    async cadastrarAtendimento(req, res) {
        try {
            const { data_atendimento, observacao, paciente_id } = req.body;
            const novoAtendimento = await Atendimentos.create({
                data_atendimento,
                observacao,
                paciente_id,
                psicologos_id: req.auth.id,

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

            return res.status(204)
        } catch (error) {

        }
    }

}

module.exports = atendimentoController;