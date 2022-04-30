const express = require('express');
const cors = require("cors");
const routes = require('./routes');
const handleError = require('./middlewares/handleError');
const db = require('./database/la_vie');

const app = express();

db.hasConnection();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handleError);

app.listen(4000, () => console.log('Servidor rodando na porta 3000'));