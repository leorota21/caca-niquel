// Variáveis Globais
let credits = 100;
let betAmount = 10;
let linesBet = 1;

// Elementos da interface
const creditCount = document.getElementById('credit-count');
const betLinesInput = document.getElementById('bet-lines');
const spinButton = document.getElementById('spin-button');
const resultText = document.getElementById('result');
const winIcon = document.getElementById('win-icon');
const slots = document.querySelectorAll('.slot');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');
const themeSelector = document.getElementById('theme');

// Atualizar Créditos na Interface
function updateCredits() {
    creditCount.textContent = credits;
}

// Adicionar Créditos
document.getElementById('add-credits-button').addEventListener('click', () => {
    credits += 100;  // Adiciona 100 créditos
    updateCredits();
});

// Ajustar Linhas de Aposta
betLinesInput.addEventListener('change', () => {
    linesBet = parseInt(betLinesInput.value);
    betAmount = linesBet * 10;  // Aposta por linha
    document.getElementById('line-bet').textContent = betAmount;
});

// Trocar Tema
themeSelector.addEventListener('change', () => {
    document.body.classList.remove('classic', 'neon', 'retro');
    document.body.classList.add(themeSelector.value);
});

// Função de Giro
function spinSlots() {
    if (credits < betAmount) {
        alert("Créditos insuficientes!");
        return;
    }

    credits -= betAmount;
    updateCredits();
    spinSound.play();

    // Animação de giro
    slots.forEach(slot => {
        slot.classList.add('spin');
        setTimeout(() => slot.classList.remove('spin'), 1500);
    });

    setTimeout(checkWin, 1500);  // Verificar vitória após 1.5s
}

// Verificar Vitória
function checkWin() {
    const symbols = Array.from(slots).map(slot => slot.textContent);
    const isWin = symbols[0] === symbols[1] && symbols[1] === symbols[2];

    if (isWin) {
        resultText.textContent = "Você ganhou!";
        winIcon.style.display = 'block';
        winSound.play();
        credits += betAmount * 2;  // Pagamento duplo
    } else {
        resultText.textContent = "Tente novamente!";
        winIcon.style.display = 'none';
    }

    updateCredits();
}

// Ao clicar no botão de girar
spinButton.addEventListener('click', spinSlots);
