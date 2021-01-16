//-- Variables --//
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
    render(questionIndex);
});


// Function to present questions
function render(questionIndex) {
    // Clears existing data
    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loop for array
    for (let i = 0; i < questions.length; i++) {
        let userQuestion = questions[questionIndex].title;
        let userChoice = questions[questionIndex].choices;
        questionsEl.textContent = userQuestion;
    }
    // ForEach loop for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}


// Compare choices - answers
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(createDiv);

}