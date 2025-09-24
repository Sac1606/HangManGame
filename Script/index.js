const btnLetter = document.getElementById("btn-letter");
const word = document.getElementById("word");
const newgame = document.getElementById("new-game");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result");
const btnGenearateAgain = document.getElementById("generateAgain");

const gameStats = document.getElementById("game-stats");
const attemptsRemainingEl = document.getElementById("attempts-remaining");
const failedAttemptsEl = document.getElementById("failed-attempts");
const usedLettersEl = document.getElementById("used-letters");

let count = 0;
let guessed = 0;
let chosenWord = "";
let levelDifficulty = "";
let usedLetters = [];
let maxAttempts = 7;

let btn = document.getElementById("playBtn");
let setting = document.getElementById("setting");
let exitGame = document.getElementById("exit-game");
let context = canvas.getContext("2d");
context.beginPath();
context.strokeStyle = "#00FF00";
context.lineWidth = 2;

let options = {
    easy: ["casa", "gato", "perro", "mesa", "libro", "kinal", "fruta", "coche", "silla", "vaso"],
    medium: ["ventana", "puente", "camino", "escuela", "planeta", "botella", "caballo", "pantalla", "perfume"],
    hard: ["xilofono", "psicologia", "quimica", "oxigeno", "zoologia", "enjambre", "quimera", "hipopotamo", "ornitorrinco", "estrambotico"]
};

function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    count = 0;
    guessed = 0; 
    drawWood(); 
    resetStats();
}

function updateGameStats() {
    const remaining = maxAttempts - count;
    
    // Actualizar intentos restantes
    attemptsRemainingEl.textContent = remaining;
    attemptsRemainingEl.className = 'stat-value attempts-remaining';
    
    // Cambiar color según intentos restantes
    if (remaining <= 2) {
        attemptsRemainingEl.classList.add('attempts-critical');
    } else if (remaining <= 3) {
        attemptsRemainingEl.classList.add('attempts-low');
    }
    
    // Actualizar intentos fallidos
    failedAttemptsEl.textContent = count;
    
    // Actualizar letras usadas
    updateUsedLetters();
}

function updateUsedLetters() {
    if (usedLetters.length === 0) {
        usedLettersEl.innerHTML = '<span class="stat-value" style="font-size: 12px;">Ninguna</span>';
    } else {
        usedLettersEl.innerHTML = usedLetters.map(letter => 
            `<span class="letter-used">${letter}</span>`
        ).join('');
    }
}

function resetStats() {
    count = 0;
    guessed = 0;
    usedLetters = [];
    updateGameStats();
    gameStats.style.display = 'flex';
}

function hideStats() {
    gameStats.style.display = 'none';
}

