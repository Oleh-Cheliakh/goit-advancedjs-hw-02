import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//Selects button and timer elements
const buttonStart = document.querySelector('button[data-start]');
const daysNumber = document.querySelector('span[data-days]');
const hoursNumber = document.querySelector('span[data-hours]');
const minutesNumber = document.querySelector('span[data-minutes]');
const secondsNumber = document.querySelector('span[data-seconds]');

//Creates variable in order to store picked data and interval ID
let pickedDate, intervalId;

//Variable stores showed time
let dataShowed = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

//Sets button default condition
buttonStart.disabled = true;

//Parameters for data picker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //Checks if selected date bigger than current date
    if (selectedDates[0] <= new Date()) {
      //Changes button condition to active
      if (!buttonStart.disabled) {
        buttonStart.disabled = true;
      }
      //Show custom warning message if wrong data was picked
      return iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
    }
    //Disables button after timer start
    buttonStart.disabled = false;
    pickedDate = selectedDates[0];
  },
};

//Invokes custom data picker
flatpickr('#datetime-picker', options);

//Converts data from picker in object
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

//Adds zero at the beginning if number has only 1 digit
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

//Show time left in html elements
function showTimeLeft() {
  const currentDate = new Date();
  const leftTime = pickedDate - currentDate;
  //Stops countind if timer reached zero
  if (leftTime < 1) {
    return clearInterval(intervalId);
  }
  const { days, hours, minutes, seconds } = convertMs(leftTime);

  //Changes time in element only if it's not equal to currently showing time
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

//Starts time count down on button start click
buttonStart.addEventListener('click', event => {
  buttonStart.disabled = true;
  intervalId = setInterval(showTimeLeft, 1000);
});
