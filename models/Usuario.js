class Usuario {
    constructor(id, loginUsuario, email, senha, pontuacao) {
        this.id = id;
        this.loginUsuario = loginUsuario;
        this.email = email;
        this.senha = senha;
        this.pontuacao = pontuacao;
    }
}

module.exports = Usuario;