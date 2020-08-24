

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const puseButton = document.querySelector("#puse");

const timer = new Timer(durationInput, startButton, puseButton, {
  onStart() {
    console.log("timer start on callback.....");
  },
  onTic() {
      console.log("On tick..")
  },
  onComplete() {
      console.log("on complete...")
  },
});