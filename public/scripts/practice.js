const backdrop = document.getElementById('backdrop');
const changeButton = document.getElementById('changeButton');
const changeUI = document.getElementById('changeUI');
const randomText = document.getElementById('random-text');
const randomWordButton = document.getElementById('randomWordButton');

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
})

backdrop.addEventListener('click', () => {
  backdrop.classList.remove('display-block');
  changeUI.classList.remove('display-flex');
})