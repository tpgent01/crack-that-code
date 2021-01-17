// Variables
let highScore = document.querySelector("#highScore");
let clear = document.querySelector("#clear");
let goBack = document.querySelector("#goBack");

// Event listener to clear scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Get local storage
let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !==null) {

    for (var i=0; i < allScores.length; i++) {

        let createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
        }
}

// Event listener ot move to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});