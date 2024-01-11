let dinosaur = document.getElementById("dinosaur");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;

function getRandomPosition(elementWidth, elementHeight) {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (gameArea.clientWidth - elementWidth)),
            y: Math.floor(Math.random() * (gameArea.clientHeight - elementHeight))
        };
    } while (checkElementCollision(position.x, position.y, elementWidth, elementHeight));
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

function checkElementCollision(x, y, width, height) {
    let testElement = { left: x, top: y, right: x + width, bottom: y + height };
    let trees = document.querySelectorAll('.tree');

    for (let tree of trees) {
        let treeRect = tree.getBoundingClientRect();
        if (!(testElement.right < treeRect.left || testElement.left > treeRect.right || 
              testElement.bottom < treeRect.top || testElement.top > treeRect.bottom)) {
            return true;
        }
    }
    return false;
}

function moveDinosaur(event) {
    event.preventDefault();
    let touchLocation = event.targetTouches[0];
    let gameAreaRect = gameArea.getBoundingClientRect();
    let newX = touchLocation.clientX - gameAreaRect.left - dinosaur.offsetWidth / 2;
    let newY = touchLocation.clientY - gameAreaRect.top - dinosaur.offsetHeight / 2;

    if (!checkElementCollision(newX, newY, 100, 100)) {
        dinosaur.style.left = `${newX}px`;
        dinosaur.style.top = `${newY}px`;
    }

    document.querySelectorAll('.collectible').forEach(collectible => {
        let collectibleRect = collectible.getBoundingClientRect();
        let dinosaurRect = dinosaur.getBoundingClientRect();

        if (!(collectibleRect.right < dinosaurRect.left || collectibleRect.left > dinosaurRect.right || 
              collectibleRect.bottom < dinosaurRect.top || collectibleRect.top > dinosaurRect.bottom)) {
            collectible.remove();
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            createCollectible();
        }
    });
}

gameArea.addEventListener('touchmove', moveDinosaur);

// Créez un ou plusieurs arbres au chargement du jeu
createTree(); // Répétez pour créer plus d'arbres
for (let i = 0; i < 3; i++) {
    createCollectible();
}
