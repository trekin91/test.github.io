let cube = document.getElementById("cube");
let gameArea = document.getElementById("gameArea");
let posX = 0, posY = 0;

// Fonction pour mettre à jour la position du cube
function updatePosition(newX, newY) {
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > gameArea.offsetWidth - cube.offsetWidth) newX = gameArea.offsetWidth - cube.offsetWidth;
    if (newY > gameArea.offsetHeight - cube.offsetHeight) newY = gameArea.offsetHeight - cube.offsetHeight;

    posX = newX;
    posY = newY;

    cube.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Événements tactiles
cube.addEventListener('touchmove', function(e) {
    let touchLocation = e.targetTouches[0];
    let relativeX = touchLocation.pageX - gameArea.offsetLeft - cube.offsetWidth / 2;
    let relativeY = touchLocation.pageY - gameArea.offsetTop - cube.offsetHeight / 2;
    updatePosition(relativeX, relativeY);
    e.preventDefault();
});

// Événements clavier pour le support sur ordinateur
document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp': posY -= 10; break;
        case 'ArrowDown': posY += 10; break;
        case 'ArrowLeft': posX -= 10; break;
        case 'ArrowRight': posX += 10; break;
    }
    updatePosition(posX, posY);
});
