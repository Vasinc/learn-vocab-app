const randomWord = document.querySelector('h1');
const randomWordInput = document.getElementById('randomWordInput');
const button = document.querySelector('button');
const combo = document.getElementById('combo');

let comboNumber = parseInt(combo.textContent);
let words;
let rndNum;

fetch('./assests/scripts/words.json')
    .then(
        response => response.json()
    )
    .then(
        (json) => words = json
    );



function generateNewWord () {
    rndNum = Math.floor(Math.random() * Object.keys(words).length);
    randomWord.textContent = Object.keys(words)[rndNum];
}

function checkWords() {
    if (randomWordInput.value.toLowerCase().trim() == Object.values(words)[rndNum]) {
        randomWordInput.style.borderBottom = '2px solid #4fbf26';
        comboNumber++;
        combo.textContent = comboNumber;
        combo.style.color = '#4fbf26';
    } else {
        randomWordInput.style.borderBottom = '2px solid #a7171a';
        randomWordInput.style.color = '#a7171a';
        randomWordInput.value = `${randomWordInput.value}(${Object.values(words)[rndNum]})`
        comboNumber = 0;
        combo.textContent = comboNumber;
        combo.style.color = '#a7171a';
        setTimeout(() => {
            combo.style.color = 'white';
        }, 1000)
    }
}

button.addEventListener('click', event => {
    event.preventDefault();
    if(button.textContent == 'Generate word') {
        randomWordInput.value = '';
        generateNewWord();
        button.textContent = 'Check'
    } else if(button.textContent == 'Check'){
        checkWords();
        button.textContent = 'Generating...'
        button.style.cursor = 'not-allowed'
        randomWordInput.disabled = true
        setTimeout(()=> {
            randomWordInput.style.borderBottom = '2px solid #30363d';
            randomWordInput.style.color = 'white';
            randomWordInput.value = '';
            button.textContent = 'Check'
            button.style.cursor = 'pointer'
            randomWordInput.disabled = false
            generateNewWord();
            randomWordInput.focus();
        }, 1000)
    }
})