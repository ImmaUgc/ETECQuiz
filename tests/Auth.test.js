const { config } = require('dotenv');

config({ override: false });

describe('Sistema de autorização do back-end', () => {
    test('Sem header de autorização', async () => {
        const Request = await fetch('http://127.0.0.1:8080/user/current-user');
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.data)
        .toBe('Authorization is required');
    });

    test('Tipo inválido de autorização', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/current-user',
            {
                headers: {
                    Authorization: 'Bearer token'
                }
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.data)
        .toBe('Invalid authorization type: "Bearer"');
    });

    test('Token malformado', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/current-user',
            {
                headers: {
                    Authorization: 'Basic 2llOnNhZGaaaaaa'
                }
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.data)
        .toBe('Malformed token');
    });

    test('Token com Base64 inválido', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/current-user',
            {
                headers: {
                    Authorization: 'Basic 2llOnNhZG'
                }
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.data)
        .toBe('The string to be decoded is not correctly encoded.');
    });

    test('Token inválido (login incorreto)', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/current-user',
            {
                headers: {
                    Authorization: 'Basic b2llOnNhZGFzZA0K'
                }
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.data)
        .toBe('Invalid token');
    });

    test('Token válido (login válido)', async () => {
        const Token = btoa(process.env['TEST_USER']);
        const Request = await fetch(
            'http://127.0.0.1:8080/user/current-user',
            {
                headers: {
                    Authorization: `Basic ${Token}`
                }
            }
        );
        const Response = await Request.json();

        Response.data.senha = '';
        console.log(Response.data);

        expect(Response.status)
        .toBe(200);
    });
});