const numbers = document.querySelector(".numbers");
const messageElement = document.querySelector(".message");
const melodyMusic = document.querySelector(".gameMusic");
const startGame = document.querySelector(".startGame");
const timeLeft = document.querySelector(".timeLeft");
const timer = document.getElementById("timer");
const gameSoundOver = document.getElementById("gameOver");
const gameSoundWinner = document.getElementById("gameWinner");
const menuMusic = document.getElementById("menuMusic");
const winnerText = document.getElementById("winnerText");
const gameOverText = document.getElementById("gameOverText");
const correct = document.getElementById("correct");


gameOverText.style.display = "none";
winnerText.style.display = "none";

let countdown = 0;

function countDown() {
    timer.innerHTML = `${countdown}`;
    countdown--;

    console.log(countdown);

    if(countdown > 0) {
        setTimeout(countDown, 1000);
    }
    
    if (countdown === 0) {
        gameOver();
    }
}

// mainMenuMusic();

// function mainMenuMusic() {
//     menuMusic.play();
// }

function gameOver() {
    gameOverText.style.display = "block";
    numbers.style.display = "none";
    timeLeft.style.display = "none";
    startGame.style.display = "block";
    melodyMusic.pause();
    gameSoundOver.play();
    gameSoundOver.currentTime = 0.5;
    melodyMusic.currentTime = 0;
    countdown = -1;
}

function generateButtons() {
    numbers.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

timeLeft.style.display = "none";

startGame.addEventListener("click", () => {
    timeLeft.style.display = "block";
    numbers.style.display = "flex";
    generateButtons();
    countdown = 30;
    countDown();
    startGame.style.display = "none";
    melodyMusic.play();
    melodyMusic.currentTime = 0.001;
    gameSoundOver.pause();
    gameSoundOver.currentTime = 0;
    gameOverText.style.display = "none";
    winnerText.style.display = "none";
});

function onButtonClick(button) {
    const currentNumber = Number(button.innerHTML);
    for (let number of numbers.children) {
        if (currentNumber < Number(number.innerHTML)) {
            gameOver();
            return;
        }
    }
    
    correct.play();
    button.remove();

    if (!numbers.children.length) {
        numbers.style.display = "none";
        timeLeft.style.display = "none";
        startGame.style.display = "block";
        gameSoundWinner.play();
        winnerText.style.display = "block";
        melodyMusic.pause();
        melodyMusic.currentTime = 0;
        countdown = -1;
    }
}

// function setMessage(message) {
//     messageElement.innerHTML = message;

//     setTimeout(() => {
//         messageElement.innerHTML = "";
//     }, 3000);
// }