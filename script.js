let dinosaur = document.getElementById("dinosaur");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;

function getRandomPosition(elementWidth, elementHeight) {
    let position;
    let isValidPosition = false;
    while (!isValidPosition) {
        position = {
            x: Math.floor(Math.random() * (gameArea.clientWidth - elementWidth)),
            y: Math.floor(Math.random() * (gameArea.clientHeight - elementHeight))
        };
        let testElement = document.createElement('div');
        testElement.style.left = `${position.x}px`;
        testElement.style.top = `${position.y}px`;
        testElement.style.width = `${elementWidth}px`;
        testElement.style.height = `${elementHeight}px`;
        testElement.style.position = 'absolute';
        
        gameArea.appendChild(testElement);
        isValidPosition = !checkElementCollision(testElement);
        gameArea.removeChild(testElement);
    }
    return position;
}

function createCollectible() {
    let collectible = document.createElement('div');
    collectible.classList.add('collectible');
    let position = getRandomPosition(50, 50);
    collectible.style.left = `${position.x}px`;
    collectible.style.top = `${position.y}px`;
    gameArea.appendChild(collectible);
}

function createTree() {
    let tree = document.createElement('div');
    tree.classList.add('tree');
    let position = getRandomPosition(100, 150);
    tree.style.left = `${position.x}px`;
    tree.style.top = `${position.y}px`;
    gameArea.appendChild(tree);
}

function checkElementCollision(element) {
    let rect1 = element.getBoundingClientRect();
    let colliders = gameArea.querySelectorAll('.tree');
    for (let collider of colliders) {
        let rect2 = collider.getBoundingClientRect();
        if (!(rect1.right < rect2.left || rect1.left > rect2.right ||
              rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
            return true;
        }
    }
    return false;
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

function canMove(newX, newY) {
    let testDinosaur = dinosaur.cloneNode();
    testDinosaur.style.left = `${newX}px`;
    testDinosaur.style.top = `${newY}px`;
    gameArea.appendChild(testDinosaur);
    let canMove = !checkElementCollision(testDinosaur);
    gameArea.removeChild(testDinosaur);
    return canMove;
}

function moveDinosaur(event) {
    event.preventDefault();
    let touchLocation = event.targetTouches[0];
    let gameAreaRect = gameArea.getBoundingClientRect();
    let newX = touchLocation.clientX - gameAreaRect.left - dinosaur.offsetWidth / 2;
    let newY = touchLocation.clientY - gameAreaRect.top - dinosaur.offsetHeight / 2;

    newX = Math.max(0, Math.min(newX, gameArea.offsetWidth - dinosaur.offsetWidth));
    newY = Math.max(0, Math.min(newY, gameArea.offsetHeight - dinosaur.offsetHeight));

    if (canMove(newX, newY)) {
        dinosaur.style.left = `${newX}px`;
        dinosaur.style.top = `${newY}px`;
    }

    document.querySelectorAll('.collectible').forEach(collectible => checkCollision(collectible));
}

gameArea.addEventListener('touchmove', moveDinosaur);

// Initial setup
createTree(); // Create trees as obstacles
for (let i = 0; i < 3; i++) {
    createCollectible(); // Create initial collectibles
}
