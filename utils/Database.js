const mysql2 = require('mysql2/promise');
const Usuario = require('../models/Usuario');
const Alternativa = require('../models/Alternativa');
const Questao = require('../models/Questao');
const Disciplina = require('../models/Disciplina');

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

async function ConsultarDisciplinas() {
    const disciplinas_retornadas = [];
    const [[ disciplinas ]] = await Pool.query('CALL consultarDisciplinaPorCurso (1)');

    for(const disciplina of disciplinas) {
        disciplinas_retornadas.push(
            new Disciplina(
                disciplina.id,
                disciplina.disciplina,
                disciplina.sigla
            )
        );
    }

    return disciplinas_retornadas;
}

async function ConsultarQuestoesPorDisciplina(disciplina_id) {
    const questoes_retornadas = [];
    const [[ questoes ]] = await Pool.execute('CALL consultarQuestaoPorDisciplina (?)', [ disciplina_id ]);
    
    for(const questao of questoes) {
        const alternativas_retornadas = [];
        const questao_id = questao.id;
        const [[ alternativas ]] = await Pool.execute('CALL consultarAlternativaPorQuestao (?)', [ questao_id ]);
        let alternativas_sort = alternativas.sort((atual, proxima) => atual.correta - proxima.correta);
        if(alternativas_sort.length > 4) alternativas_sort.shift();
        alternativas_sort = alternativas_sort.sort(() => 0.5 - Math.random());
        for(const alternativa of alternativas_sort) {
            alternativas_retornadas.push(
                new Alternativa(
                    alternativa.id,
                    alternativa.enunciado,
                    !!alternativa.correta
                )
            );
        }
        
        questoes_retornadas.push(
            new Questao(
                questao_id,
                questao.enunciado,
                questao.pontuacao,
                questao.idDisciplina,
                alternativas_retornadas
            )
        );
    }

    return questoes_retornadas;
}

async function ContabilizarPontos(usuario_id, alternativas_ids) {
    let pontos = 0;
    for(const alternativa_id of alternativas_ids) {
        const [[[ alternativa ]]] = await Pool.execute(`CALL consultarAlternativaPorID (?)`, [ alternativa_id ]);
        
        if(!alternativa.correta) continue;

        const [[[ questao ]]] = await Pool.execute(`CALL consultarQuestaoPorID (?)`, [ alternativa.idQuestao ]);

        pontos += questao.pontuacao;
    }

    await Pool.execute(`CALL SomarPontuacao (?, '', ?, @nova_pontuacao)`, [ usuario_id, pontos ]);
    const [[{ pontuacao }]] = await Pool.query('SELECT @nova_pontuacao AS pontuacao');

    return pontuacao;
}

module.exports = {
    CriarPoolGlobal,
    CriarUsuario,
    ConsultarUsuarioPorID,
    ConsultarUsuarioPorLogin,
    ConsultarQuestoesPorDisciplina,
    ConsultarDisciplinas,
    Login,
    ContabilizarPontos
}