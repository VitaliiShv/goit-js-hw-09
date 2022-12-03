import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysFace: document.querySelector('[data-days]'),
  hoursFace: document.querySelector('[data-hours]'),
  minsFace: document.querySelector('[data-minutes]'),
  secsFace: document.querySelector('[data-seconds]'),
};

const pickerInstanse = flatpickr('#datetime-picker', options);
const TIMER_STEP = 1000;
let diffTime = null;
refs.startBtn.disabled = true;

function onClose(selectedDates) {
  diffTime = selectedDates[0].getTime() - Date.now();
  refs.startBtn.disabled = false;

  if (diffTime < 0) {
    alert('Please choose a date in the future');
    return;
  }
}

// STARTTIMER FUNCTION Ожидает дату в будущем, считает разницу между
// датой в будущем и текущей датой
function startTimer(timeDifference) {
  if (timeDifference < 0) {
    return;
  }
  refs.startBtn.disabled = true;
  const intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    console.log(timeDifference);

    updateInterface(refs.secsFace, seconds);
    updateInterface(refs.minsFace, minutes);
    updateInterface(refs.hoursFace, hours);
    updateInterface(refs.daysFace, days);
    timeDifference -= TIMER_STEP;
    if (timeDifference < 0) {
      clearInterval(intervalId);
      return;
    }
  }, TIMER_STEP);
}

// convertMs FUNCTION Ожидает колличество миллисекунд и возвращает
//  обьект с количеством дней, часов, минут, секкунд в этом числе
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

// pad FUNCTION Ожидает число и возвращает строку, в которой
// 2 символа (1 -> 01)
function pad(value) {
  return String(value).padStart(2, '0');
}

// при клике на кнопку 'Start' начинается отсчет от выбранного времени в будущем
// до текущего времени
refs.startBtn.addEventListener('click', () => {
  startTimer(diffTime);
  // refs.startBtn.disabled = true;
});

// функция ожидает ссылку на текстовый контент элемента и записывает туда переданное
// значение
function updateInterface(elem, value) {
  elem.textContent = value;
}
