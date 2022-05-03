const express = require('express');
const atendimentoController = require('../controller/atendimentoController');
const pacienteController = require('../controller/pacienteController');
const psicologosController = require('../controller/psicologosController');
const authController = require('../controller/authController');
const auth = require('../middlewares/auth');
const pacienteCadastroValidation = require('../validations/paciente/cadastroPaciente');
const psicologoCadastroValidation = require('../validations/psicologo/cadastroPsicologo');
const authLoginValidation = require('../validations/auth/login');

const routes = express.Router();

routes.get('/pacientes', auth, pacienteController.buscarPacientes);
routes.get('/pacientes/:id',auth, pacienteController.buscarPacienteId);
routes.post('/pacientes', auth, pacienteCadastroValidation, pacienteController.cadastrarPaciente);
routes.put('/pacientes/:id', auth, pacienteController.atualizarPaciente);
routes.delete('/pacientes/:id', auth, pacienteController.deletarPaciente);

routes.get('/psicologos', psicologosController.buscarPsicologos);
routes.get('/psicologos/:id', psicologosController.buscarPsicologoId);
routes.post('/psicologos', psicologoCadastroValidation, psicologosController.cadastrarPsicologo);
routes.put('/psicologos/:id', psicologoCadastroValidation, psicologosController.atualizarPsicologo);
routes.delete('/psicologos/:id', psicologosController.deletarPsicologo);

routes.get('/atendimentos', atendimentoController.buscarAtendimento);
routes.get('/atendimentos/:id', atendimentoController.buscarAtendimentoId);
routes.post('/atendimentos',auth, atendimentoController.cadastrarAtendimento);
routes.delete('/atendimentos/:id', atendimentoController.deletarAtendimento);

routes.post('/login', authLoginValidation, authController.login)


module.exports = routes;