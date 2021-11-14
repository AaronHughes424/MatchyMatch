window.addEventListener('load', function () {

    // when the page loads the user will be presented with a game menu with buttons
    // when the user clicks on the play button the game menu will be hidden and the
    // game menu will be shown

    const gameMenu = document.getElementById('game-menu');
    const playButton = document.getElementById('play-button');

    const rulesWindow = document.getElementById('rules-window');
    const rulesButton = document.getElementById('rules-button');

    const menuButton = document.getElementById('menu-button');

    const cardGame = document.getElementById('card-game')
    const exitButton = document.getElementById('exit-button')
    const cards = document.querySelectorAll('.card');

    let flippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    playButton.addEventListener('click', () => {
        gameMenu.style.display = 'none';
        cardGame.style.display = 'block';
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

    exitButton.addEventListener('click', () => {
        gameMenu.style.removeProperty('display');
        cardGame.style.removeProperty('display');
    })

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
        } else {
            flippedCard = false;
            secondCard = this;
            checkMatch();
        }
    }

    function checkMatch() {
        if (firstCard.dataset.compare === secondCard.dataset.compare) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard()
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockBoard = false;
        }, 1500);
    }

    function resetBoard() {
        [flipCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function randomise() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();
    cards.forEach(card => card.addEventListener('click', flipCard));

});