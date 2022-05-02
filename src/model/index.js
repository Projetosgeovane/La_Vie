const Paciente = require('./Paciente');
const Psicologos = require('./Psicologos');
const Atendimentos = require('./Atendimentos');
const PacientePsicologos = require('./PacientePsicologos');

Atendimentos.belongsTo(Paciente, {
    foreignKey: 'paciente_id',
});
Paciente.hasMany(Atendimentos, {
    foreignKey: 'paciente_id',
});

Atendimentos.belongsTo(Psicologos, {
    foreignKey: 'psicologos_id',
});

Psicologos.hasMany(Atendimentos, {
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