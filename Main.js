const Express = require('express'); /* O próprio Express.js. Leia mais em: https://expressjs.com/ */
const FileSystem = require('node:fs'); /* Acesso aos arquivos e pastas do sistema */
const Path = require('node:path'); /* Manipulação de textos (strings) para caminhos de arquivos e pastas */
const { config } =  require('dotenv');
const { CriarPoolGlobal, Login } = require('./utils/Database');
const { json } = require('body-parser');

config(); /* Configura o arquivo .env (para variáveis de ambiente) */

const App = Express(); /* Inicializar o Express */
const Port = 8080; /* Porta do servidor */

App.use(json({ type: 'application/json' })); /* Converte o body em JSON */

CriarPoolGlobal(); /* Inicializa uma pool no banco de dados */
const Controllers = FileSystem.readdirSync('controllers'); /* Lê o diretório controllers (a pasta chamada "controllers") e retorna uma lista com os nomes dos arquivos .js */

let AuthRequiredPaths = [];

App.use((Request, Response, Next) => {
    const Send = Response.send;

    Response.send = function (body) {
        const StatusCode = Response.statusCode;

        let FormattedResponse = {
            status: StatusCode
        };

        try {
            FormattedResponse.data = JSON.parse(body)
        } catch(_) {
            FormattedResponse.data = body;
        };

        Send.call(this, JSON.stringify(FormattedResponse));
    };

    Response.view = function (ViewName) {
        const ViewContent = FileSystem.readFileSync(Path.join(__dirname, 'view', `${ViewName}.html`), 'utf-8');
        const ViewTemplate = ViewContent
        .replaceAll(/{([^}]+)}/g, (string, expression) => {
            try {
                return eval(expression);
            } catch(_) {
                return string;
            }
        });
        Send.call(this, ViewTemplate);
    }

    Next();
});

/* Autenticação */
async function AuthenticationMiddleware(Request, Response, Next) { /* Isso se chama route middleware, ele é chamado antes da função principal do caminho da url */
    const Route = Request.route;
    const Method = Request.method;
    const UrlPath = Route.path;

    const IsAuthRequired = AuthRequiredPaths.some(AuthPath => AuthPath[0] == Method && AuthPath[1] == UrlPath);
    if(!IsAuthRequired) return Next();

    const Headers = Request.headers;
    const Authorization = Headers.authorization ?? '';

    const SplittedAuth = Authorization.split(' ');

    if(!SplittedAuth[0] || !SplittedAuth[1]) return Response.status(401).send('Authorization is required');
    if(SplittedAuth[0] != 'Basic') return Response.status(401).send(`Invalid authorization type: "${SplittedAuth[0]}"`);

    const UserData = atob(SplittedAuth[1]).split(':');

    if(UserData.length > 2 || UserData.length <= 1) return Response.status(401).send('Malformed token');

    const AuthenticatedUser = await Login(UserData[0], UserData[1]);

    if(!AuthenticatedUser) return Response.status(401).send('Invalid token');

    Request.authenticated = AuthenticatedUser;

    Next();
}

for(const ControllerModule of Controllers) { /* Caminha por cada um dos controladores, coleta informações sobre eles e configura no Express */
    const ControllerData = require(Path.join(__dirname, 'controllers', ControllerModule));
    const Method = ControllerData.method.toLowerCase();
    const UrlPath = ControllerData.path;
    if(ControllerData.authenticated) AuthRequiredPaths.push([ Method.toUpperCase(), UrlPath ]);
    App[ControllerData.method.toLowerCase()](UrlPath, AuthenticationMiddleware, ControllerData.main);
}

/* Error handle */
App.use((Err, _Request, Response, _Next) => {
    Response
    .status(500)
    .send(Err.message);
});

App.listen(Port, () => console.log(`Quiz backend disponível em: http://127.0.0.1:${Port}`)); /* Liga o servidor na porta definida pela constante "Port" e envia uma mensagem com o link até o servidor HTTP */