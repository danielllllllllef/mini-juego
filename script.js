// script.js
let score = 0;
let sebastian = document.getElementById('sebastian');
let gameContainer = document.getElementById('gameContainer');
let scoreBox = document.getElementById('score');
let resetBtn = document.getElementById('resetBtn');
let gameInterval;
let foodInterval;

// Función para iniciar el juego
function startGame() {
    gameInterval = setInterval(createFood, 1000);
    foodInterval = setInterval(moveFood, 30);
}

// Función para crear un elemento de comida
function createFood() {
    let food = document.createElement('div');
    food.className = 'food';
    food.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
    gameContainer.appendChild(food);
}

// Función para mover los elementos de comida
function moveFood() {
    let foods = document.getElementsByClassName('food');
    for (let food of foods) {
        let topPos = food.offsetTop;
        if (topPos >= gameContainer.clientHeight - sebastian.offsetHeight && isColliding(food, sebastian)) {
            score++;
            scoreBox.textContent = score;
            food.remove();
        } else if (topPos > gameContainer.clientHeight) {
            food.remove();
        } else {
            food.style.top = `${topPos + 5}px`;
        }
    }
}

// Función para verificar colisión
function isColliding(food, sebastian) {
    let foodRect = food.getBoundingClientRect();
    let sebastianRect = sebastian.getBoundingClientRect();
    return !(
        foodRect.top > sebastianRect.bottom ||
        foodRect.bottom < sebastianRect.top ||
        foodRect.left > sebastianRect.right ||
        foodRect.right < sebastianRect.left
    );
}

// Función para reiniciar el juego
function resetGame() {
    clearInterval(gameInterval);
    clearInterval(foodInterval);
    document.querySelectorAll('.food').forEach(food => food.remove());
    score = 0;
    scoreBox.textContent = score;
    sebastian.style.left = 'calc(50% - 25px)';
    startGame();
}

// Función para mover a Sebastián
document.addEventListener('keydown', (e) => {
    let leftPos = sebastian.offsetLeft;
    if (e.key === 'ArrowLeft' && leftPos > 0) {
        sebastian.style.left = `${leftPos - 20}px`;
    } else if (e.key === 'ArrowRight' && leftPos < gameContainer.clientWidth - sebastian.clientWidth) {
        sebastian.style.left = `${leftPos + 20}px`;
    }
});

// Listener para el botón de reinicio
resetBtn.addEventListener('click', resetGame);

// Iniciar el juego
startGame();
