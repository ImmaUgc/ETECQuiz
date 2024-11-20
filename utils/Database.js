const mysql2 = require('mysql2/promise');
const Usuario = require('../models/Usuario');

let Pool; /* Pool é um conjunto de conexões no banco de dados que é gerenciado de forma automática pelo MySQL, abrindo e fechando conexões quando necessário. Essa pool será carregada uma única vez no código inteiro. */

function CriarPoolGlobal() {
    /* Caso queira fazer testes com o banco de dados, aqui estão as procedures e tables para criar o banco localmente */
    /* Tables: https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/Banco1.sql */
    /* Procedures (Exemplos): https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/Exemplosprocedures.sql */
    /* Procedures: https://github.com/ronaldo-mendonca-dos-santos/Quiz-SQL/blob/main/procedures.sql */
    Pool = mysql2.createPool({
        host: 'autorack.proxy.rlwy.net',
        port: 12162,
        user: 'root',
        password: process.env['DATABASE_PASSWORD'], /* Peça a senha para o pessoal do BD e coloque no .env */
        database: 'railway',
        connectionLimit: 100 /* Limite de conexões abertas de forma simultânea */
    });
}

async function CriarUsuario(usuario) {
    await Pool.execute('CALL inserirUsuario (?, ?, ?, 0)', [
        usuario.login,
        usuario.email,
        usuario.senha
    ]);
}

async function ConsultarUsuarioPorID(id) {
    const [[[ usuario ]]] = await Pool.execute('CALL consultarUsuarioPorID (?)', [ id ]);

    if(!usuario) return null;
    
    return new Usuario(
        usuario.id,
        usuario.loginUsuario,
        usuario.email,
        usuario.senha,
        usuario.pontuacao
    );
}

async function ConsultarUsuarioPorLogin(login) {
    const [[[ usuario ]]] = await Pool.execute('CALL consultarUsuarioPorLogin (?)', [ login ]);

    if(!usuario) return null;
    
    return new Usuario(
        usuario.id,
        usuario.loginUsuario,
        usuario.email,
        usuario.senha,
        usuario.pontuacao
    );
}

async function Login(login, password) {
    const usuario = await ConsultarUsuarioPorLogin(login);

    if(!usuario) return null;

    await Pool.execute('CALL ValidarSenha (?, ?, ?, @resultado)', [ usuario.id, login, password ]);

    const [[{ validation }]] = await Pool.query('SELECT @resultado AS validation'); /* Provavelmente, uma forma péssima de se validar uma senha em um projeto REAL. (Mas aqui não tem problema) */

    if(!validation) return null;

    return await ConsultarUsuarioPorID(usuario.id);
}

module.exports = {
    CriarPoolGlobal,
    CriarUsuario,
    ConsultarUsuarioPorID,
    ConsultarUsuarioPorLogin,
    Login
}