
//rock paper scissor game, 
//1 game has 3 rounds
//try again means playing another game, for 3 rounds
//winner of best of 3

function weaponConvert(number){
    if (number == 1) return "rock";
    if (number == 2) return "paper";
    if (number == 3) return "scissor";
}

function gameLogic(left,right){
    if(left === 1 && right === 3) return true;
    if(left === 2 && right === 1 ) return true;
    if(left === 3 && right ===2) return true;

    else return false;
}

let menuChoice;
let handChoice;
let computerChoice;
let weaponConversion;


while(true){

    console.log("Do you want to play rock-paper-scissors? ");
    menuChoice = prompt("y or n");
    if( !(menuChoice === 'y' || menuChoice === 'Y') ) break;
    
   // let gameScore=0;
    let playerScore=0;
    let computerScore=0;
    for(i=0;i<3;i++){

        console.log("Round "+(i+1))
        handChoice= parseInt(prompt("1 for rock, 2 for paper, 3 for scissors"));
        computerChoice = Math.floor(Math.random()*3) +1;
     

        //input-error from player
        if ( (handChoice < 1) || (handChoice >3) ) {
            console.log("Invalid choice");
            i--;
            continue;
        }

        //weapon conversion from integer choice
        console.log(`Player: ${weaponConvert(handChoice)} VS ${weaponConvert(computerChoice)} :Computer`)

        //same choice, draw
        if( handChoice === computerChoice ) {
            console.log("Draw")
            //repeat the round;
            i--;
        }

        //player wins rock beats scissors
        else if ( gameLogic(handChoice,computerChoice) == true  ) {
            playerScore +=1;
        }
        else computerScore +=1;

        console.log( `Player: ${playerScore}`)
        console.log( `Computer: ${computerScore}`)
        //if someone score 2 , end game
        if( playerScore - computerScore === 2 ) {
            console.log("Player wins");
            break;
        }
        if(computerScore - playerScore === 2) {
            console.log("Computer wins");
            break;
        }
        
    }

}
console.log("That's the end");