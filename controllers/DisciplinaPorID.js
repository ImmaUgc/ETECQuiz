const Usuario = require("../models/Usuario");
const { ConsultarDisciplinas } = require("../utils/Database");

async function main(Request, Response) {
    const Params = Request.params;
    const id = Params.id_disciplina;
    const disciplina = (await ConsultarDisciplinas()).find(disciplina => disciplina.id == id);
    if(!disciplina) Response.sendStatus(404);
    Response.json(disciplina);
}

module.exports = {
    main,
    path: '/quiz/disciplina/:id_disciplina',
    method: 'GET',
    authenticated: false
}