// Variáveis Globais
let credits = 100;
let betAmount = 10;
let linesBet = 1;
const icons = ['🍒', '🍋', '🍉', '🍇', '🍀', '💎', '7️⃣', '🍊', '🍒'];  // Ícones de cassino
let winAmount = 0;

// Elementos da Interface
const creditCount = document.getElementById('credit-count');
const betLinesInput = document.getElementById('bet-lines');
const spinButton = document.getElementById('spin-button');
const resultText = document.getElementById('result');
const winIcon = document.getElementById('win-icon');
const slots = document.querySelectorAll('.slot');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');
const backgroundMusic = document.getElementById('background-music');

// Atualizar Créditos
function updateCredits() {
    creditCount.textContent = credits;
}

// Adicionar Créditos
document.getElementById('add-credits-button').addEventListener('click', () => {
    credits += 100;
    updateCredits();
});

// Ajustar Linhas de Aposta
betLinesInput.addEventListener('change', () => {
    linesBet = parseInt(betLinesInput.value);
    betAmount = linesBet * 10;
    document.getElementById('line-bet').textContent = betAmount;
});

// Função para gerar ícones aleatórios
function getRandomIcon() {
    return icons[Math.floor(Math.random() * icons.length)];
}

// Função de Giro
function spinSlots() {
    if (credits < betAmount) {
        alert("Créditos insuficientes!");
        return;
    }

    credits -= betAmount;
    updateCredits();
    spinSound.play();

    // Animação de Giro
    slots.forEach(slot => {
        slot.classList.add('spin');
        setTimeout(() => {
            slot.classList.remove('spin');
            slot.textContent = getRandomIcon();  // Atualiza os ícones de forma aleatória
        }, 2000);
    });

    setTimeout(checkWin, 2000);  // Verificar vitória após 2s
}

// Verificar Vitória
function checkWin() {
    const symbols = Array.from(slots).map(slot => slot.textContent);
    const isWin = symbols.every(symbol => symbol === symbols[0]);

    if (isWin) {
        winAmount = betAmount * 2 * linesBet;
        credits += winAmount;
        resultText.textContent = `Você ganhou ${winAmount} créditos!`;
        winIcon.style.display = 'block';
        winSound.play();
    } else {
        resultText.textContent = "Tente novamente!";
        winIcon.style.display = 'none';
    }

    updateCredits();
}

// Ao clicar no botão de girar
spinButton.addEventListener('click', spinSlots);

// Iniciar Música de Fundo
backgroundMusic.play();
