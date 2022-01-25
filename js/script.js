function hoverCards(){
    const playerCards = document.querySelector(".cards");
    playerCards.addEventListener("mouseenter",splitCards);
    playerCards.addEventListener("mouseleave",joinCards);
}

function splitCards(){
    const cards = Array.from(this.children);
    this.classList.add("cards-hover");
    cards.forEach(function(card){
        card.classList.add("hover");
    })
}

function joinCards(){
    const cards = Array.from(this.children);
    this.classList.remove("cards-hover");
    cards.forEach(function(card){
        card.classList.remove("hover");
    })
}

hoverCards();
