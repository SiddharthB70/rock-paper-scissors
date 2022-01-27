function hover(){
    this.removeEventListener("click",hover);
    this.removeEventListener("mouseenter",scaleCard);
    this.addEventListener("mouseleave",returnScale);
    this.removeAttribute("style");
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
                    card.addEventListener("click",getPlayerCard);
                    card.addEventListener("mouseenter",scaleCard);
                    card.addEventListener("mouseleave",returnScale);
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
    const playerCards = document.querySelector(".cards");
    playerCards.removeEventListener("mouseenter",splitCards);
    playerCards.removeEventListener("mouseleave",joinCards);
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card){
        card.removeEventListener("click",getPlayerCard);
        card.removeEventListener("mouseenter",scaleCard);
        card.removeEventListener("mouseleave",returnScale);
        card.removeAttribute("style");
    })
    pickComputerCard();
    setTimeout(rotateCard,1000);
}

function scaleCard(){
    if(this.id == "button")
        scale = 1.3;
    else
        scale = 1.1;
    this.setAttribute("style",`transform: scale(${scale})`);
}

function returnScale(){
    this.removeAttribute("style");
}

function start(playerTries = 5,computerTries = 5){
    const startButton = document.getElementById("button");
    if(playerTries != 0 && computerTries != 0){
        startButton.textContent = "START";
        startButton.addEventListener("mouseenter",scaleCard);
        startButton.addEventListener("mouseleave",returnScale);
        startButton.addEventListener("click",hover);
    }
}

function pickComputerCard(){
    let cardNo = random();
    const computerCards = document.querySelector(".computer.cards");
    (computerCards.children)[cardNo].id = "computer-card-back";

    let cardValue = random();
    const compCard = document.createElement("img");
    switch(cardValue){
        case 0: compCard.src = "img/rock.png";
                break;
        case 1: compCard.src = "img/paper.png";
                break;
        case 2: compCard.src = "img/scissor.png";
                break;
    }
    computerCards.appendChild(compCard);
    compCard.classList.add("card");
    compCard.id ="computer-card";
    setTimeout(rotateFront,1500);
}

function rotateCard(){
    const compBack = document.getElementById("computer-card-back");
    compBack.classList.add("back-rotate");
}

function rotateFront(){
    const compCard = document.getElementById("computer-card");
    compCard.classList.add("front-rotate");
}

function random(){
    let check = Math.random()*3;
    return Math.floor(check);
}

start();