const mysql2 = require('mysql2/promise');
const Usuario = require('../models/Usuario');

let Pool; /* Pool é um conjunto de conexões no banco de dados que é gerenciado de forma automática pelo MySQL, abrindo e fechando conexões quando necessário. Essa pool será carregada uma única vez no código inteiro. */

async function CriarPoolGlobal() {
    /* Conecte o seu banco de dados MySQL localmente com as procedures e tables do repositório do banco de dados */
    /* Tables: https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/Banco1 */
    /* Procedures (Exemplos): https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/exemplos-procedures.sql */
    /* Procedures: https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/procedures */
    Pool = await mysql2.createPool({
        host: 'autorack.proxy.rlwy.net',
        port: 41305,
        user: 'root',
        password: 'gSWHvIHQRrTXNBbulfmYMvQSzcYwXmuT',
        database: 'railway',
        connectionLimit: 100 /* Limite de conexões abertas de forma simultânea */
    });
}

/* Uma função que adiciona um usuário ao banco de dados recebendo como parâmetro a clase Usuario (en Usuario.js) */

async function CriarUsuario(usuario) {
    await Pool.execute('CALL inserirUsuario (?, ?, ?, 0)', [
        usuario.login,
        usuario.email,
        usuario.senha
    ]);
}

/* Uma função que consulte um usuário pelo ID fornecido */

async function ConsultarUsuarioPeloID(id) {
    let [[[ usuario ]]] = await Pool.execute('CALL consultarUsuarioPorID (?)', [ id ]);

    if(!usuario) return null;
    
    return new Usuario(
        usuario.id,
        usuario.loginUsuario,
        usuario.email,
        usuario.senha,
        usuario.pontuacao
    );
}

module.exports = {
    CriarPoolGlobal,
    CriarUsuario,
    ConsultarUsuarioPeloID
}