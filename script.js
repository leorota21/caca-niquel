// Variáveis Globais
let credits = 100;
let betColumn1 = 10;
let betColumn2 = 10;
let betColumn3 = 10;
const icons = ['🍒', '🍋', '🍉', '🍇', '🍀', '💎', '7️⃣', '🍊', '🍒'];  // Ícones de cassino
let winAmount = 0;

// Elementos da Interface
const creditCount = document.getElementById('credit-count');
const betColumn1Input = document.getElementById('bet-column-1');
const betColumn2Input = document.getElementById('bet-column-2');
const betColumn3Input = document.getElementById('bet-column-3');
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

// Função para gerar ícones aleatórios
function getRandomIcon() {
    return icons[Math.floor(Math.random() * icons.length)];
}

// Função de Giro
function spinSlots() {
    // Atualizar valores das apostas
    betColumn1 = parseInt(betColumn1Input.value);
    betColumn2 = parseInt(betColumn2Input.value);
    betColumn3 = parseInt(betColumn3Input.value);

    const totalBet = betColumn1 + betColumn2 + betColumn3;

    if (credits < totalBet) {
        alert("Créditos insuficientes!");
        return;
    }

    credits -= totalBet;
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

// Função de Verificação de Vitória
function checkWin() {
    const symbols = Array.from(slots).map(slot => slot.textContent);

    let win = 0;
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) win += betColumn1;
    if (symbols[2] === symbols[3] && symbols[3] === symbols[4]) win += betColumn2;
    if (symbols[0] === symbols[4]) win += betColumn3;

    if (win > 0) {
        credits += win;
        resultText.textContent = `Você ganhou ${win} créditos!`;
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
