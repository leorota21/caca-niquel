const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let credits = 0, betAmount = 1, winStreak = 0;
const rows = 3, cols = 5;
const symbols = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6', 'slot7', 'slot8', 'slot9', 'wild', 'scatter'];

function preload() {
    this.load.image('background', 'assets/carnival_bg.png');
    symbols.forEach(symbol => this.load.image(symbol, `assets/${symbol}.png`));
    this.load.audio('spin', 'assets/spin_sound.mp3');
    this.load.audio('win', 'assets/win_sound.mp3');
}

function create() {
    this.add.image(500, 300, 'background');
    this.spinSound = this.sound.add('spin');
    this.winSound = this.sound.add('win');
    
    this.reels = [];
    for (let r = 0; r < rows; r++) {
        this.reels[r] = [];
        for (let c = 0; c < cols; c++) {
            this.reels[r][c] = this.add.image(200 + c * 120, 100 + r * 120, Phaser.Utils.Array.GetRandom(symbols));
        }
    }

    this.spinButton = this.add.text(400, 500, 'Girar', { fontSize: '32px', fill: '#FFF' })
        .setInteractive()
        .on('pointerdown', spinReels, this);
    
    this.creditText = this.add.text(50, 50, `Créditos: ${credits}`, { fontSize: '24px', fill: '#FFF' });
    this.betText = this.add.text(50, 80, `Aposta: ${betAmount}`, { fontSize: '24px', fill: '#FFF' });
}

function spinReels() {
    if (credits < betAmount) return;
    credits -= betAmount;
    this.creditText.setText(`Créditos: ${credits}`);
    this.spinSound.play();
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const randomSymbol = Phaser.Utils.Array.GetRandom(symbols);
            this.reels[r][c].setTexture(randomSymbol);
        }
    }
    
    checkWin.call(this);
}

function checkWin() {
    let win = false;
    let payout = 0;
    let scatterCount = 0;
    
    for (let r = 0; r < rows; r++) {
        let firstSymbol = this.reels[r][0].texture.key;
        let matchCount = this.reels[r].filter(slot => slot.texture.key === firstSymbol || slot.texture.key === 'wild').length;
        if (matchCount >= 3) {
            win = true;
            payout += betAmount * matchCount;
        }
    }
    
    for (let c = 0; c < cols; c++) {
        let firstSymbol = this.reels[0][c].texture.key;
        let matchCount = this.reels.map(row => row[c]).filter(slot => slot.texture.key === firstSymbol || slot.texture.key === 'wild').length;
        if (matchCount >= 3) {
            win = true;
            payout += betAmount * matchCount;
        }
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (this.reels[r][c].texture.key === 'scatter') scatterCount++;
        }
    }
    
    if (scatterCount >= 3) {
        credits += betAmount * 10;
        alert("Bônus de Giros Grátis!");
    }
    
    if (win) {
        winStreak++;
        payout *= (1 + winStreak * 0.1);
        this.winSound.play();
        credits += payout;
        this.creditText.setText(`Créditos: ${credits}`);
    } else {
        winStreak = 0;
    }
}

function update() {}
