class Usuario {
    constructor(id, login, email, senha, pontuacao) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.senha = senha;
        this.pontuacao = pontuacao;
    }
}

module.exports = Usuario;