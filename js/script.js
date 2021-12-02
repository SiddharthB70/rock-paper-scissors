function game(){
    for(let i=0; i<5; i++)
        {
            let playerSelection = prompt("Rock, Paper or Scissors");
            let computerSelection = computerPlay();
            decideResult(playerSelection,computerSelection);
        }
}