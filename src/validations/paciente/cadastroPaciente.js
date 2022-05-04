const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email(),
        idade: Joi.date().required(),
        psicologos_id: Joi.number()

    })

});