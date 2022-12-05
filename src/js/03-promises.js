const refs = {
  delayField: document.querySelector('input[name=delay]'),
  delayStepField: document.querySelector('input[name=step]'),
  amountField: document.querySelector('input[name=amount]'),
  submitBtn: document.querySelector('button[type=submit]'),
  form: document.querySelector('.form'),
};

let delay;
let delayStep;
let amount;

refs.form.addEventListener('focusout', getFormInputs);

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += delayStep;
  }
}

function getFormInputs(event) {
  if (event.target === refs.delayField) {
    delay = Number(event.target.value);
  }
  if (event.target === refs.delayStepField) {
    delayStep = Number(event.target.value);
  }
  if (event.target === refs.amountField) {
    amount = Number(event.target.value);
  }
}
