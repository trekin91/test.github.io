let cube = document.getElementById("cube");
let gameArea = document.getElementById("gameArea");
let posX = 0, posY = 0;

document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            posY -= 10;
            break;
        case 'ArrowDown':
            posY += 10;
            break;
        case 'ArrowLeft':
            posX -= 10;
            break;
        case 'ArrowRight':
            posX += 10;
            break;
    }

    if (posX < 0) posX = 0;
    if (posY < 0) posY = 0;
    if (posX > gameArea.offsetWidth - cube.offsetWidth) posX = gameArea.offsetWidth - cube.offsetWidth;
    if (posY > gameArea.offsetHeight - cube.offsetHeight) posY = gameArea.offsetHeight - cube.offsetHeight;

    cube.style.transform = `translate(${posX}px, ${posY}px)`;
});
