const Usuario = require("../models/Usuario");
const { CriarUsuario } = require("../utils/Database");

function main(Request, Response) {
    const body =  Request.body;

    CriarUsuario(new Usuario(
        0 /* O id não será necessário, afinal, estaremos postando um novo usuário. */,
        body.login,
        body.email,
        body.senha,
        0 /* Ao criar um usuário, a pontuação por padrão é 0 */
    ));

    Response.sendStatus(200);
}

module.exports = {
    main,
    path: '/user',
    method: 'POST',
    authenticated: false
}