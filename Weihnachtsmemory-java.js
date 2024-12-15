const images = ['🎄', '🎅', '❄️', '⛄', '🎁', '🔔', '🦌', '⭐'];

let cards, memoryGrid, counterElement, firstCard, secondCard, lockBoard, moves, matchedPairs;

function initializeGame() {
    cards = [...images, ...images];
    cards.sort(() => Math.random() - 0.5);

    memoryGrid = document.getElementById('memoryGrid');
    counterElement = document.getElementById('counter');
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;

    memoryGrid.innerHTML = '';
    document.getElementById('newGameButton').style.display = 'none';
    updateCounter();

    cards.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<span>${icon}</span>`;
        memoryGrid.appendChild(card);

        card.addEventListener('click', () => {
            if (lockBoard || card.classList.contains('flipped')) return;

            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;
            moves++;
            updateCounter();
            checkForMatch();
        });
    });
}

function updateCounter() {
    counterElement.textContent = `Züge: ${moves}`;
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === images.length) {
            document.getElementById('newGameButton').style.display = 'block';
            displayRanking();
        }
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function displayRanking() {
    let rankingText = "";
    if (moves <= 18) {
        rankingText = "🏆 Gedächtnis-Champion – Fast perfekt!";
    } else if (moves <= 26) {
        rankingText = "🌟 Merkweltmeister – Starke Leistung!";
    } else if (moves <= 35) {
        rankingText = "💪 Guter Gedächtnistrainer – Solide Runde!";
    } else if (moves <= 45) {
        rankingText = "👍 Zuverlässiger Finder – Nicht schlecht!";
    } else {
        rankingText = "🌱 Gedächtnis-Neuling – Übung macht den Meister!";
    }

    document.getElementById("ranking").innerText = rankingText;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startNewGame() {
    initializeGame();
}

initializeGame();
