class Quiz {
    constructor(id, dataQuiz, idCurso, idDisciplina, idUsuario, questoes01, questoes02, questoes03, questoes04, questoes05, pontuacao) {
        this.id = id;
        this.dataQuiz = dataQuiz;
        this.idCurso = idCurso;
        this.idDisciplina = idDisciplina;
        this.idUsuario = idUsuario;
        this.questoes01 = questoes01;
        this.questoes02 = questoes02;
        this.questoes03 = questoes03;
        this.questoes04 = questoes04;
        this.questoes05 = questoes05;
        this.pontuacao = pontuacao;
    }
}

module.exports = Quiz;