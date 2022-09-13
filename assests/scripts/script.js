const randomWord = document.querySelector('h1');
const randomWordInput = document.getElementById('randomWordInput');
const button = document.querySelector('button');

let rndNum;
let words = {
    pan: 'bread',
    rompe: 'to break',
    quierer: 'to want',
    deber: 'must',
    beber: 'to drink',
    comer: 'to eat',
    ver: 'to see',
    ir: 'to go',
    leche: 'milk',
    leer: 'to read',
    escribir: 'to write',
    creer: 'to think',
    estudiar: 'to study',
    comprender: 'to understand',
    ropa: 'clothes',
    tienda: 'shop',
    niña: 'girl',
    niño: 'boy',
    esposo: 'husband',
    esposa: 'wife',
    tío: 'uncle',
    tía: 'aunt',
    hermano: 'brother',
    hermana: 'sister',
    madre: 'mother',
    padre: 'father'
}

function generateNewWord () {
    rndNum = Math.floor(Math.random() * Object.keys(words).length);
    randomWord.textContent = Object.keys(words)[rndNum];
}

function checkWords() {
    if (randomWordInput.value == Object.values(words)[rndNum]) {
        randomWordInput.style.borderBottom = '2px solid #4fbf26';
    } else {
        randomWordInput.style.borderBottom = '2px solid #a7171a';
        randomWordInput.style.color = '#a7171a';
        randomWordInput.value = `${randomWordInput.value}(${Object.values(words)[rndNum]})`
    }
}

button.addEventListener('click', () => {
    if(button.textContent == 'Generate word') {
        randomWordInput.value = '';
        generateNewWord();
        button.textContent = 'Check'
    } else {
        checkWords();
        button.textContent = 'Generating...'
        setTimeout(()=> {
            randomWordInput.style.borderBottom = '2px solid #30363d';
            randomWordInput.style.color = 'white';
            randomWordInput.value = '';
            button.textContent = 'Check'
            generateNewWord();
        }, 1000)
    }
})