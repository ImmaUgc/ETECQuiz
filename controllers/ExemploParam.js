function ExemploParam(Request, Response) { /* http://127.0.0.1:8080/exemplo/parametro%20bacana */
    const Parametro = Request.params.parametro; /* Pega o parâmetro nomeado de "parametro" no URL */
    Response.send(`Recebido: ${Parametro}`);
}

module.exports = {
    main: ExemploParam,
    path: '/exemplo/:parametro', /* Parâmetros são definidos pelo préfixo ":", eles serão registrados no objeto Request.params (nesse caso: Request.params.parametro) */
    method: 'GET'
}