// https://1000mostcommonwords.com/1000-most-common-german-words/

// elements
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
const burgerMenu = document.querySelector('.burger-menu');
const menuUI = document.querySelector('.menu-UI');
const options = document.getElementById('options');
const delayRange = document.getElementById('delay-range');
const delayRangeNumber = document.querySelector('.delay-range__number');
const soundCheck = document.getElementById('soundsCheck');
const soundRange = document.getElementById('sounds-range');
const soundRangeNumber = document.querySelector('.sounds-range__number');
const money = document.querySelector('.money');

// sa ti dea un 1 * combo banuti odata ce ghicesti un cuvant

// sa apara o animatie cu 3x banuti.jpg, pozitie random pe langa
// input si sa dea fade in sus

delayRange.oninput = () => {
    delayRangeNumber.textContent = delayRange.value;
    DELAY_NUMBER = parseInt(delayRange.value);

    optionsData.delayRangeData = delayRange.value;
    localStorage.setItem('optionsData', JSON.stringify(optionsData));
}

soundRange.oninput = () => {
    soundRangeNumber.textContent = soundRange.value;
    SOUND_MULTIPLIER = parseFloat(soundRange.value / 100);
    console.log(clickSound.volume);

    optionsData.soundRangeData = soundRange.value;
    localStorage.setItem('optionsData', JSON.stringify(optionsData));
    changeVolumeAllSounds();
}

// global variables
let option;
let DELAY_NUMBER;
let SOUND_MULTIPLIER = 1;

// sounds
const clickSound = new Audio('./sounds/click.mp3');
const correctSound = new Audio('./sounds/correct.mp3');
const wrongSound = new Audio('./sounds/wrong.mp3'); 
const wooshSound = new Audio('./sounds/woosh.mp3');

// defaul volume of sounds
clickSound.volume = .5;
correctSound.volume = .5;
wrongSound.volume = .5;
wooshSound.volume = .5;

let failedWords = [];
let data = {};
let optionsData = {};

// number value of elements
let comboNumber = parseInt(combo.textContent);
let failsNumber = parseInt(fails.textContent);
let maxComboNumber = parseInt(maxCombo.textContent);
let words;
let rndNum;
let rndFailedNum;
let moneyNumber = parseInt(money.textContent);
let totalWords = 0;
let totalCombo = 0;
let totalFails = 0;

onload = () => {
    if(localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
        if(data.maxComboData) {
            maxComboNumber = data.maxComboData;
        } else {
            maxComboNumber = 0;
        }
        maxCombo.textContent = maxComboNumber;
        failedWords = data.failedWordsData;
        updateList();
        failsNumber = failedWords.length;
        fails.textContent = failsNumber;
        totalCombo = data.totalComboData;
        totalFails = data.totalFailsData;
        totalWords = data.totalWordsData;
        if(data.moneyData) {
            moneyNumber = data.moneyData;
            updateMoney();
        } else {
            moneyNumber = 0;
            updateMoney();
        }
    }

    if(localStorage.getItem('optionsData')) {
        optionsData = JSON.parse(localStorage.getItem('optionsData'));
        retrievedData = optionsData.delayRangeData;
        delayRangeNumber.textContent = retrievedData;
        delayRange.value = parseInt(retrievedData);
        DELAY_NUMBER = parseInt(retrievedData);
    } else {
        delayRangeNumber.textContent = '1150';
        delayRange.value = 1150;
        DELAY_NUMBER = 1150;
        optionsData.delayRangeData = delayRange.value;
        localStorage.setItem('optionsData', JSON.stringify(optionsData));
        optionsData.soundRangeData = 100;
        localStorage.setItem('optionsData', JSON.stringify(optionsData));
    }

    if(localStorage.getItem('optionsData')) { 
        optionsData = JSON.parse(localStorage.getItem('optionsData'));
        retrievedData = optionsData.soundRangeData;
        soundRangeNumber.textContent = retrievedData;
        soundRange.value = parseInt(retrievedData);
        SOUND_MULTIPLIER = parseFloat(retrievedData);
    } else {
        soundRangeNumber.textContent = '100';
        soundRange.value = 100;
        optionsData.delayRangeData = delayRange.value;
        localStorage.setItem('optionsData', JSON.stringify(optionsData));
        optionsData.soundRangeData = soundRange.value;
        localStorage.setItem('optionsData', JSON.stringify(optionsData));
    }
}

