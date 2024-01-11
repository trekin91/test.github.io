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
        testElement.style.left = position.x + 'px';
        testElement.style.top = position.y + 'px';
        testElement.style.width = elementWidth + 'px';
        testElement.style.height = elementHeight + 'px';
        testElement.style.position = 'absolute';
        
        gameArea.appendChild(testElement);
        isValidPosition = !checkElementCollision(testElement);
        gameArea.removeChild(testElement);
    }
    return position;
}

// Vérifiez si l'élément entre en collision avec un autre élément
function checkElementCollision(element) {
    let rect1 = element.getBoundingClientRect();
    let colliders = gameArea.querySelectorAll('.tree, .collectible');
    for (let i = 0; i < colliders.length; i++) {
        let rect2 = colliders[i].getBoundingClientRect();
        if (!(rect1.right < rect2.left || rect1.left > rect2.right ||
              rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
            return true; // Collision détectée
        }
    }
    return false; // Pas de collision
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

function canMove(newX, newY) {
    let testDinosaur = dinosaur.cloneNode();
    testDinosaur.style.left = newX + 'px';
    testDinosaur.style.top = newY + 'px';
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

    // S'assurer que le dinosaure reste dans la zone de jeu
    newX = Math.max(0, Math.min(newX, gameArea.offsetWidth - dinosaur.offsetWidth));
    newY = Math.max(0, Math.min(newY, gameArea.offsetHeight - dinosaur.offsetHeight));

    // Vérifiez si le dinosaure peut se déplacer à cette position sans collision
    if (canMove(newX, newY)) {
        dinosaur.style.left = `${newX}px`;
        dinosaur.style.top = `${newY}px`;
    }

    document.querySelectorAll('.collectible').forEach(collectible => checkCollision(collectible));
}

// Create initial collectibles
for (let i = 0; i < 3; i++) {
    createCollectible();
}

function createTree() {
    let tree = document.createElement('div');
    tree.classList.add('tree');
    let position = getRandomPosition(100, 150); // Taille de l'arbre
    tree.style.left = position.x + 'px';
    tree.style.top = position.y + 'px';
    gameArea.appendChild(tree);
}

createTree();
createTree();

gameArea.addEventListener('touchmove', moveDinosaur);
