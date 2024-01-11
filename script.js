let cube = document.getElementById("cube");
let gameArea = document.getElementById("gameArea");

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
}

gameArea.addEventListener('touchmove', moveCube);
