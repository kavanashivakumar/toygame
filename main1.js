let userCar = document.getElementById("user-car");
let computerCar = document.getElementById("computer-car");
let userProgressBar = document.getElementById("user-progress");
let computerProgressBar = document.getElementById("computer-progress");
let startButton = document.getElementById("start-button");
let moveButton = document.getElementById("move-button");
let gameStatus = document.getElementById("game-status");

let userPosition = 0;
let computerPosition = 0;
let raceLength = 1000;  // The length of the track in pixels
let gameInterval;
let gameRunning = false;

// Start the game
startButton.addEventListener("click", startGame);

// Move the user car when the button is clicked
moveButton.addEventListener("click", () => {
    if (gameRunning) {
        moveUser();
    }
});

// Start the game, reset positions, and move the computer automatically
function startGame() {
    resetGame();
    gameRunning = true;
    gameStatus.textContent = "Race has started! Click 'Move Forward' to race!";
    gameInterval = setInterval(moveComputer, 100);  // Move the computer every 100ms
}

// Reset the game positions and progress bars
function resetGame() {
    userPosition = 0;
    computerPosition = 0;
    userCar.style.left = userPosition + "px";
    computerCar.style.left = computerPosition + "px";
    userProgressBar.style.width = "0%";
    computerProgressBar.style.width = "0%";
    gameStatus.textContent = "Press Start to Begin the Race!";
    clearInterval(gameInterval);
    gameRunning = false;
}

// Move the user's car and update their progress
function moveUser() {
    userPosition += 50;  // Increase user position by 50px each move
    updatePosition(userCar, userPosition);
    updateProgress(userProgressBar, userPosition);
    checkWinner();
}

// Move the computer's car and update its progress
function moveComputer() {
    computerPosition += 40;  // Computer moves slower (40px)
    updatePosition(computerCar, computerPosition);
    updateProgress(computerProgressBar, computerPosition);
    checkWinner();
}

// Update the car's position on the track
function updatePosition(car, position) {
    car.style.left = position + "px";
}

// Update the progress bar based on position
function updateProgress(progressBar, position) {
    let progress = (position / raceLength) * 100;
    progressBar.style.width = progress + "%";
}

// Check if either player has reached the finish line
function checkWinner() {
    if (userPosition >= raceLength) {
        endGame("Player (You) Wins!");
    } else if (computerPosition >= raceLength) {
        endGame("Computer Wins!");
    }
}

// End the game, stop the computer, and declare the winner
function endGame(winnerText) {
    gameRunning = false;
    clearInterval(gameInterval);
    gameStatus.textContent = winnerText;
}
