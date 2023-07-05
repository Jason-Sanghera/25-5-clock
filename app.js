// Get the buttons
const breakUp = document.getElementById("break-increment");
const breakDown = document.getElementById("break-decrement");
const sessionUp = document.getElementById("session-increment");
const sessionDown = document.getElementById("session-decrement");
const startStop = document.getElementById("start_stop");
const resetButton = document.getElementById("reset");

// Get the displays
const breakDisplay = document.getElementById("break-length");
const sessionDisplay = document.getElementById("session-length");
const timerDisplay = document.getElementById("time-left");

let breakLength = parseInt(breakDisplay.innerText);
let sessionLength = parseInt(sessionDisplay.innerText);
let timeLeft = sessionLength * 60; // Convert session length to seconds

let isRunning = false; // Flag to track if the clock is currently running
let timerInterval; // Variable to store the setInterval reference

// Helper function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

// Function to update the timer display
// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    timerDisplay.innerText = `${minutes}:${seconds}`;
}


// Function to handle the start/stop button click
function handleStartStopClick() {
    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        startStop.innerText = "Start";
    } else {
        // Start or resume the timer
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft === 0) {
                // Time is up, switch to break or session
                clearInterval(timerInterval);
                if (timerDisplay.innerText === "Session") {
                    timerDisplay.innerText = "Break";
                    timeLeft = breakLength * 60;
                } else {
                    timerDisplay.innerText = "Session";
                    timeLeft = sessionLength * 60;
                }
                timerInterval = setInterval(updateTimerDisplay, 1000);
            }
        }, 1000);
        isRunning = true;
        startStop.innerText = "Stop";
    }
}

// Function to handle the reset button click
function handleResetClick() {
    clearInterval(timerInterval);
    isRunning = false;
    startStop.innerText = "Start";
    timerDisplay.innerText = "Session";
    breakDisplay.innerText = "5";
    sessionDisplay.innerText = "25";
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    updateTimerDisplay();
}

// Function to handle the increment and decrement buttons for break length
function handleBreakLengthButtonClick(increment) {
    if (isRunning) return; // Disable changing length while the timer is running
    let length = parseInt(breakDisplay.innerText);
    if (increment) {
        length += 5;
    } else {
        length = Math.max(length - 5, 5); // Minimum length of 5
    }
    breakDisplay.innerText = length.toString();
    breakLength = length;
}

// Add event listeners to the break buttons
breakUp.addEventListener("click", () => {
    handleBreakLengthButtonClick(true);
});

breakDown.addEventListener("click", () => {
    handleBreakLengthButtonClick(false);
});

// Function to handle the increment and decrement buttons for session length
function handleSessionLengthButtonClick(increment) {
    if (isRunning) return; // Disable changing length while the timer is running
    let length = parseInt(sessionDisplay.innerText);
    if (increment) {
        length += 5;
    } else {
        length = Math.max(length - 5, 5); // Minimum length of 5
    }
    sessionDisplay.innerText = length.toString();
    sessionLength = length;
    if (!isRunning) {
        timeLeft = sessionLength * 60;
        updateTimerDisplay();
    }
}

// Add event listeners to the session buttons
sessionUp.addEventListener("click", () => {
    handleSessionLengthButtonClick(true);
});

sessionDown.addEventListener("click", () => {
    handleSessionLengthButtonClick(false);
});


startStop.addEventListener("click", handleStartStopClick);

resetButton.addEventListener("click", handleResetClick);

// Initialize the timer display
updateTimerDisplay();
