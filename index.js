const difficultyForm = document.getElementById("difficultyForm")
const startBtn = document.getElementById("startBtn")
const difficultyDropdown = document.getElementById("difficultyDropdown")

startBtn.addEventListener("click", function(event){

    event.preventDefault()    

    sessionStorage.setItem("difficulty", difficultyDropdown.value)

    window.location = "game.html"
})