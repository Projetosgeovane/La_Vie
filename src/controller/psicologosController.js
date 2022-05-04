const bcryptjs = require('bcryptjs');
const { Psicologos, Paciente } = require('../model/');
const { Op } = require('sequelize');

const psicologosController = {

    async paginacaoBuscarPsicologos(req, res) {
        try {
            const { termo, page = 1, limit = 99999999999999999 } = req.query;
            const offset = parseInt(limit) * (parseInt(page) - 1);

            const filter = {
                limit: parseInt(limit),
                offset,
                include: Paciente,
                attributes: ['id','nome','email','apresentacao']
                    
                
            };

            if (termo) {
                Object.assign(filter, {
                    where: {
                        nome: { [Op.substring]: termo }
                    },
                })
            }

            const paginacaoPsicologos = await Psicologos.findAll(filter)
            return res.status(200).json(paginacaoPsicologos);
        } catch (error) {
            return res.status(400).json('Falha ao buscar lista de psicólogos');
        }
    },

    async buscarPsicologoId(req, res) {
        try {
            const { id } = req.params;
            const psicologoId = await Psicologos.findByPk(id, {
                include: Paciente,
                attributes: ['id', 'nome', 'email', 'apresentacao']
            });
            if (psicologoId == null) {
                return res.status(404).json('Id não encontrado');
            }
            res.json(psicologoId);
        } catch (error) {
            return res.status(400).json('Id não encontrado');
        }
    },

    async cadastrarPsicologo(req, res) {
        try {
            const { nome, email, senha, apresentacao } = req.body;
            const novaSenha = bcryptjs.hashSync(senha, 10);
            const novoPsicologo = await Psicologos.create({
                nome,
                email,
                senha: novaSenha,
                apresentacao
            });

            return res.status(201).json(novoPsicologo);
        } catch (error) {
            return res.status(400).json('Falha ao cadastrar psicólogo');
        }
    },

    async atualizarPsicologo(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, apresentacao } = req.body;
            await Psicologos.update({
                nome,
                email,
                senha,
                apresentacao
            }, {
                where: {
                    id,
                }
            }
            );
            const psicologoAtualizado = await Psicologos.findByPk(id);
            if (psicologoAtualizado == null) {
                res.status(404).json('Id não encontrado');
            }
            res.status(201).json(psicologoAtualizado);

        } catch (error) {
            return res.status(400).json('Falha ao atualizar psicólogo');
        }
    },

    async deletarPsicologo(req, res) {
        try {
            const { id } = req.params;
            const psicologoId = await Psicologos.findByPk(id);

            if (psicologoId == null) {
                return res.status(404).json('Id não encontrado');
            }

            await Psicologos.destroy({
                where: {
                    id,
                }
            });
            return res.status(204);
        } catch (error) {
            return res.status(400);
        }
    }




}

module.exports = psicologosController;