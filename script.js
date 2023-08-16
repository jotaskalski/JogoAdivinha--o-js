class Adivinhacao {
    btnChute = document.getElementById('btnChute');
    txtChute = document.getElementById('inputChute');
    txtMensagem = document.getElementById('txtMensagem');

    numeroChute = 0;
    numeroCorreto = 0;
    tentativas = 20;

    constructor() {
        this.RegistrarEventos();
        this.Limpar();
        this.numeroCorreto = Math.floor(Math.random() * 20) + 1;
        this.tentativas = 20;
    }

    RegistrarEventos() {
        this.txtChute.addEventListener('keyup', (evento) => this.NumeroChute(evento.target.value));
        this.btnChute.addEventListener('click', () => this.VerificarChute());
    }

    NumeroChute(numero) {
        this.txtMensagem.visibility = "hidden";
        const caracteresPermitido = "123456789";
        const arrayCaracteres = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",];
        const ehNumeroValido = caracteresPermitido.includes(numero) || arrayCaracteres.includes(numero) ? true : false;
        const numeroInvalido = numero > 20 || numero < 1 ? true : false;
        this.txtMensagem.style.visibility = "hidden";

        if (numeroInvalido) {
            this.btnChute.disabled = true;
            this.txtMensagem.innerText = "Número entre 1 e 20";
            this.txtMensagem.style.visibility = "visible";
            return;
        }
        if (!ehNumeroValido) {
            this.btnChute.disabled = true;
            this.txtMensagem.innerText = "Somente números são permitidos";
            this.txtMensagem.style.visibility = "visible";
            return;
        }
        if (ehNumeroValido) this.btnChute.removeAttribute("disabled");
        this.numeroChute = Number(numero);
    }
    VerificarChute() {
        if (this.numeroChute == this.numeroCorreto) {
            this.Acertou();
            return;
        }
        if (this.tentativas == 1 && this.numeroChute != this.numeroCorreto) {
            this.Perdeu();
            return;
        }
        if (this.tentativas > 0 && this.numeroChute != this.numeroCorreto) {
            this.tentativas = this.tentativas - 1;
            this.TentarNovamente();
        }
    }
    async Acertou() {
        this.txtMensagem.style.visibility = "visible";
        this.txtMensagem.textContent = "Parabéns, você acertou!";
        this.txtChute.disabled = true;
        this.btnChute.disabled = true
    }
    async Perdeu() {
        this.txtMensagem.style.visibility = 'visible';
        this.txtMensagem.textContent = "Você perdeu, tente novamente!";
        this.txtChute.disabled = true;
        this.btnChute.disabled = true;
    }
    async msgTenteNovamente(mensagem) {
        this.txtMensagem.style.visibility = 'visible';
        this.txtMensagem.textContent = `Seu número é ${mensagem} do que o número sorteado.`;
    }
    TentarNovamente() {
        if (this.numeroChute < this.numeroCorreto) {
            this.msgTenteNovamente("menor");
        }

        if (this.numeroChute > this.numeroCorreto) {
            this.msgTenteNovamente("maior");
        }

    }
    JogarNovamente() {
        location.reload();
    }
    Limpar() {

        this.txtChute.disabled = false;
        this.txtMensagem.style.visibility = "hidden";
        this.txtChute.value = "";
    }
    mensagem(msg) {
        this.txtMensagem.style.visibility = 'visible';
        this.txtMensagem.textContent = msg;
    }
}
window.addEventListener('load', new Adivinhacao());