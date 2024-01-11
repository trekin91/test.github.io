const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
let score = 0;

const DINO_SIZE = 100, COLLECTIBLE_SIZE = 50, TREE_WIDTH = 100, TREE_HEIGHT = 150;
const MAX_X = gameArea.clientWidth - DINO_SIZE;
const MAX_Y = gameArea.clientHeight - DINO_SIZE;

function createGameObject(className, width, height, backgroundUrl) {
    const element = document.createElement('div');
    element.classList.add(className);
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.background = `url('${backgroundUrl}') no-repeat center center`;
    element.style.backgroundSize = 'contain';
    element.style.position = 'absolute';

    let position = getRandomPosition(width, height);
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;

    gameArea.appendChild(element);
    return element;
}

function getRandomPosition(elementWidth, elementHeight) {
    let position, testElement, isValidPosition = false;
    while (!isValidPosition) {
        position = {
            x: Math.floor(Math.random() * (MAX_X - elementWidth)),
            y: Math.floor(Math.random() * (MAX_Y - elementHeight))
        };
        testElement = { ...position, width: elementWidth, height: elementHeight };
        isValidPosition = !checkElementCollision(testElement);
    }
    return position;
}

function checkElementCollision({ x, y, width, height }) {
    const testRect = { left: x, top: y, right: x + width, bottom: y + height };
    const colliders = gameArea.querySelectorAll('.tree');
    for (let collider of colliders) {
        const rect = collider.getBoundingClientRect();
        if (intersect(testRect, rect)) {
            return true;
        }
    }
    return false;
}

function intersect(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right ||
             rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

// Add event listener for dinosaur movement
gameArea.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touchLocation = event.targetTouches[0];
    moveDinosaur(touchLocation.clientX, touchLocation.clientY);
});

function moveDinosaur(clientX, clientY) {
    const newX = Math.min(Math.max(0, clientX - DINO_SIZE / 2), MAX_X);
    const newY = Math.min(Math.max(0, clientY - DINO_SIZE / 2), MAX_Y);

    if (canMove(newX, newY)) {
        dinosaur.style.left = `${newX}px`;
        dinosaur.style.top = `${newY}px`;
        checkForCollectibles();
    }
}

function canMove(newX, newY) {
    const testRect = { left: newX, top: newY, right: newX + DINO_SIZE, bottom: newY + DINO_SIZE };
    return !checkElementCollision(testRect);
}

function checkForCollectibles() {
    const collectibles = document.querySelectorAll('.collectible');
    collectibles.forEach(collectible => {
        if (intersect(dinosaur.getBoundingClientRect(), collectible.getBoundingClientRect())) {
            collectPoints(collectible);
        }
    });
}

function collectPoints(collectible) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    collectible.remove();
    createGameObject('collectible', COLLECTIBLE_SIZE, COLLECTIBLE_SIZE, 'viande.png');
}

// Initial setup
const dinosaur = createGameObject('dinosaur', DINO_SIZE, DINO_SIZE, 'dino.png');
for (let i = 0; i < 3; i++) {
    createGameObject('tree', TREE_WIDTH, TREE_HEIGHT, 'arbre.png');
    createGameObject('collectible', COLLECTIBLE_SIZE, COLLECTIBLE_SIZE, 'viande.png');
}
