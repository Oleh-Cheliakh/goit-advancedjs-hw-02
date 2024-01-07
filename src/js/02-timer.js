import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonStart = document.querySelector('button[data-start]');
const daysNumber = document.querySelector('span[data-days]');
const hoursNumber = document.querySelector('span[data-hours]');
const minutesNumber = document.querySelector('span[data-minutes]');
const secondsNumber = document.querySelector('span[data-seconds]');
let pickedDate, intervalId;
let dataShowed = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      if (!buttonStart.disabled) {
        buttonStart.disabled = true;
      }
      return iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
    }
    buttonStart.disabled = false;
    pickedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function showTimeLeft() {
  const currentDate = new Date();
  const leftTime = pickedDate - currentDate;
  if (leftTime < 1) {
    return clearInterval(intervalId);
  }
  const { days, hours, minutes, seconds } = convertMs(leftTime);
  if (days != dataShowed.days) {
    daysNumber.textContent = addLeadingZero(days);
    dataShowed.days = days;
  }
  if (hours != dataShowed.hours) {
    hoursNumber.textContent = addLeadingZero(hours);
    dataShowed.hours = hours;
  }
  if (minutes != dataShowed.minutes) {
    minutesNumber.textContent = addLeadingZero(minutes);
    dataShowed.minutes = minutes;
  }
  if (seconds != dataShowed.seconds) {
    secondsNumber.textContent = addLeadingZero(seconds);
    dataShowed.seconds = seconds;
  }
}

buttonStart.addEventListener('click', event => {
  buttonStart.disabled = true;
  intervalId = setInterval(showTimeLeft, 1000);
});
