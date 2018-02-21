const hangman = document.getElementById("hangman")
const gameScreen = document.getElementById("gameScreen")
const textGuessBox = document.getElementById("textGuessBox")
const textGuessingBox = document.getElementById("textGuessingBox")
const guessForm = document.getElementById("guessForm")
const restartBtn = document.getElementById("restartBtn")
const difficultyLvl = document.getElementById("difficultyLvl")
const guessedLettersDiv = document.getElementById("guessedLetters")

difficultyLvl.innerHTML = sessionStorage.getItem("difficulty")

let ctx = hangman.getContext('2d')


async function getRandomWord(difficulty){
    return new Promise( function(resolve, reject){
        
        var requestString = "https://it3049c-hangman-service.herokuapp.com/?difficulty=" + difficulty

        const req = new XMLHttpRequest()

        req.onreadystatechange = function() {
            if(req.readyState !== req.DONE) {return}

            const res = JSON.parse(req.responseText)

            resolve(res.word)
        }

        req.open("GET", requestString)
        req.send()
    })
}

class HangmanGame {

    constructor(){}

    async setup(difficulty) {
        this.word = await getRandomWord(difficulty) + ''
        console.log(this.word)
        this.wordArray = this.word.split('')
        this.wordLength = this.wordArray.length
        this.hangmanLife = 5
        this.lettersGuessedRight = 0
        this.lettersGuessed = ''

        this.drawStand()

        this.wordArray.forEach(char => {
            textGuessBox.innerHTML += '_ '
        })

        restartBtn.style.display = 'none'
    }

    guess(char){
        var guessCorrect = false

        if(!this.lettersGuessed.includes(char)){
            this.lettersGuessed += char
            guessedLettersDiv.innerHTML = "Your Guesses:" + this.lettersGuessed
        }else{
            alert("this letter has already been guessed")
            return
        }

        if(this.hangmanLife > 0){
            for (let i = 0; i < this.wordLength; i++) {
                if(char == this.wordArray[i]){
                    this.lettersGuessedRight++
                    guessCorrect = true
                    var displaytxt = textGuessBox.innerHTML
                    textGuessBox.innerHTML = displaytxt.substring(0, i * 2) + char + " " + displaytxt.substring((i + 1) * 2, displaytxt.length)
                }   
            }

            if(guessCorrect === false){
                this.drawMan(this.hangmanLife)
                this.hangmanLife--
            }

            if(this.lettersGuessedRight === this.wordLength){
                this.gameWon()
            }
        }else{
            this.drawMan(this.hangmanLife)
            this.gameLost()
        }
    }

    gameLost(){

        restartBtn.innerHTML = "You have lost! Restart?"
        restartBtn.style.display = 'block'

    }

    gameWon(){

        restartBtn.innerHTML = "You have won! Restart?"
        restartBtn.style.display = 'block'

    }

    drawStand(){
        ctx.beginPath()
        ctx.moveTo(15, 175)
        ctx.lineTo(15, 25)
        ctx.lineTo(100, 25)
        ctx.lineTo(100, 40)
        ctx.stroke()
    }

    drawMan(hangmanLife){
        switch (hangmanLife) {
            case 5:
                ctx.arc(100, 60, 20, 0, Math.PI * 2, false)
                ctx.stroke()
                break;
            case 4:
                ctx.beginPath()
                ctx.moveTo(100, 80)
                ctx.lineTo(100, 120)
                ctx.stroke()
                break;
            case 3:
                ctx.beginPath()
                ctx.moveTo(100, 80)
                ctx.lineTo(80, 100)
                ctx.stroke()
                break;
            case 2:
                ctx.beginPath()
                ctx.moveTo(100, 80)
                ctx.lineTo(120, 100)
                ctx.stroke()
                break;
            case 1:
                ctx.beginPath()
                ctx.moveTo(100, 120)
                ctx.lineTo(80, 140)
                ctx.stroke()
                break;
            case 0:
                ctx.beginPath()
                ctx.moveTo(100, 120)
                ctx.lineTo(120, 140)
                ctx.stroke()
                break;
            default:
                break;
        }
    }
}

guessForm.addEventListener("submit", function(event){

    event.preventDefault()

    game.guess(document.getElementById("guessedLetter").value)

    document.getElementById("guessedLetter").value = ''
})

restartBtn.addEventListener("click", function(event){
    window.location = "index.html"
})

let game = new HangmanGame()

game.setup(sessionStorage.getItem("difficulty"))