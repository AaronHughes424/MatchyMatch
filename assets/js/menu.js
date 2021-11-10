// when the page loads the user will be presented with a game menu with buttons
// when the user clicks on the play button the game menu will be hidden and the
// game menu will be shown

const gameMenu = document.getElementById('game-menu');
const playButton = document.getElementById('play-button');

const rulesWindow = document.getElementById('rules-window');
const rulesButton = document.getElementById('rules-button');

const menuButton = document.getElementById('menu-button');

playButton.addEventListener('click', () => {
    gameMenu.style.display = 'none';
})

rulesButton.addEventListener('click', () => {
    gameMenu.style.display = 'none';
    rulesWindow.style.display = 'flex';
})


menuButton.addEventListener('click', () => {
    rulesWindow.style.removeProperty('display');
    gameMenu.style.removeProperty('display');
})