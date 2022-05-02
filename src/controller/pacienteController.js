const { Paciente, Psicologos } = require('../model/');

const pacienteController = {



    // async buscarPacientes(req, res) {
    //     try {

    //         const pacientes = await Paciente.findAll({
    //             include: Psicologos,

    //         });

    //         return res.status(200).json(pacientes);
    //     } catch (error) {
    //         return res.status(404).json('Falha ao buscar lista de pacientes');
    //     }
    // },

    async paginacaoBuscarPacientes(req, res) {
        try {
            const { termo, page = 1 , limit = 10 } = req.query;
            const offSet = parseInt(limit) * (parseInt(page) - 1);

            let filter = {
                limit: parseInt(limit),
                offSet,
                include: Psicologos,


            }

            // if (termo) {
            //     Object.assign(filter, {
            //         where: {
            //             // person_name: { [Op.like]: `%${termo}%´ }  // Equivalente ao código da linha 11
            //             nome: { [Op.substring]: termo }
            //         },
            //     })
            // }




            const paginacaoPacientes = await Paciente.findAll(filter)
            return res.json(paginacaoPacientes);
        } catch (error) {

        }
    },

    async buscarPacienteId(req, res) {
        try {
            const { id } = req.params;
            const pacienteId = await Paciente.findByPk(id, {
                include: Psicologos,
            });
            if (pacienteId == null) {
                return res.status(404).json('Id não encontrado');
            }
            res.json(pacienteId);
        } catch (error) {
            return res.status(404).json('Id não encontrado');
        }
    },

    async buscarIdPsicologo(req, res) {
        const { id } = req.params
        const teste = await Psicologos.findAll();
        res.json(teste);
        console.log(id);

    },
    async cadastrarPaciente(req, res) {
        try {
            const { nome, email, idade, psicologos_id } = req.body;

            const novoPaciente = await Paciente.create({
                nome,
                email,
                idade,
                psicologos_id
            });
           
           
            const psicologos = await Psicologos.findByPk(psicologos_id);
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