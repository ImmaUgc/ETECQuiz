# Esse é o código base

Não é difícil de compreender como ele funciona.
O código base se baseia em estrutura de arquivos, assim como um projeto de estrutura **MVC**
Basta criar um arquivo `.js` nos controladores e exportar um objeto **JSON** com as seguintes informações:
- Path: O caminho da URL
- Method: Método HTTP (get, post, put, patch, delete...).
- Main: Função que será chamada ao acessar o `path`

# Exemplo de um controlador

Na pasta `controllers` vamos criar um arquivo chamado `Exemplo.js`
Em seu `module.exports` (exportações) vamos colocar um `JSON` com as informações necessárias.
```js
module.exports = {
    main: Exemplo, /* Função que será chamada ao acessarem a URL */
    path: '/exemplo', /* Caminho da URL (http://127.0.0.1:8080/exemplo) */
    method: 'get' /* Método da request */
}
```
Agora que temos as informações necessárias, podemos criar nossa função `Exemplo` que envie uma mensagem ao usuário que está acessando o URL.
```js
function Exemplo(_Request, Response) {
    Response.send('Exemplo!');
}
```
Pronto! Você agora tem um controlador funcional em apenas uma única função. Isso se chama **COMPONENTIZAÇÃO**.

# Iniciar

Caso você queira iniciar o servidor, execute em seu `terminal` o seguinte comando: `npm install` e espere instalar as dependências, após a instalação, você pode abrir o servidor executando o comando `npm run open` (ou caso queira apenas iniciar o servidor `npm start`).
Prontinho! Agora você tem acesso ao servidor HTTP!

# Segurança

Como vocês ainda não aprenderam sobre segurança, autenticação e criptografia, vamos evitar a segurança nesse projeto. Simples assim. As senhas não serão criptografadas, as credenciais serão expostas ao público, e é isso.