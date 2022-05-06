const { Paciente, Psicologos, PacientePsicologos } = require('../model/');
const { Op } = require('sequelize');


const pacienteController = {

    async paginacaoBuscarPacientes(req, res) {
        try {
            const { termo, page = 1, limit = 10 } = req.query;
            const offset = parseInt(limit) * (parseInt(page) - 1);

            const filter = {
                limit: parseInt(limit),
                offset,
                include: [
                    {
                        model: Psicologos,
                        attributes: ['id', 'nome', 'email', 'apresentacao'],
                    },
                ],

            };

            if (termo) {
                Object.assign(filter, {
                    where: {
                        nome: { [Op.substring]: termo }
                    },
                })
            }

            const paginacaoPacientes = await Paciente.findAll(filter)
            return res.status(200).json(paginacaoPacientes);
        } catch (error) {
            return res.status(400).json('Falha ao buscar lista de pacientes');
        }
    },

    async buscarPacienteId(req, res) {
        try {
            const { id } = req.params;
            const pacienteId = await Paciente.findByPk(id, {
                include: {
                    model: Psicologos,
                    attributes: ['id', 'nome', 'email', 'apresentacao'],
                },
            });

            if (pacienteId == null) {
                return res.status(404).json('Id não encontrado');
            }

            res.status(200).json(pacienteId);
        } catch (error) {
            return res.status(404).json('Id não encontrado');
        }
    },


    async cadastrarPaciente(req, res) {
        try {
            const { nome, email, idade } = req.body;
            const novoPaciente = await Paciente.create({
                nome,
                email,
                idade
            });


            const psicologos = await Psicologos.findByPk(req.auth.id);
            await novoPaciente.setPsicologos(psicologos);


            return res.status(201).json(novoPaciente);



        } catch (error) {
            return res.status(400).json('Falha ao cadastrar paciente');
        }
    },

    async atualizarPaciente(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, idade } = req.body;

            await Paciente.update({
                nome,
                email,
                idade
            },
                {
                    where: {
                        id
                    }
                }
            );

            const atualizarPaciente = await Paciente.findByPk(id);
            if (atualizarPaciente == null) {
                return res.status(404).json('Id não encontrado');
            }
            return res.status(200).json(atualizarPaciente);
        } catch (error) {
            return res.status(400).json('Falha ao atualizar paciente');
        }
    },

    async deletarPaciente(req, res) {
        try {
            const { id } = req.params;
            const pacienteId = await Paciente.findByPk(id);

            if (pacienteId == null) {
                return res.status(404).json('Id não encontrado');
            };

            await Paciente.destroy({
                where: {
                    id,
                }
            });

            return res.status(204).json();
        } catch (error) {
            return res.status(404).json('id não encontrado');
        }
    }

}



module.exports = pacienteController;