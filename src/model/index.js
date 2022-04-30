const Paciente = require('./Paciente');
const Psicologos = require('./Psicologos');
const Atendimentos = require('./Atendimentos');
const PacientePsicologos = require('./PacientePsicologos');

Paciente.belongsTo(Atendimentos, {
    foreignKey: 'paciente_id',
});

Psicologos.belongsTo(Atendimentos, {
    foreignKey: 'psicologos_id',
});

Paciente.belongsToMany(Psicologos, {
    foreignKey: 'paciente_id',
    through: PacientePsicologos,
});
Psicologos.belongsToMany(Paciente, {
    foreignKey: 'psicologos_id',
    through: PacientePsicologos,
});



module.exports = {
    Paciente,
    Psicologos,
    Atendimentos,
    PacientePsicologos
}