fetch('./assests/scripts/1000 words.json')
    .then(
        response => response.json()
    )
    .then(
        (json) => words = json
    );

function updateMoney (moneyMultiplier) {
    moneyNumber += 1 * parseInt(moneyMultiplier);
    money.textContent = moneyNumber;
}

function changeVolumeAllSounds () {
    clickSound.volume = .5 * SOUND_MULTIPLIER;
    correctSound.volume = .5 * SOUND_MULTIPLIER;
    wrongSound.volume = .5 * SOUND_MULTIPLIER;
    wooshSound.volume = .5 * SOUND_MULTIPLIER;
}

function checkedStyleSoundRange () {
    soundRange.style.cursor = 'pointer';
    soundRange.style.filter = 'grayscale(0)';
    soundRange.disabled = false;

    if(localStorage.getItem('optionsData')) { 
        optionsData = JSON.parse(localStorage.getItem('optionsData'));
        SOUND_MULTIPLIER = parseFloat(parseInt(optionsData.soundRangeData) / 100);
        changeVolumeAllSounds();
    } else {
        SOUND_MULTIPLIER = 1
        changeVolumeAllSounds();
    }
}

function uncheckedStyleSoundRange () {
    soundRange.style.cursor = 'not-allowed';
    soundRange.style.filter = 'grayscale(1)';
    soundRange.disabled = true;

    SOUND_MULTIPLIER = 0;
    changeVolumeAllSounds();
}

function generateNewWord () {
    rndNum = Math.floor(Math.random() * Object.keys(words).length);
    randomWord.textContent = Object.keys(words)[rndNum];
}

function generateNewFailedWord () {
    rndFailedNum = Math.floor(Math.random() * failedWords.length);
    randomWord.textContent = failedWords[rndFailedNum].failedWord;
}

function toggleFocus () {
    if (backdrop.classList.contains('display-block') || menuUI.classList.contains('display-flex')) return;
    randomWordInput.focus();
}

function updateList () {
    failsList.innerHTML = '';
    for (let i = 0; i < failedWords.length; i++) {
        const failedWord = failedWords[i];
        const li = document.createElement('li');
        li.innerHTML = `
                <span class="word">${failedWord.failedWord} </span>( <span class="wrong-word">${failedWord.typedWord}</span> ) - <span class="correct-word">${failedWord.correctWord}</span>
        `;
        failsList.appendChild(li);
    }
}

function checkWords() {
    if (randomWordInput.value.toLowerCase().trim() == Object.values(words)[rndNum]) {
        randomWordInput.style.borderBottom = '2px solid #4fbf26';
        totalCombo++;
        data.totalComboData = totalCombo;
        totalWords++;
        data.totalWordsData = totalWords;
        comboNumber++;
        combo.textContent = comboNumber;
        combo.style.color = '#4fbf26';
        updateMoney(comboNumber);
        data.moneyData = moneyNumber;
        if (comboNumber > maxComboNumber ) {
            maxComboNumber = comboNumber;
            maxCombo.textContent = maxComboNumber;
            data.maxComboData = maxComboNumber;
        }
        correctSound.play();
    } else {
        failedWords.push({failedWord: Object.keys(words)[rndNum], typedWord: randomWordInput.value, correctWord: Object.values(words)[rndNum]});
        updateList();
        data.failedWordsData = failedWords;
        randomWordInput.style.borderBottom = '2px solid #a7171a';
        randomWordInput.style.color = '#a7171a';
        randomWordInput.value = `${randomWordInput.value}(${Object.values(words)[rndNum]})`
        comboNumber = 0;
        combo.textContent = comboNumber;
        combo.style.color = 'white';
        failsNumber++;
        fails.textContent = failsNumber;
        totalFails++
        data.totalFailsData = totalFails;
        totalWords++;
        data.totalWordsData = totalWords;
        setTimeout(() => {
            combo.style.color = 'white';
        }, DELAY_NUMBER)
        wrongSound.play();
    }

    localStorage.setItem('data', JSON.stringify(data));
}

