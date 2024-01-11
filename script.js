let cube = document.getElementById("cube");
let gameArea = document.getElementById("gameArea");
let isMoving = false;

function updatePosition(newX, newY) {
    let gameAreaRect = gameArea.getBoundingClientRect();

    // Convertir newX et newY en position relative à gameArea
    newX -= gameAreaRect.left;
    newY -= gameAreaRect.top;

    // Limiter la position pour rester dans gameArea
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > gameArea.offsetWidth - cube.offsetWidth) newX = gameArea.offsetWidth - cube.offsetWidth;
    if (newY > gameArea.offsetHeight - cube.offsetHeight) newY = gameArea.offsetHeight - cube.offsetHeight;

    // Déplacer le cube
    cube.style.left = newX + 'px';
    cube.style.top = newY + 'px';
}

// Commencer le déplacement
function startMove(e) {
    isMoving = true;
    updatePosition(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
}

// Arrêter le déplacement
function stopMove() {
    isMoving = false;
}

// Mise à jour de la position pendant le mouvement
function move(e) {
    if (isMoving) {
        updatePosition(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
    }
}

// Écouteurs d'événements pour la souris
gameArea.addEventListener('mousedown', startMove);
document.addEventListener('mouseup', stopMove);
document.addEventListener('mousemove', move);

// Écouteurs d'événements pour le toucher
gameArea.addEventListener('touchstart', startMove);
document.addEventListener('touchend', stopMove);
document.addEventListener('touchmove', move);
