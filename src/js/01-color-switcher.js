const BACKGROUND_CHANGE_TIME = 1000;
let intervalId = null;

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  intervalId = setInterval(setBgColor, BACKGROUND_CHANGE_TIME);
  refs.startBtn.disabled = true;
}

function onStop() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

function setBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
