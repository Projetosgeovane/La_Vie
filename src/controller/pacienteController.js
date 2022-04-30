const Paciente = require('../model/Paciente');


const pacienteController = {

    async buscarPacientes(req, res) {
        try {
            const pacientes = await Paciente.findAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(404).json('Falha ao buscar lista de pacientes');
        }
    },

    async buscarPacienteId(req, res) {
        try {
            const { id } = req.params;
            if(!id) res.status(404).json('Id não encontrado')
            
            const paciente = await Paciente.findByPk(id)
            return res.status(200).json(paciente);
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

            // const psicologos = await Psicologos.findByPk(psicologos_id);
            // await novoPaciente.setPsicologos(psicologos)

            return res.status(201).json(novoPaciente)

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
            return res.json(atualizarPaciente);
        } catch (error) {
            return res.status(400).json('Falha ao atualizar paciente');
        }
    },

    async deletarPaciente(req, res) {
        try {
            const { id } = req.params;

            await Paciente.destroy({
                where: {
                    id,
                }
            });

            return res.status(204).json("Paciente Deletado");
        } catch (error) {
            return res.status(404).json('id não encontrado');
        }
    }

}

module.exports = pacienteController;