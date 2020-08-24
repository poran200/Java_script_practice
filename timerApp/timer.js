console.log("hello timer app");

class Timer {
  constructor(durationInput, startButton, puseButton,callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.puseButton = puseButton;
    if(callbacks){
        this.onStart= callbacks.onStart;
        this.onTic = callbacks.onTic;
        this.onComplete= callbacks.onComplete;
    }
    this.startButton.addEventListener("click", this.start);
    this.puseButton.addEventListener("click", this.pause);
  }
  start = () => {
    if(this.onStart){
        this.onStart(this.timeReamining);
    }  
    this.tick();
    this.interval = setInterval(this.tick, 50);
  };
  pause = () => {
    console.log("Puse....");
    clearInterval(this.interval);
  };            
  tick = () => {
    if (this.timeReamining <= 0) {
      this.pause();
      if(this.onComplete){
          this.onComplete();
      }
    } else {
      this.timeReamining = this.timeReamining - 0.05;
      if(this.onTic){
          this.onTic(this.timeReamining);
      }
    }
  };
  get timeReamining() {
    return this.durationInput.value;
  }

  set timeReamining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}


