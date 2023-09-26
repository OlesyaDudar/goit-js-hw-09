import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateEl = document.querySelector('#datetime-picker');

const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');
const value = document.querySelectorAll('.value');
const label = document.querySelectorAll('.label');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');

const startBtn = document.querySelector('[data-start]');

let timerId = null;

function initStyle() {
  dateEl.style.fontWeight = '700';
  timer.style.display = 'flex';
  timer.style.gap = '10px';
  value.forEach(element => (element.style.fontSize = '36px'));
  label.forEach(element => {
    element.style.fontSize = '10px';
    element.style.fontWeight = '700';
    element.style.textTransform = 'uppercase';
  });
  field.forEach(element => {
    element.style.flexDirection = 'column';
    element.style.display = 'flex';
  });
}
initStyle();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
      setActive(true);
      //   startBtn.disabled = true;
      //   startBtn.style.backgroundColor = 'none';
    } else {
      //   startBtn.disabled = false;
      //   startBtn.style.backgroundColor = '	#C0C0C0';
      setActive(false);
    }
  },
};

function setActive(value) {
  startBtn.disabled = value;
  startBtn.style.backgroundColor = value ? '	#C0C0C0' : '	none';
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPad(value) {
  return String(value).padStart(2, 0);
}

function countTime() {
  setActive(false);
  //   date.disabled = false;
  timerId = setInterval(() => {
    const futureDate = new Date(dateEl.value);
    const dif = futureDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dif);
    if (dif > 1000) {
      dayEl.textContent = addPad(days);
      hourEl.textContent = addPad(hours);
      minEl.textContent = addPad(minutes);
      secEl.textContent = addPad(seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

setActive(false);

flatpickr(dateEl, options);

startBtn.addEventListener('click', countTime);
