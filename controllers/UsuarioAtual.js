function main(Request, Response) {
    Response.json(Request.authenticated);
}

module.exports = {
    main,
    path: '/user/current-user',
    method: 'GET',
    authenticated: true
}