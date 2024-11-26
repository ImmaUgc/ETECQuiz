const Usuario = require("../models/Usuario");
const { CriarUsuario } = require("../utils/Database");

async function main(Request, Response) {
    const body =  Request.body;

    const result = await CriarUsuario(new Usuario(
        0 /* O id não será necessário, afinal, estaremos postando um novo usuário. */,
        body.login,
        body.email,
        body.senha,
        0 /* Ao criar um usuário, a pontuação por padrão é 0 */
    ));

    if(!result) {
        Response.send('Usuário cadastrado com sucesso!');
    } else {
        Response.status(409).send(result);
    }
}

module.exports = {
    main,
    path: '/user',
    method: 'POST',
    authenticated: false
}