let writingArea = document.getElementById("writing-area");
let wordCountDisplay = document.getElementById("word-count");
let timerDisplay = document.getElementById("timer");
let gameOverScreen = document.getElementById("game-over");

let blurOverlay = document.getElementById("blur-overlay");
let blurInterval;
let blurLevel = 0;


let idleTimer;
let countdown;
let secondsLeft = 120;

// Word counter
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Game Over
function triggerGameOver() {
    blurOverlay.style.backdropFilter = `blur(25px)`;
    gameOverScreen.style.display = "block";
    writingArea.disabled = true;
    clearInterval(countdown);
    clearInterval(blurInterval);
    clearTimeout(idleTimer);
}


// Reset idle timer each time user types
function resetIdleTimer() {
    clearTimeout(idleTimer);
    clearInterval(blurInterval);

    blurLevel = 0;
    blurOverlay.style.backdropFilter = "blur(0px)";

    // Start blur and countdown to Game Over
    startBlurEffect();

    idleTimer = setTimeout(triggerGameOver, 5000);
}

// Countdown timer
function startCountdown() {
    countdown = setInterval(() => {
        secondsLeft--;
        timerDisplay.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            alert("Congratulations! You wrote for 2 minutes!");
        }
    }, 1000);
}

// Start everything once user begins typing
writingArea.addEventListener("input", () => {
    resetIdleTimer();
    wordCountDisplay.textContent = countWords(writingArea.value);
});

// Start countdown when textarea is first focused
writingArea.addEventListener("focus", () => {
    if (!countdown) {
        startCountdown();
        resetIdleTimer();
    }
});

function startBlurEffect() {
    blurLevel = 0;

    blurInterval = setInterval(() => {
        blurLevel += 0.8;    // Increase blur strength
        blurOverlay.style.backdropFilter = `blur(${blurLevel}px)`;

        if (blurLevel >= 20) {
            // Max blur reached ≈ 5 seconds
            clearInterval(blurInterval);
        }
    }, 250); // runs every 0.25 sec (so 20 steps ≈ 5 sec)
}

