// Variáveis globais
let credits = 100;
let betAmount = 1;
let lines = 1;
let symbols = ['🍒', '🍋', '🍊', '🍉', '🔔', '⭐'];
let spinInProgress = false;  // Para evitar que o usuário gire enquanto a animação está acontecendo

// Função para adicionar créditos com senha
function addCredits() {
  const password = document.getElementById('password').value;
  
  if (password === '1234') {  // Senha para adicionar créditos
    credits += 100;  // Adiciona 100 créditos
    document.getElementById('credit-display').innerText = credits;
    alert('Créditos adicionados com sucesso!');
  } else {
    alert('Senha incorreta!');
  }
}

// Função para girar as colunas
function spin() {
  if (spinInProgress) return; // Impede novo giro enquanto animação anterior não terminar
  if (credits < betAmount * lines) {
    alert('Créditos insuficientes!');
    return;
  }

  // Deduz os créditos apostados
  credits -= betAmount * lines;
  document.getElementById('credit-display').innerText = credits;

  // Inicia a animação
  spinInProgress = true;
  let slotElements = [];
  for (let i = 1; i <= 5; i++) {
    let slot = document.getElementById('slot-' + i);
    slotElements.push(slot);
    slot.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    slot.classList.add('spin');
  }

  // Função para parar a animação e checar os resultados
  setTimeout(() => {
    // Parar a animação e mostrar o resultado final
    for (let i = 0; i < slotElements.length; i++) {
      slotElements[i].classList.remove('spin');
      slotElements[i].innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    }

    checkWin(slotElements);  // Verifica se o jogador ganhou
    spinInProgress = false;
  }, 1500);  // 1.5 segundos de animação
}

// Função para checar se houve vitória
function checkWin(slotElements) {
  let win = false;
  let winningCombination = [];
  
  // Verifica se o jogador acertou uma combinação
  for (let i = 0; i < lines; i++) {
    if (slotElements[i].innerHTML === slotElements[i + 1].innerHTML && slotElements[i].innerHTML === slotElements[i + 2].innerHTML) {
      win = true;
      winningCombination = [slotElements[i].innerHTML, slotElements[i + 1].innerHTML, slotElements[i + 2].innerHTML];
      break;
    }
  }

  // Exibe o resultado
  if (win) {
    let payout = betAmount * lines * 10;  // Multiplicador de pagamento
    credits += payout;
    document.getElementById('credit-display').innerText = credits;
    document.getElementById('result').innerText = `Você ganhou: ${payout} créditos! Com a combinação: ${winningCombination.join(' ')}`;
  } else {
    document.getElementById('result').innerText = 'Você perdeu! Tente novamente.';
  }
}

// Atualizar valores de aposta e linhas
document.getElementById('bet-amount').addEventListener('input', function () {
  betAmount = parseInt(this.value);
});

document.getElementById('lines').addEventListener('input', function () {
  lines = parseInt(this.value);
});
