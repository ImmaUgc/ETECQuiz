const Usuario = require("../models/Usuario");
const { ConsultarDisciplinas } = require("../utils/Database");

async function main(_Request, Response) {
    const disciplinas = await ConsultarDisciplinas();
    Response.json(disciplinas);
}

module.exports = {
    main,
    path: '/quiz/disciplinas',
    method: 'GET',
    authenticated: false
}