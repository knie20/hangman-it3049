const difficultyForm = document.getElementById("difficultyForm")
const hangman = document.getElementById("hangman")
const gameScreen = document.getElementById("gameScreen")
const textGuessBox = document.getElementById("textGuessBox")
const textGuessingBox = document.getElementById("textGuessingBox")
const startBtn = document.getElementById("startBtn")


function getRandomWord(difficulty){
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