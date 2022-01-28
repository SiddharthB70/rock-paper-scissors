let matchups = [["R","S"],["S","P"],["P","R"]];
let playerTries = 5;
let computerTries = 5;


function scaleUp(){
    if(this.classList.contains("start"))
        scale = 1.3;
    else
        scale = 1.1;
    this.setAttribute("style",`transform: scale(${scale})`);
}

function scaleDown(){
    this.removeAttribute("style");
}

function random(){
    let check = Math.random()*3;
    return Math.floor(check);
}

function disableButton(button){
    button.classList.add("blocked");
    button.removeEventListener("click",hoverPlayerCards);
    button.removeEventListener("mouseenter",scaleUp);
    button.removeEventListener("mouseleave",scaleDown);
    button.removeAttribute("style");
}

function start(){
    printScores();
    const startButton = document.getElementById("start");
    startButton.classList.remove("blocked");
    // const resetButton = document.getElementById("reset");
    // resetButton.classList.add("blocked");
    if(playerTries != 0 && computerTries != 0){
        startButton.textContent = "START";
        startButton.addEventListener("mouseenter",scaleUp);
        startButton.addEventListener("mouseleave",scaleDown);
        startButton.addEventListener("click",hoverPlayerCards);
    }
}

function hoverPlayerCards(){
    disableButton(this);
    const playerCards = document.querySelector(".cards");
    playerCards.addEventListener("mouseenter",splitCards);
    playerCards.addEventListener("mouseleave",joinCards)
}

function splitCards(){
    const cardContainers = document.querySelectorAll(".cards");
    cardContainers.forEach(function(container){
        container.classList.add("cards-hover");
        const cards = Array.from(container.children);
        cards.forEach(function(card){
            card.classList.add("hover");
            if(container.classList.contains("player")){
                card.addEventListener("click",startGame);
                card.addEventListener("mouseenter",scaleUp);
                card.addEventListener("mouseleave",scaleDown);
            }
        })
    })
}

function joinCards(){
    const cardContainers = document.querySelectorAll(".cards");
    cardContainers.forEach(function(container){
        container.classList.remove("cards-hover");
        const cards = Array.from(container.children);
        cards.forEach(function(card){
            card.classList.remove("hover");
        }) 
    })
}

function startGame(e){
    removeCardHover();
    getPlayerCard(e);
    getComputerCard();
    setTimeout(getResult,2000);
    setTimeout(resetBoard,3000);
    // setTimeout(getResetButton,2000);
}

function removeCardHover(){
    const playerCards = document.querySelector(".cards");
    playerCards.removeEventListener("mouseenter",splitCards);
    playerCards.removeEventListener("mouseleave",joinCards);
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card){
        card.removeEventListener("click",startGame);
        card.removeEventListener("mouseenter",scaleUp);
        card.removeEventListener("mouseleave",scaleDown);
        card.removeAttribute("style");
    })
}

function getPlayerCard(e){
    e.target.id = "player-card";
    e.stopImmediatePropagation();
}

function getComputerCard(){
    getCompCardBack();
    getCompCardFront();
    setTimeout(rotateCard,1000);
}

function getCompCardBack(){
    let cardNo = random();
    const computerCards = document.querySelector(".computer.cards");
    (computerCards.children)[cardNo].id = "computer-card-back";
}

function getCompCardFront(){
    const computerCards = document.querySelector(".computer.cards");
    let cardValue = random(), card;
    const compCard = document.createElement("img");
    switch(cardValue){
        case 0: compCard.src = "img/rock.png";
                card = "R";
                break;
        case 1: compCard.src = "img/paper.png";
                card = "P";
                break;
        case 2: compCard.src = "img/scissor.png";
                card = "S"
                break;
    }
    compCard.setAttribute("data-card",`${card}`);
    computerCards.appendChild(compCard);
    compCard.classList.add("card");
    compCard.id ="computer-card-front";
}

function rotateCard(){
    const compBack = document.getElementById("computer-card-back");
    const compCard = document.getElementById("computer-card-front");
    compBack.classList.add("back-rotate");
    setTimeout(function(){
        compCard.classList.add("front-rotate");
    },500);
}

function getResult(){
    const playerCard = document.getElementById("player-card");
    const compCard = document.getElementById("computer-card-front");
    compareCards([playerCard.getAttribute("data-card"),compCard.getAttribute("data-card")]);
}

function compareCards(cards){
    let message;
    matchups.forEach(function(matchup){
        if(cards[0] == cards[1]){
            message = "Tie";
            return;
        }
        else if(cards.toString() == matchup.toString()){
            message = "Player Wins";
            computerTries--;
            return;
        }
        else if(cards.toString() == (matchup.reverse()).toString()){
            message = "Computer Wins";
            playerTries--;
            return;
        }
    })
    printScores();
}

function printScores(){
    const triesCounter = document.querySelectorAll(".tries");
    triesCounter[0].textContent = `Tries: ${playerTries}`;
    triesCounter[1].textContent = `Tries: ${computerTries}`; 
}


function getResetButton(){
    const resetButton = document.getElementById("reset");
    resetButton.classList.remove("blocked");
    resetButton.addEventListener("click",resetBoard);
}

function resetBoard(){
    const cardContainers = document.querySelectorAll(".cards");
    const playerCard = document.getElementById("player-card");
    const compCardBack = document.getElementById("computer-card-back");
    const compCardFront = document.getElementById("computer-card-front");
    compCardFront.classList.remove("front-rotate");
    setTimeout(function(){
        compCardBack.classList.remove("back-rotate");
    },500)
    setTimeout(function(){
        cardContainers[1].removeChild(compCardFront);
        playerCard.removeAttribute("id");
        compCardBack.removeAttribute("id");
        compCardFront.removeAttribute("id");
    },1000)
    setTimeout(function(){
        cardContainers.forEach(function(container){
            container.classList.remove("cards-hover");
            let cards = Array.from(container.children);
            cards.forEach(function(card){
                card.classList.remove("hover");
            })
        })
    },2000); 
    setTimeout(start,3000);
}


start();