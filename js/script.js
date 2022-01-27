function scaleUp(){
    if(this.id == "button")
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

function startGame(e){
    removeCardHover();
    getPlayerCard(e);
    getComputerCard();
}

function start(playerTries = 5,computerTries = 5){
    const startButton = document.getElementById("button");
    if(playerTries != 0 && computerTries != 0){
        startButton.textContent = "START";
        startButton.addEventListener("mouseenter",scaleUp);
        startButton.addEventListener("mouseleave",scaleDown);
        startButton.addEventListener("click",hoverPlayerCards);
    }
}

function disableButton(button){
    button.removeEventListener("click",hoverPlayerCards);
    button.removeEventListener("mouseenter",scaleUp);
    button.removeEventListener("mouseleave",scaleDown);
    button.removeAttribute("style");
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

function getPlayerCard(e){
    e.target.id = "player-card";
    e.stopImmediatePropagation();
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

start();