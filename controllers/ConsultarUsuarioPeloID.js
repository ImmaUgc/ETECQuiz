const Usuario = require("../models/Usuario");
const { ConsultarUsuarioPeloID } = require("../utils/Database");

async function ConsultarUsuario(Request, Response) {
    const params =  Request.params;
    const id = parseInt(params.id);

    if(isNaN(id)) return Response.sendStatus(400); /* Bad request */

    let usuario = await ConsultarUsuarioPeloID(id);

    if(!usuario) return Response.sendStatus(404); /* User not found */

    Response.json(usuario); /* Ok */
}

module.exports = {
    main: ConsultarUsuario,
    path: '/user/:id',
    method: 'GET'
}