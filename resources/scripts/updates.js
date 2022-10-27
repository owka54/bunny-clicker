let rotation = 0;
const angle = 90;
const logo = document.getElementById('logo');

function logoSpin() {
    rotation = (rotation + angle) % 360; 
    logo.style.transform = `rotate(${rotation}deg)`;
}