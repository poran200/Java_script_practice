console.log("hello timer app");

class Timer {
  constructor(durationInput, startButton, puseButton,callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.puseButton = puseButton;
    if(callbacks){
        this.onStart= callbacks.onStart;
    }
    this.startButton.addEventListener("click", this.start);
    this.puseButton.addEventListener("click", this.pause);
  }
  start = () => {
    if(this.onStart){
        this.onStart();
    }  
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };
  pause = () => {
    console.log("Puse....");
    clearInterval(this.interval);
  };            
  tick = () => {
    if (this.timeReamining <= 0) {
      this.pause();
    } else {
      this.timeReamining = this.timeReamining - 1;
    }
  };
  get timeReamining() {
    return this.durationInput.value;
  }

  set timeReamining(time) {
    this.durationInput.value = time;
  }
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const puseButton = document.querySelector("#puse");

const timer = new Timer(durationInput, startButton, puseButton, {
  onStart() {
    console.log("timer start on callback.....");
  },
  onTic() {},
  onComplete() {},
});
