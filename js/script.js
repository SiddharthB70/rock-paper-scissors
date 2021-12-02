function randInt(n){
    return Math.floor(Math.random()*n);
}

function computerPlay(){
    let compSelection = randInt(3);
    switch(compSelection){
        case 0: return "Rock";
        case 1: return "Paper";
        case 2: return "Scissor";
    }
}

function game(){
    for(let i=0; i<5; i++)
        {
            let playerSelection = prompt("Rock, Paper or Scissors");
            let computerSelection = computerPlay();
            console.log(computerSelection);
            decideResult(playerSelection,computerSelection);
        }
}

game();