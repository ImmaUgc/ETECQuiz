const Path = require('node:path');

function main(_Request, Response) {
    Response.view('Document');
}

module.exports = {
    main,
    path: '/',
    method: 'GET',
    authenticated: false
}