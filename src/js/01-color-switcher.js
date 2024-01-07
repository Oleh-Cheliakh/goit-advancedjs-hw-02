//Generate random color HEX code
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//Select buttons and body element
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyElement = document.querySelector('body');

//Creates variable to store interval ID
let intervalId;

//Makes stop button disabled by default
buttonStop.disabled = true;

//Randomly change background color of body
function changeBodyColor() {
  bodyElement.style.backgroundColor = getRandomHexColor();
}

//Start interval color change of body each second
buttonStart.addEventListener('click', event => {
  intervalId = setInterval(changeBodyColor, 1000);

  //Change styles of buttons in order to prevent multiple clicks
  buttonStop.disabled = false;
  buttonStart.disabled = true;
});

//Stop color change of body
buttonStop.addEventListener('click', event => {
  clearInterval(intervalId);

  //Change styles of buttons in order to prevent multiple clicks
  buttonStop.disabled = true;
  buttonStart.disabled = false;
});
