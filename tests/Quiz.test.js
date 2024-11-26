const { config } = require('dotenv');

config({ override: false });

const Token = btoa(process.env['TEST_USER']);
describe('Sistema quiz', () => {
    test('Contabilizar ponto (Alternativas corretas)', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/count',
            {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alternativas: [
                        31,
                        36
                    ]
                })
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.status)
        .toBe(200);
    });

    test('Contabilizar ponto (Alternativas incorretas)', async () => {
        const Request = await fetch(
            'http://127.0.0.1:8080/user/count',
            {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alternativas: [
                        30,
                        35
                    ]
                })
            }
        );
        const Response = await Request.json();

        console.log(Response.data);

        expect(Response.status)
        .toBe(200);
    });
});