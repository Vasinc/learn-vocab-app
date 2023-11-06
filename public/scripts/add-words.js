// variables
const backdrop = document.getElementById('backdrop');
const secondBackdrop = document.getElementById('second-backdrop');
const addWordsMain = document.getElementById('add-words__main');
const addParentUI = document.getElementById('add-parentUI');
const parentsContainer = document.querySelector('.parents-container');
const parentContainerTitles = document.querySelectorAll('.parent-container-title');
const addParentForm = document.getElementById('addParentForm');
const parentName = document.getElementById('parentName');
const parentBackground = document.getElementById('parentBackground');
const parentTextColor = document.getElementById('parentTextColor');
const previewParent = document.getElementById('previewParent');
const addChildUI = document.getElementById('add-childUI');
const childName = document.getElementById('childName');
const childBackground = document.getElementById('childBackground');
const childTextColor = document.getElementById('childTextColor');
const previewChild = document.getElementById('previewChild');
const selectParentList = document.getElementById('select-parent-list');
const selectedParentId = document.getElementById('selectedParentId');

//buttons
const addParentButton = document.getElementById('add-parent__button');
const addChildButton = document.getElementById('add-child__button');
const selectParentButton = document.getElementById('select-parent');

// global variables
let SELECTED_UI;
let SELECTED_SECOND_UI;


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

addChildButton.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    addChildUI.classList.add('display-flex');
    SELECTED_UI = 'add-child';
})

backdrop.addEventListener('click', () => {
    backdrop.classList.remove('display-block');

    switch (SELECTED_UI) {
        case 'add-parent':
            addParentUI.classList.remove('display-flex');
            break;
        case 'add-child':
            addChildUI.classList.remove('display-flex')
            break;
    }
})

secondBackdrop.addEventListener('click', () => {
    secondBackdrop.classList.remove('display-block');

    switch (SELECTED_SECOND_UI) {
        case 'select-parent': 
            selectParentList.classList.remove('display-flex')
            break;
    }
})

selectParentButton.addEventListener('click', () => {
    secondBackdrop.classList.add('display-block');
    selectParentList.classList.add('display-flex');
    SELECTED_SECOND_UI = 'select-parent';
})

selectParentList.addEventListener('click', event => {
    if (event.target.className !== 'list-parent' && event.target.className !== 'list-parent-name') return;
    const selectedParent = (event.target.className == 'list-parent') ? event.target : event.target.parentNode;
    const selectedParentInputValue = selectedParent.querySelector('input').value;
    selectedParentId.value = selectedParentInputValue;
    selectParentButton.style.background = selectedParent.style.background;
    selectParentButton.style.color = selectedParent.querySelector('p').style.color;
    selectParentButton.textContent = selectedParent.querySelector('p').textContent;
    selectParentButton.style.border = 'none';

    secondBackdrop.classList.remove('display-block');
    selectParentList.classList.remove('display-flex')
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




childName.addEventListener('change', () => {
    previewChild.textContent = childName.value;
})

childBackground.addEventListener('change', () => {
    previewChild.style.background = `${childBackground.value}`
})

childTextColor.addEventListener('change', () => {
    previewChild.style.color = `${childTextColor.value}`
})

// DISPLAY CHILDREN
// MAKE ADD WORDS BUTTON WORK
// MAKE MAIN PAGE WORK