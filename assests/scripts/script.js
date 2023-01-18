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
const inventoryUIs = inventoryUIsContainer.querySelectorAll('section');
const shopOptionsContainer = document.querySelector('.shop-options');
const shopOptions = shopOptionsContainer.querySelectorAll('button');
const shopUIsContainer = document.querySelector('.shop-UIs');
const shopUIs = shopUIsContainer.querySelectorAll('section');
const shopCoins = document.querySelectorAll('.shop-UI-money');
const shopBoostsContainer = document.querySelector('.shop-boosts__content');
const shopBoosts = document.querySelectorAll('.shop-boost');
const shopBuyButtons = shopBoostsContainer.querySelectorAll('.shop-boost__button');
const inventoryBoostsContainer = document.querySelector('.inventory-boosts__content');
const inventoryBoosts = document.querySelectorAll('.inventory-boost');
const inventoryUseButtons = inventoryBoostsContainer.querySelectorAll('.inventory-boost__button');
const inventoryBoostsCount = inventoryBoostsContainer.querySelectorAll('.inventory-boost__button-count');
const shopSkinsContainer = document.querySelector('.shop-skins__content');
const shopSkins = document.querySelectorAll('.shop-skin');
const shopBuySkins = shopSkinsContainer.querySelectorAll('.shop-skin__button')

console.log(shopSkins)

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
let boostsData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let skinsData = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

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
let isUsingBoost = false;
let indexOfUsedBoost = 0;
let boostSecondsLeft = 300;
let boostMoneyMultiplier = 1;
let boostXPMultiplier = 1;
let isUsingNoFailsBoost = false;

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
            updateShopMoney(moneyNumber);
        } else {
            moneyNumber = 0;
            updateMoney(0);
            updateShopMoney(moneyNumber);
        }

        if (data.levelData) {
            level.textContent = data.levelData;
            levelNumber = data.levelData;
            currentXpNumber = data.currentXpNumberData;
            currentXp.textContent = currentXpNumber;
            requiredXpNumber = levelNumber * 50;
            requiredXp.textContent = requiredXpNumber;
            updateProgressBar();
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

        updateColorShopButton();
        updateColorSkinsButton();
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

    if(localStorage.getItem('boostsData')) {
        boostsData = JSON.parse(localStorage.getItem('boostsData'));
    } else {
        return;
    }
    updateDataAndColorsInventoryButton();

    if(localStorage.getItem('isUsingBoostData')) {
        isUsingBoost = JSON.parse(localStorage.getItem('isUsingBoostData'));
        indexOfUsedBoost = JSON.parse(localStorage.getItem('indexOfUsedBoostData'));
        const wholePart = Math.trunc(indexOfUsedBoost / 3);
        const restPart = indexOfUsedBoost - (wholePart * 3);
        if(isUsingBoost) {
            inventoryUseButtons.forEach(invButton => {
                invButton.style.background = '#30363d';
                invButton.style.cursor = 'not-allowed';
            })

            inventoryUseButtons[indexOfUsedBoost].style.background = '#f8f29a'
            inventoryUseButtons[indexOfUsedBoost].style.color = '#0d1117'

            
            updateBoostValues(1.5, 2, 3, true)
            boostSecondsLeft = JSON.parse(localStorage.getItem('boostSecondsLeftData'));
            const boostInterval = setInterval(() => {
            boostSecondsLeft --;
            localStorage.setItem('boostSecondsLeftData', JSON.stringify(boostSecondsLeft));
            inventoryUseButtons[indexOfUsedBoost].innerHTML = `In Use ( <span class="inventory-boost__button-count">${Math.floor(boostSecondsLeft / 60)}:${boostSecondsLeft - (Math.floor(boostSecondsLeft / 60) * 60)}</span> )`
    
                if(boostSecondsLeft == 0) {
                    clearInterval(boostInterval);
                    isUsingBoost = false;
                    localStorage.setItem('isUsingBoostData', JSON.stringify(isUsingBoost));
    
                    inventoryUseButtons[indexOfUsedBoost].innerHTML = `Use (<span class="inventory-boost__button-count">${boostsData[wholePart][restPart] }</span>)`

                    updateDataAndColorsInventoryButton();
    
                    boostSecondsLeft = 300;
                    localStorage.setItem('boostSecondsLeftData', JSON.stringify(boostSecondsLeft));

                    updateBoostValues(1, 1, 1, false)
                }
            }, 1000);
        } else {
            updateDataAndColorsInventoryButton();
        }
    } 

    if(localStorage.getItem('skinsData')) {
        skinsData = JSON.parse(localStorage.getItem('skinsData'));
        updateColorSkinsButton();
    } else {
        return;
    }
}

