let secret_number = Math.floor((Math.random() * 10) + 1);
let tentativas = 0;  // Variável para contar o número de tentativas

// Função para gerar um novo número secreto
function getSecretNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

// Função para exibir texto em uma tag
function exibeTextoTag(tag, texto) {
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {pitch: 1});
}

// Configura os textos iniciais
exibeTextoTag('h1', 'Qual seu número da sorte secreto?');
exibeTextoTag('p', 'Tente sua sorte, entre 1 e 10 faça sua escolha');

// Função para verificar o chute
function verificarChute() {
    let guess = document.querySelector('input').value;
    tentativas++;  // Incrementar o número de tentativas a cada chute

    // Verifica se as tentativas atingiram o limite de 7
    if (tentativas >= 7 && guess != secret_number) {
        // Exibe a tela do tigrinho com raiva
        document.getElementById('conteudo-jogo').style.display = 'none';
        document.getElementById('tigrinho-raiva').style.display = 'block';
        let mensagem = `Suas tentativas acabaram, deposita mais 200.`;
        document.getElementById('mensagem-vitoria').innerText = mensagem;

        // Desabilita o input e os botões
        document.querySelector('input').setAttribute('disabled', true);
        document.querySelector('.container__botao').setAttribute('disabled', true);

        responsiveVoice.speak(mensagem, "UK English Male", {pitch: 2});
    } else if (guess == secret_number) {
        // Se o jogador acertou o número
        if (tentativas === 1) {
            // Exibe a tela do tigrinho triste se acertar na primeira tentativa
            document.getElementById('conteudo-jogo').style.display = 'none';
            document.getElementById('tigrinho-triste').style.display = 'block';

            let mensagem = `Você acertou em ${tentativas} tentativa! Vou soltar a cartinha.`;
            document.getElementById('mensagem-triste').innerText = mensagem;
        } else {
            // Exibe a tela do tigrinho com raiva se acertar após várias tentativas
            document.getElementById('conteudo-jogo').style.display = 'none';
            document.getElementById('tigrinho-raiva').style.display = 'block';

            let mensagem = `Você acertou em ${tentativas} tentativas! Deposita mais 20 aí que eu libero a cartinha.`;
            document.getElementById('mensagem-vitoria').innerText = mensagem;
        }

        // Desabilita o input e os botões
        document.querySelector('input').setAttribute('disabled', true);
        document.querySelector('.container__botao').setAttribute('disabled', true);

        responsiveVoice.speak(mensagem, "UK English Male", {pitch: 2});
    } else {
        // Dicas se o chute foi errado
        if (guess < secret_number) {
            exibeTextoTag('p', 'Haha, não foi dessa vez! O número é maior');
        } else {
            exibeTextoTag('p', 'Ainda não, o número é menor');
        }
    }
    tentativas++
    limpaInput();
}

// Função para limpar o campo de input
function limpaInput() {
    document.querySelector('input').value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tentativas = 0;  // Reinicia o contador de tentativas
    secret_number = getSecretNumber();  // Gera um novo número secreto
    exibeTextoTag('h1', 'Qual seu número da sorte secreto?');
    exibeTextoTag('p', 'Tente sua sorte, entre 1 e 10 faça sua escolha');
    
    // Reabilita o input e os botões
    document.querySelector('input').removeAttribute('disabled');
    document.querySelector('.container__botao').removeAttribute('disabled');
    
    limpaInput();

    // Restaurar o conteúdo do jogo e esconder as imagens
    document.getElementById('conteudo-jogo').style.display = 'block';
    document.getElementById('tigrinho-raiva').style.display = 'none';
    document.getElementById('tigrinho-triste').style.display = 'none';
}








