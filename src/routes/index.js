const express = require('express');
const atendimentoController = require('../controller/atendimentoController');
const pacienteController = require('../controller/pacienteController');
const psicologosController = require('../controller/psicologosController');
const authController = require('../controller/authController');
const auth = require('../middlewares/auth');
const pacienteCadastroValidation = require('../validations/paciente/cadastroPaciente');
const psicologoCadastroValidation = require('../validations/psicologo/cadastroPsicologo');
const authLoginValidation = require('../validations/auth/login');
const dashboardController = require('../controller/dashboardController');

const routes = express.Router();

routes.get('/pacientes', auth, pacienteController.paginacaoBuscarPacientes);
routes.get('/pacientes/:id', auth, pacienteController.buscarPacienteId);
routes.post('/pacientes', auth, pacienteCadastroValidation, pacienteController.cadastrarPaciente);
routes.put('/pacientes/:id', auth, pacienteController.atualizarPaciente);
routes.delete('/pacientes/:id', auth, pacienteController.deletarPaciente);

routes.get('/psicologos', auth,psicologosController.paginacaoBuscarPsicologos);
routes.get('/psicologos/:id', auth,psicologosController.buscarPsicologoId);
routes.post('/psicologos', psicologoCadastroValidation, psicologosController.cadastrarPsicologo);
routes.put('/psicologos/:id', auth,psicologoCadastroValidation, psicologosController.atualizarPsicologo);
routes.delete('/psicologos/:id',auth, psicologosController.deletarPsicologo);

routes.get('/atendimentos',auth, atendimentoController.paginacaoBuscarAtendimentos);
routes.get('/atendimentos/:id',auth, atendimentoController.buscarAtendimentoId);
routes.post('/atendimentos', auth, atendimentoController.cadastrarAtendimento);
routes.delete('/atendimentos/:id',auth, atendimentoController.deletarAtendimento);

routes.get('/dashboard/numero-pacientes',dashboardController.buscarNumeroPacientes);
routes.get('/dashboard/numero-psicologos', dashboardController.buscarNumeroPsicologos);
routes.get('/dashboard/numero-atendimentos', dashboardController.buscarNumeroAtendimentos);
routes.get('/dashboard/media-atendimentos', dashboardController.buscarMediaAtendimentos);

routes.post('/login', authLoginValidation, authController.login)



module.exports = routes;