// FUNCTIONS

function moneyAndXpPopUpAnimation (moneyMultiplier, xpMultiplier) {
    // animation of the coin and xp after you get something right
    let rndNum = Math.trunc(Math.random() * 80)
    moneyPopUp.classList.add('display-flex')
    moneyPopUp.style.left = `${rndNum}%`
    moneyPopUpNumber.textContent = boostMoneyMultiplier * parseInt(moneyMultiplier);
    xpPopUp.classList.add('display-flex');
    xpPopUp.style.left = `${rndNum}%`
    xpPopUpNumber.textContent = ( xpMultiplier == 0) ? 1 * boostXPMultiplier : (10 + levelNumber) * boostXPMultiplier ;
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
    moneyNumber += Math.trunc( parseInt(moneyMultiplier) * boostMoneyMultiplier );
    money.textContent = moneyNumber;
}

function updateShopMoney (number) {
    shopCoins.forEach(shopCoin => {
        shopCoin.textContent = number;
    });
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
    currentXpNumber += Math.trunc( addXp * boostXPMultiplier );
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
        updateShopMoney(moneyNumber)
        moneyAndXpPopUpAnimation(comboNumber, 1);
        data.moneyData = moneyNumber;
        totalCoins += 1 * comboNumber;
        data.totalCoinsData = totalCoins;
        updateXP((10 + levelNumber));
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
        if (!isUsingNoFailsBoost) {
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
        } else {
            return;
        }
    }

    localStorage.setItem('data', JSON.stringify(data));
}

