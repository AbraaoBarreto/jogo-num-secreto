let listaNumerosSorteados = [];
let numMax = 10;
let numero_secreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numMax}:`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numero_secreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numero_secreto) {
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}.`);

        } else {
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}.`);
        }
        tentativas++;
        limparCampo();

    }
}

function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numMax + 1);
    let quantidadeNumerosNaLista = listaNumerosSorteados.length;

    if (quantidadeNumerosNaLista == numMax) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numero_secreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}