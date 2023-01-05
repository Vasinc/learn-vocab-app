// https://1000mostcommonwords.com/1000-most-common-german-words/

// elements
const backdrop = document.getElementById('backdrop');
const failsUI = document.querySelector('.fails-list__UI');
const failsButton = document.querySelector('.fails-list__button');
const failsList = document.querySelector('.fails-list');
const randomWord = document.querySelector('h1');
const randomWordInput = document.getElementById('randomWordInput');
const button = document.getElementById('generate-button');
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
const moneyPopUp = document.querySelector('.money-info__pop-up');
const moneyPopUpNumber = document.querySelector('.money-info__number')
const level = document.getElementById('level');
const currentXp = document.getElementById('currentXP');
const requiredXp = document.getElementById('requiredXP')
const progressBar = document.querySelector('.progress-bar');
const xpPopUp = document.querySelector('.xp-info__pop-up');
const xpPopUpNumber = document.querySelector('.xp-info__number');
const inventoryOptionsContainer = document.querySelector('.inventory-options');
const inventoryOptions = inventoryOptionsContainer.querySelectorAll('button');
const inventoryUIsContainer = document.querySelector('.inventory-UIs');
const inventoryUIs = document.querySelectorAll('section');
// sa restructurez un pic codul aici si la style sass

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
let totalCoins = 0;
let totalXp = 0;
let currentXpNumber = 0;
let requiredXpNumber = 50;
let levelNumber = 1;

// gets information from 1000 words.json
fetch('./assests/scripts/1000 words.json')
    .then(
        response => response.json()
    )
    .then(
        (json) => words = json
    );

