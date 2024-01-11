let cube = document.getElementById("dinosaur");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;

// Function to generate a random position within the gameArea
function getRandomPosition() {
    let maxX = gameArea.clientWidth - 20; // Width of collectible is 20px
    let maxY = gameArea.clientHeight - 20;
    let randomX = Math.floor(Math.random() * (maxX - 50));
    let randomY = Math.floor(Math.random() * (maxY - 50));
    return { x: randomX, y: randomY };
}

// Function to create a new collectible
function createCollectible() {
    let collectible = document.createElement('div');
    collectible.classList.add('collectible');
    let position = getRandomPosition();
    collectible.style.left = position.x + 'px';
    collectible.style.top = position.y + 'px';
    gameArea.appendChild(collectible);
    collectible.addEventListener('touchmove', moveCube);
}

// Initial creation of three collectibles
for (let i = 0; i < 3; i++) {
    createCollectible();
}

function checkCollision(collectible) {
    let cubeRect = cube.getBoundingClientRect();
    let collectibleRect = collectible.getBoundingClientRect();

    if (!(cubeRect.right < collectibleRect.left ||
          cubeRect.left > collectibleRect.right ||
          cubeRect.bottom < collectibleRect.top ||
          cubeRect.top > collectibleRect.bottom)) {
        // Collision detected
        gameArea.removeChild(collectible);
        score += 10; // Increment score
        scoreDisplay.textContent = `Score: ${score}`;
        createCollectible(); // Create a new collectible at a random position
    }
}

function moveCube(event) {
    event.preventDefault();
    let touchLocation = event.targetTouches[0];
    let gameAreaRect = gameArea.getBoundingClientRect();
    let newX = touchLocation.clientX - gameAreaRect.left - cube.offsetWidth / 2;
    let newY = touchLocation.clientY - gameAreaRect.top - cube.offsetHeight / 2;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > gameArea.offsetWidth - cube.offsetWidth) newX = gameArea.offsetWidth - cube.offsetWidth;
    if (newY > gameArea.offsetHeight - cube.offsetHeight) newY = gameArea.offsetHeight - cube.offsetHeight;

    cube.style.left = `${newX}px`;
    cube.style.top = `${newY}px`;

    // Check for collision with any collectible
    document.querySelectorAll('.collectible').forEach(collectible => checkCollision(collectible));
}

gameArea.addEventListener('touchmove', moveCube);
