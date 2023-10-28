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