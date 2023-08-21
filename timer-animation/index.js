const duration = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const refreshBtn = document.querySelector('#refresh');
const circle = document.querySelector('circle');
const perimeter = Math.ceil(circle.getAttribute('r') * Math.PI * 2);
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
let initDuration = 0;
const value = Number(this.duration.value);
const timer = new Timer(duration, startBtn, pauseBtn, refreshBtn, {
  onStart(initDuration) {
    console.log("On start");
    this.initDuration = initDuration;
  },
  onTick() {
    circle.setAttribute('stroke-dashoffset', currentOffset);
    console.log(perimeter, currentOffset);
    currentOffset -= perimeter / this.initDuration / 1000 * 50;
  },
  onComplete() {
    console.log("On complete");
  }
});