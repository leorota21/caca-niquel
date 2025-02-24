// Variáveis do Jogo
let credits = 100;
let betAmount = 10; // Valor da aposta por linha
let linesBet = 1; // Linhas de aposta

// Elementos da interface
const creditCount = document.getElementById('credit-count');
const betLinesInput = document.getElementById('bet-lines');
const spinButton = document.getElementById('spin-button');
const resultText = document.getElementById('result');
const winIcon = document.getElementById('win-icon');
const slots = document.querySelectorAll('.slot');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');

// Atualizar créditos na interface
function updateCredits() {
    creditCount.textContent = credits;
}

// Adicionar créditos ao clicar no botão
document.getElementById('add-credits-button').addEventListener('click', () => {
    credits += 100;  // Adicionar créditos
    updateCredits();
});

// Definir quantidade de linhas apostadas
betLinesInput.addEventListener('change', () => {
    linesBet = parseInt(betLinesInput.value);
    betAmount = linesBet * 10;  // Aposta por linha multiplicada pela quantidade de linhas
    document.getElementById('line-bet').textContent = betAmount;
});

// Função para girar os slots
function spinSlots() {
    // Checar se há créditos suficientes
    if (credits < betAmount) {
        alert("Créditos insuficientes!");
        return;
    }

    credits -= betAmount;
    updateCredits();

    // Tocar som de giro
    spinSound.play();

    // Iniciar animação de rotação
    slots.forEach(slot => {
        slot.classList.add('spin');
        setTimeout(() => slot.classList.remove('spin'), 1500); // Tempo de rotação
    });

    // Após animação, checar vitória
    setTimeout(checkWin, 1500);
}

// Verificar se houve vitória
function checkWin() {
    const symbols = Array.from(slots).map(slot => slot.textContent);
    
    const isWin = symbols[0] === symbols[1] && symbols[1] === symbols[2];  // Simples para 3 símbolos iguais

    // Mostrar resultado
    if (isWin) {
        resultText.textContent = "Você ganhou!";
        winIcon.style.display = 'block';
        winSound.play();
        credits += betAmount * 2;  // Pagamento duplo, por exemplo
    } else {
        resultText.textContent = "Tente novamente!";
        winIcon.style.display = 'none';
    }

    updateCredits();
}

// Ao clicar no botão de girar
spinButton.addEventListener('click', spinSlots);
