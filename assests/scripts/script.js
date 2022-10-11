// https://1000mostcommonwords.com/1000-most-common-german-words/

const backdrop = document.getElementById('backdrop');
const failsUI = document.querySelector('.fails-list__UI');
const failsButton = document.querySelector('.fails-list__button');
const failsList = document.querySelector('.fails-list');
const randomWord = document.querySelector('h1');
const randomWordInput = document.getElementById('randomWordInput');
const button = document.querySelector('button');
const combo = document.getElementById('combo');
const fails = document.getElementById('fails');
const maxCombo = document.getElementById('max-combo');

let comboNumber = parseInt(combo.textContent);
let failsNumber = parseInt(fails.textContent);
let maxComboNumber = parseInt(maxCombo.textContent);
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
        if (comboNumber > maxComboNumber ) {
            maxComboNumber = comboNumber;
            maxCombo.textContent = maxComboNumber;
        }
    } else {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="word">${Object.keys(words)[rndNum]} </span>( <span class="wrong-word">${randomWordInput.value}</span> ) - <span class="correct-word">${Object.values(words)[rndNum]}</span>
        `;
        failsList.appendChild(li);
        randomWordInput.style.borderBottom = '2px solid #a7171a';
        randomWordInput.style.color = '#a7171a';
        randomWordInput.value = `${randomWordInput.value}(${Object.values(words)[rndNum]})`
        comboNumber = 0;
        combo.textContent = comboNumber;
        combo.style.color = 'white';
        failsNumber++;
        fails.textContent = failsNumber;
        setTimeout(() => {
            combo.style.color = 'white';
        }, 1000)
    }
}

function removeBackdrop () {
    document.body.style.overflow = 'visible';
    backdrop.classList.remove('display-block');
    failsUI.classList.remove('display-flex');
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
        }, 2000)
    }
})

failsButton.addEventListener('click', () => {
    backdrop.scrollIntoView();
    document.body.style.overflow = 'hidden';
    backdrop.classList.add('display-block');
    failsUI.classList.add('display-flex');
})

backdrop.addEventListener('click', removeBackdrop);