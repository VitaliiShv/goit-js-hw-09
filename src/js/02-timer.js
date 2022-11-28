import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const instanse = flatpickr('#datetime-picker', options);

function onClose(selectedDates) {
  console.log(selectedDates[0].getTime());
  const diffTime = selectedDates[0].getTime() - Date.now();
  if (diffTime < 0) {
    alert('Please choose a date in the future');
  }
}

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;

    this.onTick(time);
  }, 1000);
}
