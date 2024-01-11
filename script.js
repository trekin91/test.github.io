let dinosaur = document.getElementById("dinosaur");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;

function getRandomPosition(elementWidth, elementHeight) {
    let maxX = gameArea.clientWidth - elementWidth;
    let maxY = gameArea.clientHeight - elementHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
}

function createCollectible() {
    let collectible = document.createElement('div');
    collectible.classList.add('collectible');
    let position = getRandomPosition(50, 50); // Taille du morceau de viande
    collectible.style.left = position.x + 'px';
    collectible.style.top = position.y + 'px';
    gameArea.appendChild(collectible);
}

function checkCollision(collectible) {
    let dinosaurRect = dinosaur.getBoundingClientRect();
    let collectibleRect = collectible.getBoundingClientRect();

    if (!(dinosaurRect.right < collectibleRect.left ||
          dinosaurRect.left > collectibleRect.right ||
          dinosaurRect.bottom < collectibleRect.top ||
          dinosaurRect.top > collectibleRect.bottom)) {
        gameArea.removeChild(collectible);
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        createCollectible();
    }
}

function moveDinosaur(event) {
    event.preventDefault();
    let touchLocation = event.targetTouches[0];
    let gameAreaRect = gameArea.getBoundingClientRect();
    let newX = touchLocation.clientX - gameAreaRect.left - dinosaur.offsetWidth / 2;
    let newY = touchLocation.clientY - gameAreaRect.top - dinosaur.offsetHeight / 2;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > gameArea.offsetWidth - dinosaur.offsetWidth) newX = gameArea.offsetWidth - dinosaur.offsetWidth;
    if (newY > gameArea.offsetHeight - dinosaur.offsetHeight) newY = gameArea.offsetHeight - dinosaur.offsetHeight;

    dinosaur.style.left = `${newX}px`;
    dinosaur.style.top = `${newY}px`;

    document.querySelectorAll('.collectible').forEach(collectible => checkCollision(collectible));
}

// Create initial collectibles
for (let i = 0; i < 3; i++) {
    createCollectible();
}

gameArea.addEventListener('touchmove', moveDinosaur);
