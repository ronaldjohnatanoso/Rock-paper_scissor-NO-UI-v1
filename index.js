
const quit = document.querySelector(".quit")
quit.style.display = 'hidden'
// quit.style.position = 'sticky'
// quit.style.height = '80px'
// quit.style.right = '50px'
// quit.style.top = '50'
// quit.style.float = 'right' //make an inline element float to left
// quit.style.verticalAlign = 'top'

quit.remove()


class GameRPS{
    constructor(roundHeaderText,scoreLineText,messageBoardText){
        this.roundHeaderText= roundHeaderText
        this.scoreLineText = scoreLineText
        this.messageBoardText = messageBoardText
        //default pos
        this.gameStart()
    }
    //start of game def positiosn
    gameStart(){
        this.roundHeader = 1
        this.scoreLine = "Player:  ||  :Computer"
        this.messageBoard = "Do you want to play a game? "
        this.playerScore = 0
        this.computerScore = 0
        this.playGame()
    }
    // quitGame(){
        // this.roundHeader = 0
        // this.scoreLine = "Player:  ||  :Computer"
        // this.playerScore = 0
        // this.computerScore = 0
    // }
    //prompt if they want to play game, buttons will be created
    
    playGame(){ 
        let yesButton = document.createElement("button")    
        yesButton.style.height ='100px'
        yesButton.style.width = '100px'  
        yesButton.className = "yes"
        yesButton.innerText = "Yes"

        yesButton.addEventListener("mouseenter", ()=>{
            yesButton.style.backgroundColor = 'red'
        } )
        yesButton.addEventListener("mouseleave",()=>{
            yesButton.style.backgroundColor = 'white'
        })

        document.querySelector(".message-board").appendChild(yesButton)
        document.querySelector(".message-board").appendChild(quit)

        //if they decide to take a game
        document.querySelector(".yes").addEventListener("click",()=>{
            this.messageBoardText.innerText = "Pick your weapon ↑"
            quit.style.display = 'inline-block'
            document.querySelector(".message-board").appendChild(quit)
            //add the quit button if they click yes
            
            this.gamePlay()
            //show the quit button
        })
    }

        gamePlay(){
            let playerChoice 
            let computerChoice
            //player choice
            const choiceButton = document.querySelectorAll("[data-choice]")
            choiceButton.forEach( button =>{
                button.addEventListener("click", ()=>{
                
                    playerChoice =button.dataset.choice
                    
                    alert('You chose '+playerChoice)
                    // alert(typeof playerChoice)
                    
                    //------only happens when button is activated
                    let weaponChoices = ['rock','paper','scissor']; 
                    let randomIndex  = Math.floor(Math.random()*weaponChoices.length)           
                    computerChoice = weaponChoices[randomIndex] 
                    alert('Enemy chose '+computerChoice)
                    if( playerChoice == computerChoice ){
                        alert("Draw")
                        document.querySelector(".message-board").innerText = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}\nDraw!!`
                        
                    }


                    else if(playerChoice == 'rock' && computerChoice == 'scissor'){
                        // alert("Rock vs Scissor")
                        this.messageBoardText.innerText = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}\n Player wins!!`
                        this.scoreUpdate('player')
                        this.roundUpdate()
                    }
                    else if(playerChoice == 'paper' && computerChoice == 'rock' ){
                        // alert("Paper vs Rock")
                        this.messageBoardText.innerText = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}\n Player wins!!`
                        this.scoreUpdate('player')
                        this.roundUpdate()
                    }
                    else if(playerChoice == 'scissor' && computerChoice == 'paper'){
                        //  alert("Scissor vs Paper")
                         this.messageBoardText.innerText = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}\n Player wins!!`
                         this.scoreUpdate('player')
                         this.roundUpdate()
                    }
                    else {
                        // alert("Computer Win")
                        this.messageBoardText.innerText = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}\n Computer Wins!!`
                        this.scoreUpdate('computer')
                        this.roundUpdate()
                    }
                    document.querySelector(".message-board").appendChild(quit)
                    //--------------
                } )
            } )


        }
        //everytime someone wins 
    scoreUpdate(winner){
        if( winner == 'player' ){
            this.playerScore = parseFloat(this.playerScore) +1;
        }
        if(winner == 'computer'){
            this.computerScore =parseFloat(this.computerScore) +1;
        }
        this.scoreLineText.innerText = `Player  ${this.playerScore} | ${this.computerScore}  Computer`
    }
    //round updater
    roundUpdate(){
        this.roundHeader = parseFloat(this.roundHeader) +1;
        this.roundHeaderText.innerText = `Round ${this.roundHeader}`
    }

       
}
//text outputs
const message = document.querySelector(".message-board")
const round = document.querySelector(".round-header")
const score = document.querySelector(".score-line")

quit.addEventListener("click",()=>{
    alert("THeRe iS no eScaPE, fIgHt!")
    // rps.quitGame()
    rps.messageBoardText.innerText = "There is no running."

})

//buttons hovers
const rockButton = document.querySelector("[data-choice='rock']")
rockButton.addEventListener("mouseenter",()=>{
    
    rockButton.src = './images/rock.gif';
})
rockButton.addEventListener("mouseleave",()=>{
    rockButton.src = './images/the-rock-sus.gif';
})


const paperButton= document.querySelector("[data-choice='paper']")
paperButton.addEventListener("mouseenter",()=>{
    paperButton.src = './images/ghost-paper.gif'
})
paperButton.addEventListener("mouseleave",()=>{
    paperButton.src = './images/ghost-paper.png'
})


const scissorButton= document.querySelector("[data-choice='scissor']")
scissorButton.addEventListener("mouseenter",()=>{
    scissorButton.src = './images/cut-scissors.gif'
})
scissorButton.addEventListener("mouseleave",()=>{
    scissorButton.src = './images/scissor.png'
})

const rps = new GameRPS(round, score, message)
