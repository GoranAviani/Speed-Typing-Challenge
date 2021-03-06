const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

    //minutes, seconds, hundrens of seconds, thousends of seconds
 let timer = [0,0,0,0];
 let interval;
 //isTimerRunning boolean is for preventing the timer to continue when user
// deleted all and starts typing again. ie, When the game is over, it's over :)
 let isTimerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    //If it is a single digit number add 0 in front
    if (time <= 9){
    time = "0" + time;
    }
    return time
}

// Run a standard minute/second/hundredths timer:

function runTimer(){

    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2])

    theTimer.innerHTML = currentTime ;
    timer[3]++;


    //minutes dividing by 100 to get seconds, and dividing by 60 to get minutes
    timer[0] = Math.floor((timer[3]/100/60))

    // - timer[0] * 60 = every time it hits 60 seconds this value returns to zero
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60))

    // - timer[1] * 100 = every time it hits 100 part of a second it goes to 0
    //every time a minute reach a hundred so it does not count over
    timer[2] = Math.floor((timer[3] - timer[1] * 100 ) - (timer[0] * 6000))



}


// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;

    // This is color feedback to the player know if and when hes made a typing mistake:
    //Substring treats a string of text as an array and allows to specify a
    // section within a text to pull out and use as a substring, substring(start,howmanycharacters)
    let originTextMatch = originText.substring(0, textEntered.length)

    //If writen text maatches text in total, it is are done and border is green
   if (textEntered == originText) {
        //Interval is cleared and the clock stops
        clearInterval(interval)
        testWrapper.style.borderColor = "#33cc33";
    } else {
        // If text matches part but is still not finished border is blue
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#0000cc";
        } else {
            //else its wrong so the border is red
            testWrapper.style.borderColor = "#cc3300";
        }
    }


}



// Start the timer:
function startTimer(){
    let textEnteredLength = testArea.value.length;
    console.log(textEnteredLength)

    //When the first key is pressed start the interval timer runTimer
    if (textEnteredLength === 0 && !isTimerRunning){
        isTimerRunning = true
        interval = setInterval(runTimer, 10);
    }

}

// Reset everything:
function resetText() {
    //Backend reset:
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    isTimerRunning = false;

    //Visual reset:
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "#757373";






}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", resetText, false);