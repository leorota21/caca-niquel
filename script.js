const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣", "⭐", "🍇", "🍀", "💰"];
const rows = 3;
const cols = 5;
const slotMachine = document.getElementById("slot-machine");
const spinButton = document.getElementById("spin-button");
const creditsDisplay = document.getElementById("credits");
let credits = 0;

function createGrid() {
  slotMachine.innerHTML = "";
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.className = "slot-cell";
    cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slotMachine.appendChild(cell);
  }
}

function spin() {
  if (credits <= 0) {
    alert("Sem créditos! Insira mais.");
    return;
  }
  credits--;
  updateCredits();
  createGrid();
  // Aqui entra lógica de combinações e bônus depois
}

function updateCredits() {
  creditsDisplay.textContent = credits;
}

// Inicial
createGrid();
updateCredits();

spinButton.addEventListener("click", spin);