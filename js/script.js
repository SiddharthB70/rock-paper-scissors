// function userInput(){
//     let playerSelection;
//     do{
//         playerSelection = prompt("Rock, Paper or Scissor").toUpperCase();
//         console.log(playerSelection);
//     }while(playerSelection!="ROCK" && playerSelection!="PAPER" && playerSelection!="SCISSOR");
//     return playerSelection;
// }

// function randInt(n){
//     return Math.floor(Math.random()*n);
// }

// function computerPlay(){
//     let compSelection = randInt(3);
//     switch(compSelection){
//         case 0: return "Rock";
//         case 1: return "Paper";
//         case 2: return "Scissor";
//     }
// }

// function decideResult(playerSelection,computerSelection){
//     switch(computerSelection){
//         case "Rock": 
//             if(playerSelection=="ROCK")
//                 return "It's a tie!";
//             else if(playerSelection=="PAPER")
//                 return "You win! Paper beats Rock";
//             else if(playerSelection=="SCISSOR")
//                 return "You lose! Rock beats Scissor";
//         case "Paper": 
//             if(playerSelection=="PAPER")
//                 return "It's a tie!";
//             else if(playerSelection=="SCISSOR")
//                 return "You win! Scissor beats Paper";
//             else if(playerSelection=="ROCK")
//                 return "You lose! Paper beats Rock";
//         case "Scissor": 
//             if(playerSelection=="SCISSOR")
//                 return "It's a tie!";
//             else if(playerSelection=="ROCK")
//                 return "You win! Rock beats Scissor";
//             else if(playerSelection=="PAPER")
//                 return "You lose! Scissor beats Paper";
//     }
// }

// function game(){
//     for(let i=0; i<5; i++)
//         {
//             let playerSelection = userInput();
//             let computerSelection = computerPlay();
//             alert(decideResult(playerSelection,computerSelection));
//         }
// }

// game();