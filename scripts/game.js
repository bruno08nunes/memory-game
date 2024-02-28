const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");
let timer;

const characters = [
    "beth",
    "jerry",
    "jessica",
    "morty",
    "pessoa-passaro",
    "pickle-rick",
    "rick",
    "summer",
    "meeseeks",
    "scroopy",
];

const createElement = (tag, ...className) => {
    const element = document.createElement(tag);
    element.classList.add(...className);
    return element;
};

let firstCard = "";
let secondCard = "";

const alertWin = (winner) => {
    const modal = document.querySelector(".modal-win");
    const spanPlayer = document.querySelector(".win-player");
    const spanTime = document.querySelector(".win-time");
    
    modal.style.display = "flex";
    spanPlayer.textContent = winner.player;
    spanTime.textContent = winner.currentTime;
};

const setWinners = (winner) => {
    const winners = JSON.parse(localStorage.getItem("MMR_GM-winners")) ?? [];
    const newWinners = [...winners, winner];
    const winnersSorted = newWinners.sort(
        ({ currentTime: currentTime1 }, { currentTime: currentTime2 }) =>
        currentTime1 - currentTime2
        );
        localStorage.setItem("MMR_GM-winners", JSON.stringify(winnersSorted));
    };
    
    const checkEndGame = () => {
        const currentTime = spanTimer.textContent;
        const player = spanPlayer.textContent;
        const winner = { player, currentTime };
        const disabledCards = document.querySelectorAll(".disabled-card");
        
        if (disabledCards.length === 20) {
            clearInterval(timer);
            setWinners(winner);
            alertWin(winner);
        }
    };
    
    const checkCard = () => {
        const firstCharacter = firstCard.getAttribute("data-character");
        const secondCharacter = secondCard.getAttribute("data-character");
        
        if (firstCharacter === secondCharacter) {
            setTimeout(() => {
                firstCard.classList.add("disabled-card");
                secondCard.classList.add("disabled-card");
                firstCard = "";
                secondCard = "";
                
                checkEndGame();
            }, 400);
        } else {
            setTimeout(() => {
                firstCard.classList.remove("reveal-card");
                secondCard.classList.remove("reveal-card");
                
                firstCard = "";
                secondCard = "";
            }, 900);
        }
    };
    
    const revealCard = ({ target }) => {
        const card = target.parentNode;
        if (card.classList.contains("reveal-card")) {
            return;
        }
        if (firstCard === "") {
            card.classList.add("reveal-card");
            firstCard = card;
            return;
        }
        if (secondCard === "") {
            card.classList.add("reveal-card");
            secondCard = card;
            checkCard();
        }
    };
    
    const createCard = (character) => {
        const card = createElement("div", "card");
        const front = createElement("div", "front", "face");
        const back = createElement("div", "back", "face");
        
        front.style.backgroundImage = `url("../assets/${character}.png")`;
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);
    
    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    timer = setInterval(() => {
        const currentTime = +spanTimer.textContent + 1;
        spanTimer.textContent = currentTime.toString().padStart(2, 0);
    }, 1000);
};

const resetGame = (e) => {
    e.preventDefault();
    const cards = [...document.querySelectorAll(".card")];
    cards.sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
        firstCard = "";
        secondCard = "";
        card.classList.remove("reveal-card");
        card.classList.remove("disabled-card");
        grid.appendChild(card);
    });
    spanTimer.textContent = "00";
    startTimer();
    const modal = document.querySelector(".modal-win");
    modal.style.display = "none";
};
const buttonResetGame = document.querySelector("#reset-game");
buttonResetGame.addEventListener("click", resetGame);

window.onload = () => {
    spanPlayer.textContent = localStorage.getItem("MMR_GM-player");
    startTimer();
    loadGame();
};