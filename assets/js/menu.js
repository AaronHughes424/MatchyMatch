window.addEventListener('load', function () {

    // when the page loads the user will be presented with a game menu with buttons
    // when the user clicks on the play button the game menu will be hidden and the
    // game menu will be shown

    const gameMenu = document.getElementById('game-menu');
    const playButton = document.getElementById('play-button');

    const rulesWindow = document.getElementById('rules-window');
    const rulesButton = document.getElementById('rules-button');

    const menuButton = document.getElementById('menu-button');

    const cardButtons = document.querySelectorAll('div.card');

    let clickEnabled = true;

    let firstFlippedCard = null;
    let secondFlippedCard = null;

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

    // game function area

    cardButtons.forEach(function (card) {
        card.addEventListener('click', function () {
            flipCard(this);
        });
    });



    function flipCard(card) {
        if (clickEnabled) {
            clickEnabled = false;
            if (firstFlippedCard == null) {
                firstFlippedCard = card;
            } else {
                if (secondFlippedCard == null) {
                    secondFlippedCard = card;
                    console.log('Call Compare cards function');
                    firstFlippedCard = null;
                    secondFlippedCard = null;
                }
            }
            setTimeout(function () {
                card.classList.remove('card-back');
                card.classList.add('card-front');
                clickEnabled = true;
            }, 500);
        }
    }
});