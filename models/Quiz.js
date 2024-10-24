class Quiz {
    constructor(id, dataQuiz, idCurso, idDisciplina, idUsuario, idQuestoes01, idQuestoes02, idQuestoes03, idQuestoes04, idQuestoes05, pontuacao) {
        this.id = id;
        this.dataQuiz = dataQuiz;
        this.idCurso = idCurso;
        this.idDisciplina = idDisciplina;
        this.idUsuario = idUsuario;
        this.idQuestoes01 = idQuestoes01;
        this.idQuestoes02 = idQuestoes02;
        this.idQuestoes03 = idQuestoes03;
        this.idQuestoes04 = idQuestoes04;
        this.idQuestoes05 = idQuestoes05;
        this.pontuacao = pontuacao;
    }
}

module.exports = Quiz;