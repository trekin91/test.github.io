let cube = document.getElementById("cube");
let gameArea = document.getElementById("gameArea");

function getTouchPos(touchEvent) {
    if (touchEvent.touches) {
        if (touchEvent.touches.length > 0) {
            let x = touchEvent.touches[0].clientX;
            let y = touchEvent.touches[0].clientY;
            return { x, y };
        }
    }
    return null;
}

function updatePosition(touchEvent) {
    let touchPos = getTouchPos(touchEvent);
    if (touchPos) {
        let gameAreaRect = gameArea.getBoundingClientRect();
        let newX = touchPos.x - gameAreaRect.left - cube.offsetWidth / 2;
        let newY = touchPos.y - gameAreaRect.top - cube.offsetHeight / 2;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > gameArea.offsetWidth - cube.offsetWidth) newX = gameArea.offsetWidth - cube.offsetWidth;
        if (newY > gameArea.offsetHeight - cube.offsetHeight) newY = gameArea.offsetHeight - cube.offsetHeight;

        cube.style.left = newX + 'px';
        cube.style.top = newY + 'px';
    }
}

gameArea.addEventListener('touchstart', updatePosition);
gameArea.addEventListener('touchmove', function(e) {
    updatePosition(e);
    e.preventDefault(); // Empêche le scrolling par défaut lors du toucher
});
