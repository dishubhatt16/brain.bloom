/* =========================================
   QUIZ QUESTIONS
========================================= */

const quizData = {

    easy: [
        {
            question: "What does CPU stand for?",
            answers: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Computer Processing User"
            ],
            correct: 0
        },
        {
            question: "Which device is used to type text?",
            answers: [
                "Monitor",
                "Keyboard",
                "Printer",
                "Speaker"
            ],
            correct: 1
        },
        {
            question: "Which one is an operating system?",
            answers: [
                "Google",
                "Windows",
                "YouTube",
                "HTML"
            ],
            correct: 1
        },
        {
            question: "What does RAM stand for?",
            answers: [
                "Read Access Memory",
                "Random Access Memory",
                "Run Access Memory",
                "Random Application Memory"
            ],
            correct: 1
        },
        {
            question: "Which device displays output?",
            answers: [
                "Keyboard",
                "Mouse",
                "Monitor",
                "Scanner"
            ],
            correct: 2
        }
    ],

    medium: [
        {
            question: "Which memory is closest to the CPU?",
            answers: [
                "Hard Disk",
                "Cache",
                "Pen Drive",
                "DVD"
            ],
            correct: 1
        },
        {
            question: "Which OS is open source?",
            answers: [
                "Linux",
                "Windows",
                "iOS",
                "DOS"
            ],
            correct: 0
        },
        {
            question: "What is multitasking?",
            answers: [
                "Running one program",
                "Running multiple programs",
                "Deleting programs",
                "Installing programs"
            ],
            correct: 1
        },
        {
            question: "Which protocol is used for web pages?",
            answers: [
                "HTTP",
                "FTP",
                "SMTP",
                "SSH"
            ],
            correct: 0
        },
        {
            question: "Which is a secondary storage device?",
            answers: [
                "RAM",
                "Cache",
                "SSD",
                "Register"
            ],
            correct: 2
        }
    ],

    hard: [
        {
            question: "Which OS component manages CPU scheduling?",
            answers: [
                "File System",
                "Process Manager",
                "Compiler",
                "Shell"
            ],
            correct: 1
        },
        {
            question: "What is the main purpose of a microkernel?",
            answers: [
                "Increase file size",
                "Keep the kernel small",
                "Remove memory",
                "Increase storage"
            ],
            correct: 1
        },
        {
            question: "What does SMP stand for?",
            answers: [
                "Simple Memory Process",
                "Symmetric Multiprocessing",
                "System Memory Program",
                "Single Machine Processor"
            ],
            correct: 1
        },
        {
            question: "What is fault tolerance?",
            answers: [
                "Preventing all software",
                "Continuing operation after a failure",
                "Deleting failed hardware",
                "Stopping the system"
            ],
            correct: 1
        },
        {
            question: "Which technique allows multiple programs to stay in memory?",
            answers: [
                "Multiprogramming",
                "Formatting",
                "Compiling",
                "Encryption"
            ],
            correct: 0
        }
    ]
};


/* =========================================
   VARIABLES
========================================= */

let currentDifficulty = "easy";

let currentQuestion = 0;

let score = 0;

let selectedAnswer = false;


/* =========================================
   START QUIZ
========================================= */

function startQuiz(difficulty) {

    currentDifficulty = difficulty;

    currentQuestion = 0;

    score = 0;

    selectedAnswer = false;

    // Get quiz section
    const quizSection = document.getElementById("quiz");

    // Show quiz
    quizSection.style.display = "block";

    // Scroll to quiz
    quizSection.scrollIntoView({
        behavior: "smooth"
    });

    // Display first question
    showQuestion();
}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {

    const questions = quizData[currentDifficulty];

    const questionData = questions[currentQuestion];

    const questionElement = document.getElementById("question");

    const answersElement = document.getElementById("answers");

    const titleElement = document.getElementById("quiz-title");

    const scoreElement = document.getElementById("score");

    const nextButton = document.getElementById("next-btn");


    // Quiz title
    titleElement.innerText =
        currentDifficulty.toUpperCase() + " QUIZ";


    // Question
    questionElement.innerText =
        `${currentQuestion + 1}. ${questionData.question}`;


    // Clear old answers
    answersElement.innerHTML = "";


    // Reset answer selection
    selectedAnswer = false;


    // Create answer buttons
    questionData.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.innerText = answer;

        button.onclick = function () {

            checkAnswer(index, button);

        };

        answersElement.appendChild(button);

    });


    // Score
    scoreElement.innerText =
        `Score: ${score}`;


    // Change next button text
    if (currentQuestion === questions.length - 1) {

        nextButton.innerText = "Finish Quiz 🏆";

    } else {

        nextButton.innerText = "Next Question →";

    }
}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(selectedIndex, button) {

    // Prevent selecting multiple answers
    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const questionData =
        quizData[currentDifficulty][currentQuestion];

    const allButtons =
        document.querySelectorAll("#answers button");


    if (selectedIndex === questionData.correct) {

        score++;

        button.style.background = "#2ecc71";

        button.style.color = "white";

        button.innerText += " ✓";

    } else {

        button.style.background = "#e74c3c";

        button.style.color = "white";

        button.innerText += " ✗";


        // Show correct answer
        allButtons[questionData.correct].style.background =
            "#2ecc71";

        allButtons[questionData.correct].style.color =
            "white";

        allButtons[questionData.correct].innerText += " ✓";
    }


    // Update score
    document.getElementById("score").innerText =
        `Score: ${score}`;
}


/* =========================================
   NEXT QUESTION
========================================= */

function nextQuestion() {

    // Don't move forward until an answer is selected
    if (!selectedAnswer) {

        alert("Please select an answer first!");

        return;
    }


    const questions =
        quizData[currentDifficulty];


    // Check if quiz is finished
    if (currentQuestion === questions.length - 1) {

        showResult();

        return;
    }


    // Go to next question
    currentQuestion++;

    showQuestion();
}


/* =========================================
   SHOW FINAL RESULT
========================================= */

function showResult() {

    const quizBox =
        document.querySelector(".quiz-box");

    const total =
        quizData[currentDifficulty].length;

    const percentage =
        Math.round((score / total) * 100);


    let message;


    if (percentage === 100) {

        message = "Excellent! 🏆";

    } else if (percentage >= 80) {

        message = "Great Job! 🎉";

    } else if (percentage >= 50) {

        message = "Good Try! 👍";

    } else {

        message = "Keep Practicing! 💪";

    }


    quizBox.innerHTML = `

        <h2>Quiz Completed 🎉</h2>

        <p style="font-size: 25px; margin: 20px;">
            ${message}
        </p>

        <p style="font-size: 22px;">
            Your Score
        </p>

        <h1 style="color: #5b4bdb; font-size: 50px;">
            ${score} / ${total}
        </h1>

        <p style="font-size: 18px;">
            Percentage: ${percentage}%
        </p>

        <br>

        <button
            onclick="restartQuiz()"
            style="
                padding: 13px 25px;
                border: none;
                border-radius: 25px;
                background: #5b4bdb;
                color: white;
                cursor: pointer;
                font-weight: bold;
            "
        >
            🔄 Try Again
        </button>

    `;
}


/* =========================================
   RESTART QUIZ
========================================= */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = false;

    showQuestion();
}


/* =========================================
   CATEGORY SELECTION
========================================= */

function selectCategory(category) {

    alert(
        "You selected: " +
        category +
        "\n\nNow choose your difficulty level!"
    );

    // Scroll to difficulty section
    document.getElementById("difficulty")
        .scrollIntoView({
            behavior: "smooth"
        });
}
