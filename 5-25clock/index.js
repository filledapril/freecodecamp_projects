let breakIncrement = document.getElementById('break-increment');
let breakDecrement = document.getElementById('break-decrement');
let sessionIncrement = document.getElementById('session-increment');
let sessionDecrement = document.getElementById('session-decrement');
let startStop = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');

let alarmAudio = document.getElementById('alarm');

let timer;
let timerStatus = "begin";
let gapStatus = true;

//break setting buttons
breakIncrement.addEventListener('click', function clickHandle(){
    let displayBreak = parseInt(breakLength.innerText);
    breakLength.innerText = displayBreak + 1;

    if(displayBreak === 59){
        breakIncrement.removeEventListener('click', clickHandle);
        breakIncrement.disabled = true;
    }
})

breakDecrement.addEventListener('click', function clickHandle(){
    let displayBreak = parseInt(breakLength.innerText);
    breakLength.innerText = displayBreak - 1;

    if(displayBreak === 2){
        breakDecrement.removeEventListener('click', clickHandle);
        breakDecrement.disabled = true;
    }
})

//Session Length setting buttons
sessionIncrement.addEventListener('click', function clickHandle(){
    let displaySession = parseInt(sessionLength.innerText);
    sessionLength.innerText = displaySession + 1;

    timeLeft.innerText = sessionLength.innerText + ":" + "00";

    if(displaySession === 59){
        sessionIncrement.removeEventListener('click', clickHandle);
        sessionIncrement.disabled = true;
    }
})

sessionDecrement.addEventListener('click', function clickHandle(){
    let displaySession = parseInt(sessionLength.innerText);
    sessionLength.innerText = displaySession - 1;

    timeLeft.innerText = sessionLength.innerText + ":" + "00";

    if(displaySession === 2){
        sessionDecrement.removeEventListener('click', clickHandle);
        sessionDecrement.disabled = true;
    }
})

//Timer running Start-Stop button
startStop.addEventListener('click', () => {
    if(timerStatus === "begin" || timerStatus === "stopped"){
        console.log('timer start');
        timerStatus = 'counting';

        //interval excute Timer function
        timer = setInterval(() => {
            console.log(timeLeft.innerText)
            timeLeft.innerText = decrementTime( timeLeft.innerText );
        }, 1000) 

    } else if( timerStatus === "counting" ){
        console.log('timer stop');
        timerStatus = "stopped";

        clearInterval(timer);
    }
})



//Reset button(25:00, session 25, break 5)
resetButton.addEventListener("click", () => {
    console.log('timer reseted');
    timerStatus = "begin";
    clearInterval(timer);
    timeLeft.innerText = "25:00";
    sessionLength.innerText = "25";
    breakLength.innerText = "5";
})



//timer function setting
function decrementTime(timeString) {
    let displayTime = timeString.split(":");
    let minuteDisplay = parseInt(displayTime[0]);
    let secondDisplay = parseInt(displayTime[1]);
    let breakStatus = false;

    secondDisplay -= 1;

    //when session finished, change timer to break length
    if( breakStatus == false && gapStatus == false && minuteDisplay === 0 && secondDisplay === 0){
        secondDisplay = 0;
        minuteDisplay = parseInt(breakLength.innerText);
        breakStatus = true;  
        alarmAudio.play();
    }

    //when break finished, change timer to session length
    if(breakStatus == true && gapStatus == false && minuteDisplay === 0 && secondDisplay === 0){
        secondDisplay = 0;
        minuteDisplay = parseInt(sessionLength.innerText);
        breakStatus = false;
        alarmAudio.play();
    }

    //number display adjust (60seconds, decimal)
    if(secondDisplay === -1){
        secondDisplay = 59;
        minuteDisplay -= 1;
    }

    if(secondDisplay <= 9){
        secondDisplay = "0" + secondDisplay;
    }

    //return to timeLeft innertext
    return minuteDisplay + ":" + secondDisplay;
}