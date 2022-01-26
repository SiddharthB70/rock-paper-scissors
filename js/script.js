function hover(){
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
}

function scaleCard(){
    this.setAttribute("style","transform: scale(1.1)")
}

function returnScale(){
    this.removeAttribute("style");
}

hover();