onload = () => { // check if you have some data stored, if YES, then it displays it,if NO, then everything is set to default
    if(localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
        if(data.maxComboData) {
            maxComboNumber = data.maxComboData;
        } else {
            maxComboNumber = 0;
        }
        maxCombo.textContent = maxComboNumber;
        if (data.failedWordsData) {
            failedWords = data.failedWordsData;
            updateList();
            failsNumber = failedWords.length;
        }
        fails.textContent = failsNumber;
        totalCombo = data.totalComboData ? data.totalComboData : 0;
        totalFails = data.totalFailsData ? data.totalFailsData : 0;
        totalWords = data.totalWordsData ? data.totalWordsData : 0;
        totalXp = data.totalXpData ? data.totalXpData : 0;
        if(data.moneyData) {
            moneyNumber = data.moneyData;
            updateMoney(0);
            totalCoins = data.totalCoinsData;
        } else {
            moneyNumber = 0;
            updateMoney(0);
        }

        if (data.levelData) {
            level.textContent = data.levelData;
            levelNumber = data.levelData;
            updateXP(data.currentXpNumberData);
            requiredXpNumber = levelNumber * 50;
            requiredXp.textContent = requiredXpNumber;
        } else { 
            return;
        }

        if (data.selectedData) {
            options.value = data.selectedData;
            fetch(`./assests/scripts/${options.value}.json`)
                .then(
                    response => response.json()
                )
                .then(
                    (json) => words = json
                );
        } else {
            return;
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

// FUNCTIONS

function moneyAndXpPopUpAnimation (moneyMultiplier, xpMultiplier) {
    // animation of the coin and xp after you get something right
    let rndNum = Math.trunc(Math.random() * 80)
    moneyPopUp.classList.add('display-flex')
    moneyPopUp.style.left = `${rndNum}%`
    moneyPopUpNumber.textContent = 1 * parseInt(moneyMultiplier);
    xpPopUp.classList.add('display-flex');
    xpPopUp.style.left = `${rndNum}%`
    xpPopUpNumber.textContent = 1 + ((10 + levelNumber - 1) * xpMultiplier) ;
    setTimeout( () => {
       moneyPopUp.classList.add('fade-up-more'); 
       xpPopUp.classList.add('fade-up');
    }, 1 )

    setTimeout( () => {
        moneyPopUp.classList.remove('fade-up-more');
        moneyPopUp.classList.remove('display-flex');
        xpPopUp.classList.remove('fade-up');
        xpPopUp.classList.remove('display-flex')
    }, 800)

}    

function updateMoney (moneyMultiplier) {
    // updates UI of money
    moneyNumber += 1 * parseInt(moneyMultiplier);
    money.textContent = moneyNumber;
}

function updateProgressBar () {
    // updates UI of the xp progress bar
    progressBar.style.width = `${Math.trunc( ( currentXpNumber / requiredXpNumber ) * 100 )}%`
}

function updateLevel () {
    if ( currentXpNumber < requiredXpNumber ) return;

    // updates UI of level
    levelNumber++;
    level.textContent = levelNumber;
    let difference = currentXpNumber - requiredXpNumber;
    currentXpNumber = difference;
    currentXp.textContent = currentXpNumber;
    requiredXpNumber = levelNumber * 50;
    requiredXp.textContent = requiredXpNumber;

    updateProgressBar();
}

function updateXP (addXp) {
    // updates UI of XP
    currentXpNumber += addXp;
    currentXp.textContent = currentXpNumber;
    updateProgressBar();
    updateLevel();
}

function changeVolumeAllSounds () {
    // if i let it to normal volume, it's going to be so loud, so here i reset the volume of the sounds
    clickSound.volume = .5 * SOUND_MULTIPLIER;
    correctSound.volume = .5 * SOUND_MULTIPLIER;
    wrongSound.volume = .5 * SOUND_MULTIPLIER;
    wooshSound.volume = .5 * SOUND_MULTIPLIER;
}

function checkedStyleSoundRange () {
    // redesigns volume range if the button is checked
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
    // redesigns volume range if the button is unchecked
    soundRange.style.cursor = 'not-allowed';
    soundRange.style.filter = 'grayscale(1)';
    soundRange.disabled = true;

    SOUND_MULTIPLIER = 0;
    changeVolumeAllSounds();
}

function generateNewWord () {
    // gets a random word from the selected json files and displays it
    rndNum = Math.floor(Math.random() * Object.keys(words).length);
    randomWord.textContent = Object.keys(words)[rndNum];
}

function generateNewFailedWord () {
    // gets a random word from failed words lists and displays it
    rndFailedNum = Math.floor(Math.random() * failedWords.length);
    randomWord.textContent = failedWords[rndFailedNum].failedWord;
}

function toggleFocus () {
    if (backdrop.classList.contains('display-block') || menuUI.classList.contains('display-flex')) return;
    randomWordInput.focus();
}

function updateList () {
    // adds a new item to fails list
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
    if (randomWordInput.value.toLowerCase().trim() == Object.values(words)[rndNum].toLowerCase()) {
        randomWordInput.style.borderBottom = '2px solid #4fbf26';
        totalCombo++;
        data.totalComboData = totalCombo;
        totalWords++;
        data.totalWordsData = totalWords;
        comboNumber++;
        combo.textContent = comboNumber;
        combo.style.color = '#4fbf26';
        updateMoney(comboNumber);
        moneyAndXpPopUpAnimation(comboNumber, 1);
        data.moneyData = moneyNumber;
        totalCoins += 1 * comboNumber;
        data.totalCoinsData = totalCoins;
        updateXP(10 + levelNumber);
        data.levelData = levelNumber;
        data.currentXpNumberData = currentXpNumber;
        totalXp += 10 + levelNumber;
        data.totalXpData = totalXp;
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
        totalCoins ++;
        data.totalCoinsData = totalCoins;
        updateXP(1);
        data.levelData = levelNumber;
        data.currentXpNumberData = currentXpNumber
        totalXp++;
        data.totalXpData = totalXp;
        moneyAndXpPopUpAnimation(1, 0);
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

function updateStatsText() {
    document.querySelector('.highest-combo__text').textContent = maxCombo.textContent; 
    document.querySelector('.current-words__text').textContent = combo.textContent;
    document.querySelector('.total-words__text').textContent = totalWords;
    document.querySelector('.total-combo__text').textContent = totalCombo;
    document.querySelector('.total-fails__text').textContent = totalFails;
    document.querySelector('.total-coins__text').textContent = totalCoins;
    document.querySelector('.total-XP__text').textContent = totalXp;
}

// EVENT LISTENERS

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

backdrop.addEventListener('click', removeBackdrop);

burgerMenu.addEventListener('click', () => {
    menuUI.classList.add('display-flex');
})

menuUI.addEventListener('click', event => {
    updateStatsText();
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

    data.selectedData = options.value;
    localStorage.setItem('data', JSON.stringify(data));
})

soundCheck.addEventListener('change', () => {
    if(soundCheck.checked) {
        checkedStyleSoundRange();
    } else {
        uncheckedStyleSoundRange();
    }
})

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

inventoryOptionsContainer.addEventListener('click', event => {
    if(event.target.className == 'inventory-options') return;
    let inventoryOption = event.target;

    for(let i = 0; i < inventoryOptions.length; i++) {
        const element = inventoryOptions[i];
        if (inventoryOption == element) {
            element.style.background = '#a53b70';
            for(let j = 0; j < inventoryUIs.length; j++) {
                const selement = inventoryUIs[j];
                selement.style.left = `${i * -100}%`
            }
        } else {
            element.style.background = '#738bb0';

        }
    }
})