function letterButton() {
    for (let i = 65; i < 91; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = String.fromCharCode(i);
        btn.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            usedLetters.push(btn.innerText);
            if (charArray.includes(btn.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === btn.innerText) {
                        dashes[index].innerText = char;
                        guessed += 1;
                        if (guessed == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2>
                            <p>The word was <span>${chosenWord}</span></p>
                            <p>You got it correct at <span>${count}</span> attempts</p>`;
                            console.log("You Win");
                            document.getElementById("new-game").classList.remove("hide");
                        }
                    }
                });
            } else {
                count += 1;
                drawMan(count);
                if (count == 7) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    console.log("You Lose");
                    document.getElementById("new-game").classList.remove("hide");
                }
            }
            updateGameStats();
            btn.disabled = true;
            console.log(btn.innerText);
        });
        btnLetter.append(btn)
    }
}

function generateWord(difficulty) {
    word.innerText = "";
    let optionArray = options[difficulty];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
    let displayItem = chosenWord.replace(/./g, '<h1 class="dashes">_</h1>');
    word.innerHTML = displayItem;
}

btnGenearateAgain.addEventListener("click", () => {
    generateWord(levelDifficulty);
});

function goBack() {
    document.getElementById("game").classList.remove("active");
    document.getElementById("game").style.display = "none";
    document.getElementById("main").style.display = "flex";
    document.getElementById("options").style.display = "flex";
    document.getElementById("btn-letter").classList.remove("active");
    document.getElementById("btn-letter").style.display = "none";
    document.getElementById("exit-game").classList.remove("active");
    setting.classList.remove("active");
    document.getElementById("exit-confirm").classList.add("hide");
    document.getElementById("new-game").classList.add("hide");
    hideStats();
    levelDifficulty = "";
    word.innerText = "";
    btnLetter.innerText = "";
    resultText.innerText = "";
    canvas.innerText = "";
    resetCanvas();
    chosenWord = "";
    levelDifficulty = "";
    setTimeout(function () {
        document.getElementById("main").classList.remove("hidden")
    }, 50);
}

function confirmChoice() {
    document.getElementById("exit-confirm").classList.remove("hide");
}

function confirmExit(choice) {
    if (choice) {
        goBack();
    } else {
        document.getElementById("exit-confirm").classList.add("hide");
    }
}

function opneSetting() {
    setting.classList.toggle("active");
    if (setting.classList.contains("active")) {
        setTimeout
            (() => {
                btn.innerText = "Close";
            }, 310);

    } else {
        setTimeout
            (() => {
                btn.innerText = "Play";
            }, 600);
    }
}

function startGame() {
    resetCanvas();
    btnLetter.innerHTML = "";
    document.getElementById("main").style.display = "none";
    document.getElementById("game").style.display = "flex";
    setTimeout
            (() => {
                document.getElementById("game").classList.add("active");;
            }, 150);
    document.getElementById("main").classList.add("hidden");
    document.getElementById("new-game").classList.add("hide");
    btn.innerText = "Play";
    levelDifficulty = event.target.innerText.toLowerCase();
    console.log(levelDifficulty);
    generateWord(levelDifficulty);
}

function restartGame() {
    resetCanvas();
    btnLetter.innerHTML = "";
    document.getElementById("main").style.display = "none";
    document.getElementById("game").classList.add("active");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("new-game").classList.add("hide");
    document.getElementById("btn-letter").classList.remove("active");
    document.getElementById("btn-letter").style.display = "none";
    document.getElementById("options").style.display = "flex";
    btn.innerText = "Play";
    generateWord(levelDifficulty);
}

function drawLine(fromX, fromY, toX, toY) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}

function drawWood() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.strokeStyle = '#00ff00';
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    drawLine(30, 140, 170, 140);
    drawLine(30, 135, 170, 135); 
    
    context.lineWidth = 4;
    drawLine(90, 15, 90, 141);
    drawLine(93, 15, 93, 141); 
    
    context.lineWidth = 3;
    drawLine(90, 40, 130, 15);
    drawLine(92, 42, 132, 17);
    
    context.lineWidth = 3;
    drawLine(90, 15, 200, 15);
    drawLine(90, 18, 200, 18); 
    
    context.strokeStyle = '#ffff00';
    context.lineWidth = 2;
    drawLine(199, 15, 199, 35);

    context.beginPath();
    context.arc(199, 32, 3, 0, Math.PI * 2);
    context.stroke();
    
    console.log("wood mejorado");
};

function head() {
    context.strokeStyle = '#ff6600'; 
    context.lineWidth = 3;
    context.lineCap = 'round';
    
    context.beginPath();
    context.arc(199, 45, 12, 0, Math.PI * 2);
    context.stroke();
    
    context.lineWidth = 2;
    drawLine(194, 40, 198, 44);
    drawLine(194, 44, 198, 40);
    drawLine(200, 40, 204, 44);
    drawLine(200, 44, 204, 40);
    
}

function body() {
    context.strokeStyle = '#ff6600';
    context.lineWidth = 4;
    context.lineCap = 'round';
    
    drawLine(199, 57, 199, 95);
    
    console.log("body mejorado");
}

function leftArm() {
     context.strokeStyle = '#ff6600';
    context.lineWidth = 3;
    context.lineCap = 'round';
    
    drawLine(199, 65, 185, 75); 
    drawLine(185, 75, 175, 85);  
    
    context.beginPath();
    context.arc(175, 85, 2, 0, Math.PI * 2);
    context.fill();
}

function rightArm() {
    context.strokeStyle = '#ff6600';
    context.lineWidth = 3;
    context.lineCap = 'round';
    
    drawLine(199, 65, 213, 75);
    drawLine(213, 75, 223, 85); 
    
    
    context.beginPath();
    context.arc(223, 85, 2, 0, Math.PI * 2);
    context.fill();
    
}

function leftLeg() {
    context.strokeStyle = '#ff6600';
    context.lineWidth = 3;
    context.lineCap = 'round';
    
    
    drawLine(199, 95, 185, 110); 
    drawLine(185, 110, 175, 125); 
    
    
    drawLine(175, 125, 170, 125);
    
    console.log("leftLeg mejorado");
}

function rightLeg() {
    context.strokeStyle = '#ff6600';
    context.lineWidth = 3;
    context.lineCap = 'round';
    
    
    drawLine(199, 95, 213, 110); 
    drawLine(213, 110, 223, 125); 
    
    
    drawLine(223, 125, 228, 125);
    
}


function drawGameOver() {
    context.strokeStyle = '#ff0066'; 
    context.lineWidth = 2;
    drawLine(199, 50, 201, 55);
    context.beginPath();
    context.arc(201, 55, 2, 0, Math.PI * 2);
    context.fillStyle = '#ff0066';
    context.fill();
}

function drawMan(attempts) {
    switch (attempts) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftLeg();
            break;
        case 4:
            rightLeg();
            break;
        case 5:
            leftArm();
            break;
        case 6:
            rightArm();
            break;
        case 7:
            drawGameOver();
            break;
        default:
            break;
    }
}

function playBtn() {
    document.getElementById("options").style.display = "none";
    document.getElementById("btn-letter").style.display = "flex";
    setTimeout
            (() => {
                document.getElementById("btn-letter").classList.add("active");
            }, 250);
    document.getElementById("exit-game").classList.add("active");
    document.getElementById("new-game").classList.add("hide");
    letterButton();
}
