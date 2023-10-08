const numButtons = document.querySelectorAll('.numBtn');
const opButtons = document.querySelectorAll('.opBtn')
const display = document.querySelector('.display');

let valueA = 0;
let valueB = 0;
let operator = null;

const add = function() {
  let value = 0;
  for (let i = 0; i < arguments.length; i++) {
    value += arguments[i];
  }
  valueA = value;
  valueB = 0;
  return valueA;
}

const subtract = function() {
  let value = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    value -= arguments[i];
  }
  valueA = value;
  valueB = 0;
  return valueA;
}

const multiply = function() {
  let value = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    value *= arguments[i];
  }
  valueA = value;
  valueB = 0;
  return valueA;
}

const divide = function() {
  let value = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    value /= arguments[i];
  }
  valueA = value;
  valueB = 0;
  return valueA;
}

function evaluate(a, b) {
  if (operator === '+') {
    add(a, b);
  }
  if (operator === '-') {
    subtract(a, b);
  }
  if (operator === '*') {
    multiply(a, b);
  }
  if (operator === '/') {
    if (valueB === 0) {
      return valueA = display.textContent = "You can't do that!";
    }
    divide(a, b);
  }
}

document.addEventListener('keydown', (e) => {
  console.log(e);
  if (parseInt(e.key) >= 0 || e.key === '.') {
    display.textContent += e.key;
    if (operator == null && display.textContent != '') {
      valueA = parseInt(display.textContent);
    }
    if (valueA > 0 && operator != null && display.textContent != '') {
      valueB = parseInt(display.textContent);
    }
  }
  if (e.key === '+' || e.key === '-' ||
  e.key === '*' || e.key === '/') {
    operator = e.key;
    display.textContent = '';
  }
  if (e.key === 'Enter') {
    evaluate(valueA, valueB);
    display.textContent = valueA;
  }
})

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.number) {
    display.textContent += button.dataset.number;
    if (operator == null && display.textContent != '') {
      valueA = parseInt(display.textContent);
    }
    if (valueA > 0 && operator != null && display.textContent != '') {
      valueB = parseInt(display.textContent);
    }
    }
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.operator &&
      valueB == 0) {
      operator = button.dataset.operator;
      display.textContent = '';
    }
    if (button.dataset.operator &&
      valueA > 0 &&
      valueB > 0) {
      evaluate(valueA, valueB)
      display.textContent = '';
      operator = button.dataset.operator;
    }
    if (button.dataset.operator &&
      parseInt(display.textContent) === valueA) {
      display.textContent = '';
      operator = button.dataset.operator;
    }
    if (button.dataset.result) {
      evaluate(valueA, valueB);
      display.textContent = valueA;
    }
    if (button.dataset.clear) {
      valueA = 0;
      valueB = 0;
      operator = null;
      display.textContent = '';
    }
  })
})

