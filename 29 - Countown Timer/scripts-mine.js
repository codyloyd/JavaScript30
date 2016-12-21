let countdown;
const endTime = document.querySelector('.display__end-time')
const timerDisplay = document.querySelector('.display__time-left')
const buttons = document.querySelectorAll('[data-time]')
function timer(seconds) {
  clearInterval(countdown)
  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0){
      clearInterval(countdown);
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
}

function prependZero(number){
  if(number < 10){
    return `0${number}`
  }
  return number
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;
  const display = `${hours > 0 ? hours + ':' : ''}${prependZero(minutes)}:${prependZero(secondsLeft)}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const display = `be back at ${hour%12}:${prependZero(minutes)}`
  endTime.textContent = display;
}

function setTimer(){
  const seconds = this.dataset.time
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', setTimer))
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset()
})