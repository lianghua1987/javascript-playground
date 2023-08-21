class Timer {
  constructor(duration, startBtn, pauseBtn, refreshBtn, callbacks) {
    this.duration = duration;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.refreshBtn = refreshBtn;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause.bind(this));
    this.refreshBtn.addEventListener('click', this.refresh.bind(this));
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.duration.value);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
  }

  pause() {
    clearInterval(this.interval);
  }

  refresh() {
    location.reload();
  }


  value = (e) => {
    this.value = e.target.value;
  }

  get timeRemaining() {
    return parseFloat(this.duration.value);
  }

  set timeRemaining(time) {
    this.duration.value = time.toFixed(2);
  }


  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onTick();
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.value);
      }
    }
  }
}