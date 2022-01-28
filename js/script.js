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
    button.removeEventListener("click",blockStartButton);
    button.removeEventListener("mouseenter",scaleUp);
    button.removeEventListener("mouseleave",scaleDown);
    button.removeEventListener("click",restart);
    button.removeAttribute("style");
}

function start(){
    printScores();
    const startButton = document.getElementById("start");
    startButton.classList.remove("blocked");
    startButton.textContent = "START";
    startButton.addEventListener("mouseenter",scaleUp);
    startButton.addEventListener("mouseleave",scaleDown);
    if(!checkGameOver()){
        messagePanel("Press Start to begin the game");
        startButton.addEventListener("click",blockStartButton);
    }
    else   
        startButton.addEventListener("click",restart);
}

function restart(){
    const compCardFront = document.getElementById("computer-card-front");
    const playerCard = document.getElementById("player-card");
    compCardFront.classList.remove("winner","loser");
    playerCard.classList.remove("winner","loser");
    setTimeout(function(){
        resetBoard();
        playerTries = 5;
        computerTries = 5;
        blockStartButton();
        printScores();
    },500)
}

function blockStartButton(){
    const button = document.querySelector(".button");
    disableButton(button);
    hoverPlayerCards();
}

function hoverPlayerCards(){
    messagePanel("Hover over the cards to pick a card")
    const playerCards = document.querySelector(".cards");
    playerCards.addEventListener("mouseenter",splitCards);
    playerCards.addEventListener("mouseleave",joinCards)
}

function splitCards(){
    messagePanel("Click to choose card")
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
    messagePanel("Hover over the cards to pick a card")
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
    //Below function runs only after the comparison of cards
    setTimeout(function(){
        if(!checkGameOver())
            setTimeout(resetBoard,1500);
        else
            setTimeout(getWinner,1000);
    },2000)
    
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
    let message, checkMatchUp, playerCard = returnCard(cards[0]),compCard = returnCard(cards[1]);
    for(let matchup of matchups){
        checkMatchUp = matchup.slice();
        if(cards[0] == cards[1]){
            message = "It's a tie!";
            break;
        }
        else if(cards.toString() == checkMatchUp.toString()){
            message = `Player Wins! ${playerCard} beats ${compCard}!`;
            computerTries--;
            break;
        }
        else if(cards.toString() == (checkMatchUp.reverse()).toString()){
            message = `Computer Wins! ${compCard} beats ${playerCard}!`;
            playerTries--;
            break;
        }
    }
    printScores();
    messagePanel(message);
}

function printScores(){
    const triesCounter = document.querySelectorAll(".tries");
    triesCounter[0].textContent = `Tries: ${playerTries}`;
    triesCounter[1].textContent = `Tries: ${computerTries}`; 
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
        compCardFront.removeAttribute("data-card");
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
    setTimeout(hoverPlayerCards,3000);
}

function messagePanel(messageText){
    const messagePanel = document.getElementById("message-panel");
    messagePanel.textContent = messageText;
}

function returnCard(card){
    if(card == "R")
        return "Rock";
    else if(card == "P")
        return "Paper";
    else if(card == "S")
        return "Scissor";
}

function checkGameOver(){
    if (playerTries == 0 || computerTries == 0)
        return true;
    else 
        return false;
}

function getWinner(){
    let message;
    const playerCard = document.getElementById("player-card");
    const compCard = document.getElementById("computer-card-front");
    if(playerTries == 0){
        message = "Computer wins the game!";
        playerCard.classList.add("loser");
        compCard.classList.add("winner");
    }
    else{
        message = "Player wins the game!";
        playerCard.classList.add("winner");
        compCard.classList.add("loser");
    }

    message += " Press Start to begin another game";
    messagePanel(message);
    start();
}

start();