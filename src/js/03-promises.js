import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//Selects form and input elements
const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const formElement = document.querySelector('.form');

//Create promise with random status and delay
function createPromise(position, delay) {
  //Generates random status
  const shouldResolve = Math.random() > 0.3;
  //Creates promise which return position and delay parameters
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfills and pass values
        resolve({ position, delay });
      } else {
        // Rejects and pass values
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

function handleSubmit(event) {
  //Prevent page reloading
  event.preventDefault();

  //Variables store data from inputs
  let delay = parseInt(delayInput.value);
  let promiseAmount = parseInt(amountInput.value);

  //Creates number of promises equal to Amount field
  for (let promiseNumber = 1; promiseNumber <= promiseAmount; promiseNumber++) {
    createPromise(promiseNumber, delay)
      .then(({ position, delay }) => {
        //Show custom green notification
        iziToast.show({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          color: 'green',
          position: 'topRight',
          transitionIn: 'fadeInDown',
        });
      })
      .catch(({ position, delay }) => {
        //Show custom red notification
        iziToast.show({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          color: 'red',
          position: 'topRight',
          transitionIn: 'fadeInDown',
        });
      });

    //Increase delay by amount sat up in Step input
    delay += parseInt(stepInput.value);
  }
}

//Create promises on form submit
formElement.addEventListener('submit', event => {
  handleSubmit(event);
});
