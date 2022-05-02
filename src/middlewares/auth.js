const expressJWT = require('express-jwt');
const secret = require('../config/secret');

module.exports = expressJWT.expressjwt({
    secret: secret.key,
    algorithms: ["HS256"]
});