function checkFailedWords () {
    if (failedWords[rndFailedNum].correctWord == randomWordInput.value.toLowerCase().trim()) {
        failedWords.splice(rndFailedNum, 1);
        updateMoney(1);
        updateList();
        data.failedWordsData = failedWords;
        failsNumber--;
        fails.textContent = failsNumber;
        randomWordInput.style.borderBottom = '2px solid #4fbf26';
        correctSound.play();
    } else {
        randomWordInput.style.borderBottom = '2px solid #a7171a';
        wrongSound.play();
        return;
    }
    localStorage.setItem('data', JSON.stringify(data));
}

function removeBackdrop () {
    document.body.style.overflow = 'visible';
    backdrop.classList.remove('display-block');
    failsUI.classList.remove('display-flex');
    if(!option) return;
    option.classList.remove('display-block');
}

button.addEventListener('click', event => {
    event.preventDefault();
    switch (button.textContent) {
        case 'Generate word':
            randomWordInput.value = '';
            generateNewWord();
            button.textContent = 'Check'
            clickSound.play();
            break;

        case 'Check':
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
                toggleFocus();
            }, DELAY_NUMBER*2)
            break;
        
        case 'From failed words':
            clickSound.play();
            randomWordInput.value = '';
            generateNewFailedWord();
            button.textContent = 'Check failed word'
            break;

        case 'Check failed word':
            checkFailedWords();
            button.textContent = 'Generating...'
            button.style.cursor = 'not-allowed'
            randomWordInput.disabled = true
            setTimeout(()=> {
                if ( failsNumber == 0 ) {
                    button.textContent = 'Generate word';
                    randomWord.textContent = 'Random word';
                    randomWordInput.style.borderBottom = '2px solid #30363d';
                    randomWordInput.style.color = 'white';
                    randomWordInput.value = '';
                    button.style.cursor = 'pointer'
                    randomWordInput.disabled = false
                    toggleFocus();
                } else {
                    randomWordInput.style.borderBottom = '2px solid #30363d';
                    randomWordInput.style.color = 'white';
                    randomWordInput.value = '';
                    button.textContent = 'Check failed word'
                    button.style.cursor = 'pointer'
                    randomWordInput.disabled = false
                    generateNewFailedWord();
                    toggleFocus();
                }
            }, DELAY_NUMBER * 2)
            break;
    }
})

failsButton.addEventListener('click', () => {
    backdrop.scrollIntoView();
    document.body.style.overflow = 'hidden';
    backdrop.classList.add('display-block');
    failsUI.classList.add('display-flex');
    clickSound.play();
})

backdrop.addEventListener('click', removeBackdrop);

fails.addEventListener('click', () => {
    if (button.textContent == 'Generating...') return;

    if (button.textContent == 'From failed words' || button.textContent == 'Check failed word') {
        button.textContent = 'Generate word';
        randomWord.textContent = 'Random word';
        wooshSound.play();
        setTimeout(() => {
            wooshSound.pause();
            wooshSound.currentTime = 0;
        }, Math.trunc(DELAY_NUMBER / 3));
    } else  if (failsNumber > 0){
        button.textContent = 'From failed words'
        randomWord.textContent = 'Random word';
        wooshSound.play();
        setTimeout(() => {
            wooshSound.pause();
            wooshSound.currentTime = 0;
        }, 300);
    }

})

burgerMenu.addEventListener('click', () => {
    menuUI.classList.add('display-flex');
})

menuUI.addEventListener('click', event => {
    if(event.target.tagName != 'LI') {
        menuUI.classList.remove('display-flex');
    } else {
        option = document.querySelector(`.${event.target.textContent.trim().toLowerCase()}-UI`)
        option.classList.add('display-block');
        backdrop.classList.add('display-block');
        menuUI.classList.remove('display-flex');
    }
})

options.addEventListener('change', () => {
    fetch(`./assests/scripts/${options.value}.json`)
    .then(
        response => response.json()
    )
    .then(
        (json) => words = json
    );

    button.textContent = 'Generate word';
    randomWord.textContent = 'Random word';
})

soundCheck.addEventListener('change', () => {
    if(soundCheck.checked) {
        checkedStyleSoundRange();
    } else {
        uncheckedStyleSoundRange();
    }
})