const Express = require('express'); /* O próprio Express.js. Leia mais em: https://expressjs.com/ */
const FileSystem = require('node:fs'); /* Acesso aos arquivos e pastas do sistema */
const Path = require('node:path'); /* Manipulação de textos (strings) para caminhos de arquivos e pastas */

const App = Express(); /* Inicializar o Express */
const Port = 8080; /* Porta do servidor */

const Controllers = FileSystem.readdirSync('controllers'); /* Lê todo o diretório controllers (a pasta chamada "controllers") e retorna uma lista com os nomes dos arquivos .js */

for(const ControllerModule of Controllers) { /* Caminha por cada um dos controladores, coleta informações sobre eles e configura no Express */
    const ControllerData = require(Path.join(__dirname, 'controllers', ControllerModule));
    App[ControllerData.method.toLowerCase()](ControllerData.path, ControllerData.main)
}

App.listen(Port, () => console.log(`Quiz backend disponível em: http://127.0.0.1:${Port}`)); /* Liga o servidor na porta definida pela constante "Port" e envia uma mensagem com o link até o servidor HTTP */