class Questao {
    constructor(id, enunciado, pontuacao, disciplina, alternativas) {
        this.id = id;
        this.enunciado = enunciado;
        this.pontuacao = pontuacao;
        this.disciplina = disciplina;
        this.alternativas = alternativas
    }
}

module.exports = Questao;