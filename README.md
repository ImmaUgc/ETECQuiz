# Inicializar o servidor

Caso você queira iniciar o servidor, execute em seu `terminal` o seguinte comando: `npm install` e espere instalar as dependências, após a instalação, você pode abrir o servidor executando o comando `npm run open` (ou caso queira apenas iniciar o servidor `npm start`).
Prontinho! Agora você tem acesso ao servidor HTTP!

# Views

Caso seja necessário criar um view, você pode colocar um arquivo HTML na pasta `/view`, o view utiliza de um sistema simples de template, onde você pode rodar JavaScript dentro do HTML utilizando de duas chaves `{}` e ele irá executar no server-side, substituindo as chaves pelo conteúdo retornado;
## Exemplo:

```html
<!DOCTYPE html>

<html lang="pt-BR">
    <head>
        <title>{Request.host}</title> <!-- Dependendo de onde o servidor está sendo hosteado, ele retornará o dominio do host. -->
    </head>

    <body>
        <p>
            {JSON.stringify(Request.headers)} <!-- Incorpora o JSON no body do HTML -->
        </p>
    </body>
</html>
```

# Funções de Request/Response (Exclusivas)

- `Request.authenticated`: Armazena o usuário autenticado
- `Response.view('nome do view')`: Envia uma view ao cliente

# .env

O arquivo .env serve para armazenar "valores secretos" (que não podem ser vistos no repositório público), mas podem ser utilizados dentro do códigos pelo `process.env`
- `DATABASE_PASSWORD`: Senha do banco de dados (você pode pedir pra qualquer P.O ou olhar no grupo do BD)
- `TEST_USER`: Essa variável de ambiente armazena o usuário utilizado para os testes unitários (`usuario:senha`)

# Teste

Caso você queira testar o back-end de forma "automatizada" (com testes unitários), você pode simplesmente executar em seu `terminal` o seguinte comando:
- `npm test`