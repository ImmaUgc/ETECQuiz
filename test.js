(async () => {
    try {
        const response = await fetch('http://localhost:8080/user', { // Corrigido para /users
            method: 'POST', // O método deve ser em maiúsculas
            headers: {
                'Content-Type': 'application/json', // Adicionando o cabeçalho Content-Type
            },
            body: JSON.stringify({
                id: 0,
                login: 'teste',
                email: 'email@email.com',
                senha: 'password',
                pontuacao: 0
            })
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Use json() se você espera um JSON como resposta
        console.log(data); // Imprime a resposta em JSON
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
})();