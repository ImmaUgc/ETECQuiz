const { config } = require('dotenv');
config({ override: false });

const Token = btoa(process.env['TEST_USER']);

async function a() {
    const Request = await fetch(
        'http://127.0.0.1:8080/user',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: 'teste2',
                email: 'teste2@teste.com',
                senha: 'blablabla'
            })
        }
    );
    const Response = await Request.json();

    console.log(Response);
}

a();