const hangman = document.getElementById("hangman")
const gameScreen = document.getElementById("gameScreen")
const textGuessBox = document.getElementById("textGuessBox")
const textGuessingBox = document.getElementById("textGuessingBox")
const guessForm = document.getElementById("guessForm")
const restartBtn = document.getElementById("restartBtn")
const difficultyLvl = document.getElementById("difficultyLvl")
const guessedLetters = document.getElementById("guessedLetters")

difficultyLvl.innerHTML = sessionStorage.getItem("difficulty")


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
        this.numberOfGuesses = 0
        this.hangmanLife = 6
        this.lettersGuessed = 0

        this.wordArray.forEach(char => {
            textGuessBox.innerHTML += '_ '
        })

        restartBtn.style.display = 'none'
    }

    guess(char){
        this.numberOfGuesses++
        var guessCorrect = false
        guessedLetters.innerHTML += char + ' '

        if(this.hangmanLife > 0){
            for (let i = 0; i < this.wordLength; i++) {
                if(char == this.wordArray[i]){
                    this.lettersGuessed++
                    guessCorrect = true
                    var displaytxt = textGuessBox.innerHTML
                    textGuessBox.innerHTML = displaytxt.substring(0, i * 2) + char + " " + displaytxt.substring((i + 1) * 2, displaytxt.length)
                }   
            }

            if(guessCorrect === false){
                this.hangmanLife--
            }

            if(this.lettersGuessed === this.wordLength){
                this.gameWon()
            }
        }else{
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