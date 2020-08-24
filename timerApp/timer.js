console.log("hello timer app");

class Timer{
    constructor(durationInput,startButton,puseButton){
        this.durationInput= durationInput;
        this.startButton= startButton;
        this.puseButton= puseButton;

        this.startButton.addEventListener('click',this.start);
    
    }
    start= ()=>{
        console.log("Timer start...");
    }
}



const  durationInput = document.querySelector('#duration');
const  startButton = document.querySelector('#start');
const   puseButton  = document.querySelector('#puse');

const  timer = new Timer(durationInput,startButton,puseButton);