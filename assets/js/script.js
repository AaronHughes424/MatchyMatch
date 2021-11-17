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

    const winMenu = document.getElementById('win')
    const menuButton2 = document.getElementById('menu-button2')
    const playAgain = document.getElementById('play-button2')

    let flippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    playButton.addEventListener('click', () => {
        gameMenu.style.display = 'none';
        cardGame.style.display = 'flex';
        exitButton.style.display = 'flex';

        removeMatched();
        startFunction();
        shuffle();
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
        exitButton.style.removeProperty('display');
        removeMatched();
        resetCards();
    });

    menuButton2.addEventListener('click', () => {
        gameMenu.style.removeProperty('display');
        winMenu.style.removeProperty('display')
        exitButton.style.removeProperty('display');

        resetCards();
    });


    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;

            return;
        }
        secondCard = this;
        checkMatch();

    }

    function checkMatch() {
        let matches = firstCard.dataset.compare === secondCard.dataset.compare;
        matches ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        checkGameOver();
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [flippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    };

    function resetCards() {
        for (i = 0; i < cards.length; i++) {
            cards[i].classList.remove('flip');
        };
    }

    function startFunction() {
        cards.forEach(card => card.addEventListener('click', flipCard));
    }

    function checkGameOver() {
        let matched = 0;
        cards.forEach(card => {
            if (card.classList.value.includes('matched')) {
                matched++;
            }
        });
        if (matched >= cards.length) {
            setTimeout(() => {
                menuLoad();
            }, 1000)
        };
    };

    function menuLoad() {
        winMenu.style.display = 'flex';
        cardGame.style.removeProperty('display')
        exitButton.style.removeProperty('display');
        resetBoard();
    };

    function removeMatched() {
        for (i = 0; i < cards.length; i++) {
            cards[i].classList.remove('matched');
        };
    };
});