const bcryptjs = require('bcryptjs');
const { Psicologos, Paciente } = require('../model/');

const psicologosController = {
    async buscarPsicologos(req, res) {
        try {
            const psicologos = await Psicologos.findAll({
                include: Paciente,
                attributes: ['nome', 'email', 'apresentacao']
            });
            res.status(200).json(psicologos);
        } catch (error) {
            return res.status(404).json('Falha ao buscar lista de psicologos');
        }
    },

    async buscarPsicologoId(req, res) {
        try {
            const { id } = req.params;
            const psicologoId = await Psicologos.findByPk(id, {
                include: Paciente,
                attributes: ['nome', 'email', 'apresentacao']
            });
            if (psicologoId == null) {
                return res.status(404).json('Id não encontrado');
            }
            res.json(psicologoId);
        } catch (error) {
            return res.status(404).json('Id não encontrado');
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
            return res.status(400).json('Falha ao cadastrar psicologo');
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

        }
    },

    async deletarPsicologo(req, res) {
        try {
            const { id } = req.params;
            await Psicologos.destroy({
                where: {
                    id,
                }
            });
            res.json("Psicologo Deletado com sucesso");
        } catch (error) {

        }
    }




}

module.exports = psicologosController;