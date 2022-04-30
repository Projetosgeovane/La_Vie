const Psicologos = require('../model/Psicologos');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret')
const bcrypt = require('bcryptjs');

const authController = {
    async login(req, res) {
        const { email, senha } = req.body;

        const psicologo = await Psicologos.findOne({
            where: {
                email,
            },
        });

        if (!psicologo) {
            return res.status(401).json('E-mail ou senha inválido, verifique e tente novamente')
        }

        if (bcrypt.compareSync(senha, psicologo.senha)) {
            return res.status(401).json('Senha invalída');
        }


        const token = jwt.sign({
            id: psicologo.id,
            email: psicologo.email,
            nome: psicologo.nome,
        },
            secret.key
        );

        return res.json(token);
    }
}
module.exports = authController