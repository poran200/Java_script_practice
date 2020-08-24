const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const puseButton = document.querySelector("#puse");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startButton, puseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
    console.log("timer start on callback.....");
  },
  onTic(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );

    console.log("On tick..");
  },
  onComplete() {
    console.log("on complete...");
  },
});
