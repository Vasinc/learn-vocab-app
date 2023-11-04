// variables
const backdrop = document.getElementById('backdrop');
const addWordsMain = document.getElementById('add-words__main');
const addParentUI = document.getElementById('add-parentUI');
const parentsContainer = document.querySelector('.parents-container');
const parentContainerTitles = document.querySelectorAll('.parent-container-title');
const addParentForm = document.getElementById('addParentForm');
const parentName = document.getElementById('parentName');
const parentBackground = document.getElementById('parentBackground');
const parentTextColor = document.getElementById('parentTextColor');
const previewParent = document.getElementById('previewParent');

//buttons
const addParentButton = document.getElementById('add-parent__button');

// global variables
let SELECTED_UI;


// functions


// event listeners
addWordsMain.addEventListener('click', event => {
    if(event.target.className !== 'parent-container-title' && event.target.className !== 'parent-symbol') {
        parentContainerTitles.forEach(parentTitle => {
            const parent = parentTitle.parentNode;
            parent.style.maxHeight = '3.18rem'
            parentTitle.querySelector('.parent-symbol').textContent = '+';
            return;
        })
    };
    const selectedParentTitle = (event.target.className == 'parent-container-title') ? event.target : event.target.parentNode;
    
    parentContainerTitles.forEach(parentTitle => {
        const parent = parentTitle.parentNode;
        if (parentTitle == selectedParentTitle) {
            parent.style.maxHeight = '100%'
            parentTitle.querySelector('.parent-symbol').textContent = '-';
        } else {
            parent.style.maxHeight = '3.18rem'
            parentTitle.querySelector('.parent-symbol').textContent = '+';
        }
    })
})

addParentButton.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    addParentUI.classList.add('display-flex');
    SELECTED_UI = 'add-parent';
});

backdrop.addEventListener('click', () => {
    backdrop.classList.remove('display-block');

    switch (SELECTED_UI) {
        case 'add-parent':
            addParentUI.classList.remove('display-flex');
            break;
    }
})

parentName.addEventListener('change', () => {
    previewParent.textContent = parentName.value;
})

parentBackground.addEventListener('change', () => {
    previewParent.style.background = `${parentBackground.value}`
})

parentTextColor.addEventListener('change', () => {
    previewParent.style.color = `${parentTextColor.value}`
})

// addParentForm.addEventListener('submit', event => {
//     event.preventDefault()
// })