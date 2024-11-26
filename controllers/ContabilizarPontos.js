const { ContabilizarPontos } = require("../utils/Database");

async function main(Request, Response) {
    const Body = Request.body;
    
    if(!Body) Response.sendStatus(400);

    const alternativas = Body['alternativas'];
    if(!alternativas) Response.sendStatus(400);

    const pontuacao = await ContabilizarPontos(Request.authenticated.id, alternativas);
    Request.authenticated.pontuacao = pontuacao;

    Response.json(Request.authenticated);
}

module.exports = {
    main,
    path: '/user/count',
    method: 'PUT',
    authenticated: true
}