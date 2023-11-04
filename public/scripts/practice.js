//variables
const backdrop = document.getElementById('backdrop');
const changeUI = document.getElementById('changeUI');
const randomText = document.getElementById('random-text');

//buttons
const changeButton = document.getElementById('changeButton');
const randomWordButton = document.getElementById('randomWordButton');

// global variables
let SELECTED_UI;


// functions


// event listeners
randomWordButton.addEventListener('click', event => {
    event.preventDefault();
    fetch('/getRandomWord', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        randomText.textContent = data.randomPairOfWords.firstWord;
      })
      .catch(error => {
        console.error(error);
      });
  });

changeButton.addEventListener('click', () => {
  backdrop.classList.add('display-block');
  changeUI.classList.add('display-flex');
  SELECTED_UI = 'change';
});

backdrop.addEventListener('click', () => {
    backdrop.classList.remove('display-block');

    switch (SELECTED_UI) {
        case 'change':
            changeUI.classList.remove('display-flex');
            break;
    }
})