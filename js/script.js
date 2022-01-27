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
    getComputerCard();
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

function getComputerCard(){
    let cardNo = random();
    const computerCards = document.querySelectorAll(".computer .card");
    computerCards[cardNo].id = "computer-card";
}

function random(){
    return Math.round(Math.random()*3);
}

start();