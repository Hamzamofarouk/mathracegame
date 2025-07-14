const questions = [
    { q: "2 + 2 = ?", a: "4" },
    { q: "5 - 3 = ?", a: "2" },
    { q: "3 x 2 = ?", a: "6" },
    { q: "9 / 3 = ?", a: "3" }
];

let currentQuestion = 0;
let progress = 5; // start at bottom: 5%

const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit-answer");
const feedbackEl = document.getElementById("feedback");
const userCar = document.getElementById("user-car");
const celebrationEl = document.getElementById("celebration");
const confettiContainer = document.getElementById("confetti-container");

// Show first question
questionEl.textContent = questions[currentQuestion].q;

submitBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim();

    // Reset feedback styles
    feedbackEl.classList.remove("correct", "incorrect");

    if (userAnswer === questions[currentQuestion].a) {
        // Correct answer
        feedbackEl.textContent = "Correct! 🚗💨";
        feedbackEl.classList.add("correct");

        progress += 19;
        userCar.style.transition = "bottom 0.5s ease-out";
        userCar.style.bottom = progress + "%";

        currentQuestion++;

        if (currentQuestion < questions.length) {
            questionEl.textContent = questions[currentQuestion].q;
        } else {
            questionEl.textContent = "🏁 You won the race!";
            feedbackEl.textContent = "Well done! 🚗💨";
            feedbackEl.classList.add("correct");
            submitBtn.disabled = true;

            // Show celebration message
            celebrationEl.textContent = "Congratulations! 🎉";
            celebrationEl.style.display = "block";

            // Trigger confetti effect
            triggerConfetti();
        }
    } else {
        // Incorrect answer
        feedbackEl.textContent = "Oops! Try again.";
        feedbackEl.classList.add("incorrect");
    }

    answerInput.value = "";
});

function triggerConfetti() {
    const colors = ["#FF6347", "#FFD700", "#32CD32", "#00BFFF", "#FF1493", "#FF4500", "#800080", "#FF69B4"];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
        confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position across the screen
        confetti.style.width = `${Math.random() * 15 + 10}px`; // Random width between 10px and 25px
        confetti.style.height = `${Math.random() * 15 + 10}px`; // Random height between 10px and 25px
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random falling speed (between 3s and 5s)
        confetti.style.animationDelay = `${Math.random() * 2}s`; // Random delay for staggered effect
        confetti.style.position = "absolute";
        confetti.style.top = `-10px`; // Start just above the viewport (top of the screen)
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after it falls
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 5000);
}
