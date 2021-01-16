// Array for questions
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Variables for score
let score = 0;
let questionsIndex = 0;

// Variables for timer
let currentTime = document.querySelector("#currentTime");
let timer = document.querySelector("#startBtnEl");
let questionsEl = document.querySelector("#questionsEl");
let wrapper = document.querySelector("#wrapper");
let secondsLeft = 76;
let holdInterval = 0;
let pentalty = 10;
let ulCreate = document.createElement("ul");


// Function for timer
timer.addEventListener("click", function() {
    if (holdInterval == 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionsIndex);
});


// Function to present questions
function render(questionIndex) {
    // Clears existing data
    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loop for array
    for (let i = 0; i < questions.length; i++) {
        let userQuestion = questions[questionIndex].title;
        let userChoices = questions[questionIndex].choices;
        questionsEl.textContent = userQuestion;
    }
    // ForEach loop for question choices
    userChoices.forEach(function (newItem) {
        let listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}


// Compare choices - answers
function compare(event) {
    let element = event.target;

    if (element.matches("li")) {

        let createEl = document.createElement("div");
        createEl.setAttribute("id", "createEl");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createEl.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createEl.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createEl.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(createEl);

}


// All done will append last page
function allDone() {
    questionsEl.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    let createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsEl.appendChild(createH1);

    // Paragraph
    let createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsEl.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) { 
        let timeRemaining = secondsLeft;
        let createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsEl.appendChild(createP2);
    }

    // Label
    let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsEl.appendChild(createLabel);

    // Input
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsEl.appendChild(createInput);

    // Submit
    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsEl.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function() {
        let initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            let finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Goes to high score page
            window.location.replace("./highscores.html");
        }
    });
}