const { ConsultarQuestoesPorDisciplina } = require("../utils/Database")

async function main(Request, Response) {
    const Params = Request.params;
    const id = Params.id;
    const questoes = await ConsultarQuestoesPorDisciplina(id);

    if(!questoes.length)
        Response
        .sendStatus(404);

    Response.json(questoes);
}

module.exports = {
    main,
    path: '/quiz/:id',
    method: 'GET',
    authenticated: false
}