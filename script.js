// Obter os elementos de áudio
const spinSound = document.getElementById("spin-sound");
const winSound = document.getElementById("win-sound");

// Função que toca o som de "giro"
function playSpinSound() {
  spinSound.play();
}

// Função que toca o som de "vitória"
function playWinSound() {
  winSound.play();
}

// Exemplo de como integrar ao botão de girar
document.getElementById("spin-button").addEventListener("click", function() {
  playSpinSound();
  spinSlots(); // Função de girar os slots
});

// Função para girar os slots com animação
function spinSlots() {
  // Adicionar a classe 'spin' a todos os slots para a animação
  const slots = document.querySelectorAll(".slot");
  slots.forEach(slot => {
    slot.classList.add("spin");

    // Remover a classe de animação após o término para que possa ser reiniciada
    setTimeout(() => {
      slot.classList.remove("spin");
    }, 1500);  // A duração da animação (1.5 segundos)
  });

  // Verificar se houve vitória após a animação
  setTimeout(() => {
    checkWin();
  }, 1500);
}

// Função para exibir o resultado
function showResult(isWin) {
  const resultText = document.getElementById("result");
  const resultIcon = document.getElementById("win-icon");

  if (isWin) {
    resultText.textContent = "Você venceu!";
    resultIcon.style.display = "block";  // Mostrar o ícone de vitória
    playWinSound(); // Tocar som de vitória
  } else {
    resultText.textContent = "Você perdeu!";
    resultIcon.style.display = "none";  // Esconder o ícone
  }
}

// Função para verificar vitória (exemplo simples)
function checkWin() {
  const slots = document.querySelectorAll(".slot");
  const symbols = Array.from(slots).map(slot => slot.textContent);

  // Aqui você pode definir uma lógica para verificar combinações vencedoras
  const isWin = symbols[0] === symbols[1] && symbols[1] === symbols[2]; // Exemplo de condição de vitória

  showResult(isWin);
}