function checkFailedWords () {
    if (failedWords[rndFailedNum].correctWord == randomWordInput.value.toLowerCase().trim()) {
        failedWords.splice(rndFailedNum, 1);
        updateMoney(1);
        totalCoins ++;
        data.totalCoinsData = totalCoins;
        updateShopMoney(moneyNumber);
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

function updateColorShopButton() {
    shopBoosts.forEach(shopBoost => {
        const shopButton = shopBoost.querySelector('.shop-boost__button');
        if(moneyNumber >= parseInt(shopBoost.getAttribute('data-price'))) {
            shopButton.style.background = '#4fbf26';
            shopButton.style.color = '#0d1117';
            shopButton.style.cursor = 'pointer';
        } else {
            shopButton.style.background = '#a7171a';
            shopButton.style.color = '#fff';
            shopButton.style.cursor = 'not-allowed';
        }
    });
}

function updateDataAndColorsInventoryButton() {
    inventoryUseButtons.forEach(invButton => {
        const indexOfInvBtn = Array.prototype.indexOf.call(inventoryUseButtons, invButton);
        const wholePart = Math.trunc(indexOfInvBtn / 3);
        const restPart = indexOfInvBtn - (wholePart * 3);

        inventoryBoostsCount[indexOfInvBtn].textContent = boostsData[wholePart][restPart]
        if(boostsData[wholePart][restPart] > 0) {
            invButton.style.background = '#4fbf26';
            invButton.style.color = '#fff'
            invButton.style.cursor = 'pointer';
        } else {
            invButton.style.background = '#30363d';
            invButton.style.color = '#fff';
            invButton.style.cursor = 'not-allowed';
        }
    });
}

function updateBoostValues(moneyAndxp1, moneyAndxp2, moneyAndxp3, booleanBoost) {
    indexOfUsedBoost = JSON.parse(localStorage.getItem('indexOfUsedBoostData'));
    const wholePart = Math.trunc(indexOfUsedBoost / 3);
    const restPart = indexOfUsedBoost - (wholePart * 3);
    switch (wholePart) {
        case 0:
            switch (restPart) {
                case 0:
                    boostMoneyMultiplier = moneyAndxp1
                    break;
            
                case 1:
                    boostMoneyMultiplier = moneyAndxp2
                    break;

                case 2:
                    boostMoneyMultiplier = moneyAndxp3
                    break;
            }    

            break;
    
        case 1:
            switch (restPart) {
                case 0:
                    boostXPMultiplier = moneyAndxp1
                    break;
            
                case 1:
                    boostXPMultiplier = moneyAndxp2
                    break;

                case 2:
                    boostXPMultiplier = moneyAndxp3
                    break;

                } 
            break;

        case 2:
            switch (restPart) {
                case 0:
                    isUsingNoFailsBoost = booleanBoost ;
                    break;
            
                case 1:
                    isUsingNoFailsBoost = booleanBoost;
                    break;

                case 2:
                    isUsingNoFailsBoost = booleanBoost;
                    break;

                } 
            break;
    }
}

function updateColorSkinsButton() {
        shopBuySkins.forEach(skinButton => {
            const indexOfButton = Array.prototype.indexOf.call(shopBuySkins, skinButton);
            const wholePart = Math.trunc(indexOfButton / 3);
            const restPart = indexOfButton - (wholePart * 3);

            if(moneyNumber >= parseInt(skinButton.getAttribute('data-price'))) {
                skinButton.style.background = '#4fbf26';
                skinButton.style.color = '#0d1117';
                skinButton.style.cursor = 'pointer';
            } else {
                skinButton.style.background = '#a7171a';
                skinButton.style.color = '#fff';
                skinButton.style.cursor = 'not-allowed';
            }

            if (skinsData[wholePart][restPart] == 1) {
                skinButton.innerHTML = 'Bought';
                skinButton.style.background  = '#30363d';
                skinButton.style.color = '#fff';
                skinButton.style.cursor = 'not-allowed';
                skinButton.style.borderBottomLeftRadius = '.5rem';
                skinButton.style.borderBottomRightRadius = '.5rem';
            }
        });
    };


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
    updateStatsText();
    updateColorShopButton();
    updateColorSkinsButton();
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

shopOptionsContainer.addEventListener('click', event => {
    if(event.target.className == 'shop-options') return;
    let shopOption = event.target;

    for(let i = 0; i < shopOptions.length; i++) {
        const element = shopOptions[i];
        if (shopOption == element) {
            element.style.background = '#a53b70';
            for(let j = 0; j < shopUIs.length; j++) {
                const selement = shopUIs[j];
                selement.style.left = `${i * -100}%`
            }
        } else {
            element.style.background = '#738bb0';

        }
    }
})

shopBoostsContainer.addEventListener('click', event => {
    if(event.target.tagName != 'BUTTON' && event.target.tagName != 'IMG' ) return;
    const selectedBuyButton = (event.target.tagName == 'BUTTON') ? event.target : event.target.parentElement;
    if (selectedBuyButton.style.cursor == 'pointer') {
        const indexOfButton = Array.prototype.indexOf.call(shopBuyButtons, selectedBuyButton);
        const wholePart = Math.trunc(indexOfButton / 3);
        const restPart = indexOfButton - (wholePart * 3);

        moneyNumber -= parseInt(selectedBuyButton.getAttribute('data-price'));
        updateMoney(0);
        updateShopMoney(moneyNumber);
        updateColorShopButton();
        data.moneyData = moneyNumber;
        localStorage.setItem('data', JSON.stringify(data));
        boostsData[wholePart][restPart] += 1;
        localStorage.setItem('boostsData', JSON.stringify(boostsData));

        updateDataAndColorsInventoryButton();
    }
})

inventoryBoostsContainer.addEventListener('click', event => {
    if(event.target.tagName != 'BUTTON' && event.target.tagName != 'SPAN' ) return;
    const selectedButton = (event.target.tagName == 'BUTTON') ? event.target : event.target.parentElement;
    if (selectedButton.style.cursor == 'pointer' ) {
        const indexOfButton = Array.prototype.indexOf.call(inventoryUseButtons, selectedButton);
        const wholePart = Math.trunc(indexOfButton / 3);
        const restPart = indexOfButton - (wholePart * 3);

        boostsData[wholePart][restPart] -= 1;
        localStorage.setItem('boostsData', JSON.stringify(boostsData));

        isUsingBoost = true;
        localStorage.setItem('isUsingBoostData', JSON.stringify(isUsingBoost));
        localStorage.setItem('indexOfUsedBoostData', JSON.stringify(indexOfButton));

        inventoryUseButtons.forEach(invButton => {
            invButton.style.background = '#30363d';
            invButton.style.cursor = 'not-allowed';
        })

        selectedButton.style.background = '#f8f29a'
        selectedButton.style.color = '#0d1117'

        selectedButton.innerHTML = `In Use ( <span class="inventory-boost__button-count">${Math.floor(boostSecondsLeft / 60)}:${boostSecondsLeft - (Math.floor(boostSecondsLeft / 60) * 60)}</span> )`

        switch (wholePart) {
            case 0:
                switch (restPart) {
                    case 0:
                        boostMoneyMultiplier = 1.5
                        break;
                
                    case 1:
                        boostMoneyMultiplier = 2
                        break;

                    case 2:
                        boostMoneyMultiplier = 3
                        break;
                }    

                break;
        
            case 1:
                switch (restPart) {
                    case 0:
                        boostXPMultiplier = 1.5
                        break;
                
                    case 1:
                        boostXPMultiplier = 2
                        break;

                    case 2:
                        boostXPMultiplier = 3
                        break;

                    } 
                break;

            case 2:
                switch (restPart) {
                    case 0:
                        isUsingNoFailsBoost = true;
                        boostSecondsLeft = 60;
                        break;
                
                    case 1:
                        isUsingNoFailsBoost = true;
                        boostSecondsLeft = 120;
                        break;

                    case 2:
                        isUsingNoFailsBoost = true;
                        boostSecondsLeft = 180;
                        break;

                    } 
                break;
        }

        const boostInterval = setInterval(() => {
            boostSecondsLeft --;
            localStorage.setItem('boostSecondsLeftData', JSON.stringify(boostSecondsLeft));
            selectedButton.innerHTML = `In Use ( <span class="inventory-boost__button-count">${Math.floor(boostSecondsLeft / 60)}:${boostSecondsLeft - (Math.floor(boostSecondsLeft / 60) * 60)}</span> )`

            if(boostSecondsLeft == 0) {
                clearInterval(boostInterval);
                isUsingBoost = false;
                localStorage.setItem('isUsingBoostData', JSON.stringify(isUsingBoost));

                
                selectedButton.innerHTML = `Use (<span class="inventory-boost__button-count">${boostsData[wholePart][restPart] }</span>)`
                
                updateDataAndColorsInventoryButton();

                boostSecondsLeft = 300;
                localStorage.setItem('boostSecondsLeftData', JSON.stringify(boostSecondsLeft));

                updateBoostValues(1, 1, 1, false)
            }
        }, 1000);
    }
})

shopSkinsContainer.addEventListener('click', event => {
    if(event.target.tagName != 'BUTTON' && event.target.tagName != 'IMG' ) return;
    const selectedBuyButton = (event.target.tagName == 'BUTTON') ? event.target : event.target.parentElement;
    if (selectedBuyButton.style.cursor == 'pointer') {
        const indexOfButton = Array.prototype.indexOf.call(shopBuySkins, selectedBuyButton);
        const wholePart = Math.trunc(indexOfButton / 3);
        const restPart = indexOfButton - (wholePart * 3);

        moneyNumber -= parseInt(selectedBuyButton.getAttribute('data-price'));
        updateMoney(0);
        updateShopMoney(moneyNumber);
        data.moneyData = moneyNumber;
        localStorage.setItem('data', JSON.stringify(data));
        skinsData[wholePart][restPart] += 1;
        localStorage.setItem('skinsData', JSON.stringify(skinsData));
        updateColorSkinsButton();

    }
})