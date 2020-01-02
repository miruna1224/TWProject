(function () {
    const myQuestions = [
        {
            question: "Teorema lui Pitagora spune:",
            answers: {
                a: "Suma unghiurilor unui patrualter face 360 de grade",
                b: "Latura opusa unghiului de 30 de grade este jumatate din ipotenuza",
                c: "Patratul ipotenuzei este egal cu suma patratelor catetelor",
                d: "Nu exita aceasta teorema"
            },
            correctAnswer: "c"
        },
        {
            question: "For x^2 + 1 = 0. Found x:",
            answers: {
                a: "Imposible to found out",
                b: "0",
                c: "i",
                d: "1"
            },
            correctAnswer: "c"
        }
    ];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    var numCorrect = 0;

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                if (submitWasSend == 0)
                    numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "darkgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        resultsContainer.display = "flex";

        if (myQuestions.length === numCorrect) {
            resultsContainer.style.backgroundColor = 'lightgreen';
        }
        else if (numCorrect === 0) {
            resultsContainer.style.backgroundColor = 'red';
        }
        else {
            resultsContainer.style.backgroundColor = 'orange';
        }

    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (submitWasSend == 0) {
            reloadButton.style.display = "none";
        }

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    var submitWasSend = 0;

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const resultColor = document.getElementsByClassName("resultsNumber");
    const submitButton = document.getElementById("submit");

    // display quiz right away

    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const reloadButton = document.getElementById("try-again");

    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    document.getElementById('submit').onclick = function () {
        submitWasSend = 1;
        reloadButton.style.display = "inline-block";
    };
    document.getElementById('try-again').onclick = function () {
        location.reload();
    }
})();
