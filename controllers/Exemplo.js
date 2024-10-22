/* Leia o README.md para um entendimento maior */

function Exemplo(_Request, Response) {
    Response.send('Exemplo!');
}

module.exports = {
    main: Exemplo, /* Função que será chamada ao acessarem a URL */
    path: '/exemplo', /* Caminho da URL (http://127.0.0.1:8080/exemplo) */
    method: 'get' /* Método da request */
}