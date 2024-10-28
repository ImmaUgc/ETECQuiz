function ExemploParam(_Request, Response) {
    Response.send('Leia o README.md!');
}

module.exports = {
    main: ExemploParam,
    path: '/',
    method: 'GET'
}