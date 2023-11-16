// variables
const backdrop = document.getElementById('backdrop');
const secondBackdrop = document.getElementById('second-backdrop');
const addWordsMain = document.getElementById('add-words__main');
const addParentUI = document.getElementById('add-parentUI');
const parentsContainer = document.querySelector('.parents-container');
const parentContainerTitles = document.querySelectorAll('.parent-container-title');
const addParentForm = document.getElementById('addParentForm');
const addParentErrorMessage = document.getElementById('parentUI-error-message');
const parentName = document.getElementById('parentName');
const parentBackground = document.getElementById('parentBackground');
const parentTextColor = document.getElementById('parentTextColor');
const previewParent = document.getElementById('previewParent');
const addChildForm = document.getElementById('addChildForm');
const addChildErrorMessage = document.getElementById('childUI-error-message');
const addChildUI = document.getElementById('add-childUI');
const childName = document.getElementById('childName');
const childBackground = document.getElementById('childBackground');
const childTextColor = document.getElementById('childTextColor');
const previewChild = document.getElementById('previewChild');
const childUISelectParent = document.getElementById('childUI-select-parent-list');
const childUISelectedParentId = document.getElementById('childUISelectedParentId');
const addWordsForm = document.getElementById('addWordsForm');
const addWordsErrorMessage = document.getElementById('wordsUI-error-message');
const firstWord = document.getElementById('first-word');
const secondWord = document.getElementById('second-word');
const addWordsUI = document.getElementById('add-wordsUI');
const wordsUISelectParentList = document.getElementById('wordsUI-select-parent-list');
const wordsUISelectChildList = document.getElementById('wordsUI-select-child-list');
const wordsUISelectedParentChildren = document.getElementById('wordsUISelectedParentChildren');
const wordsUISelectedParentId = document.getElementById('wordsUISelectedParentId');
const selectedChildPosition = document.getElementById('selectedWordsChildPosition');
const editUI = document.getElementById('editUI');

//buttons
const addParentButton = document.getElementById('add-parent__button');
const addChildButton = document.getElementById('add-child__button');
const childUISelectedParentButton = document.getElementById('childUI-select-parent');
const addWordsButton = document.getElementById('add-words__button');
const wordsUISelectParentButton = document.getElementById('wordsUI-select-parent');
const wordsUISelectChildButton = document.getElementById('wordsUI-select-child');
const closeMainPageButtons = document.querySelectorAll('.close-main-page');
const editButtons = document.querySelectorAll('.edit-button');

// global variables
let SELECTED_UI;
let SELECTED_SECOND_UI;

// storing variables
let previousWordsUISelectParentButton;


// functions
function populateChildList (childrenValueInput, isParentSelected) {
    const childrenValue = childrenValueInput;
    wordsUISelectChildList.innerHTML = ''
    if (childrenValue.length == 0 && isParentSelected) {
        wordsUISelectChildList.innerHTML = `<h2 class='errorMessage'>The selected parent has no children added!</h2>`
    } else if(isParentSelected) {
        childrenValue.forEach(child => {
            wordsUISelectChildList.innerHTML += `
            <div class="list-words-child" style="background: ${child.childBackground}">
                <p class="list-words-child-name" style="color: ${child.childTextColor}">${child.childName}</p>
                <input type="hidden" value="${child.childPosition}">
            </div>
            `
        })
    }
}

function removeBackdropAndUI () {
    backdrop.classList.remove('display-block');

    switch (SELECTED_UI) {
        case 'add-parent':
            addParentUI.classList.remove('display-flex');
            addParentErrorMessage.innerHTML = '';
            break;
        case 'add-child':
            addChildUI.classList.remove('display-flex');
            addChildErrorMessage.innerHTML = '';
            break;
        case 'add-words':
            addWordsUI.classList.remove('display-flex');
            addWordsErrorMessage.innerHTML = '';
            break;
        case 'edit':
            editUI.classList.remove('display-flex');
            break;
    }
}

function removeSecondBackdropAndUI () {
    secondBackdrop.classList.remove('display-block');

    switch (SELECTED_SECOND_UI) {
        case 'select-parent': 
            childUISelectParent.classList.remove('display-flex');
            addChildErrorMessage.innerHTML = '';
            break;
        case 'select-words-parent':
            wordsUISelectParentList.classList.remove('display-flex');
            addWordsErrorMessage.innerHTML = '';
            break;
        case 'select-words-child':
            wordsUISelectChildList.classList.remove('display-flex');
            addWordsErrorMessage.innerHTML = '';
            break;
    }
}

// event listeners
addWordsMain.addEventListener('click', event => {
    if(event.target.className !== 'parent-container-title' && event.target.className !== 'parent-symbol' && event.target.className !== 'parent-container-text' && event.target.className !== 'settings-button') {
        parentContainerTitles.forEach(parentTitle => {
            const parent = parentTitle.parentNode;
            parent.style.maxHeight = '3.18rem';
            parentTitle.querySelector('.parent-symbol').textContent = '+';
            return;
        })
    };

    const selectedParentTitle = (event.target.className == 'parent-container-title') ? event.target 
                                : (event.target.className == 'parent-container-text') ? event.target.parentNode
                                : (event.target.className == 'parent-container-text') ? event.target.parentNode
                                : (event.target.className == 'parent-symbol') ? event.target.parentNode.parentNode : null;
    
    parentContainerTitles.forEach(parentTitle => {
        const parent = parentTitle.parentNode;
        if (parentTitle == selectedParentTitle && selectedParentTitle) {
            parent.style.maxHeight = '100%';
            parentTitle.querySelector('.parent-symbol').textContent = '-';
        } else {
            parent.style.maxHeight = '3.18rem';
            parentTitle.querySelector('.parent-symbol').textContent = '+';
        }
    })
});

addParentButton.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    addParentUI.classList.add('display-flex');
    SELECTED_UI = 'add-parent';
});

addChildButton.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    addChildUI.classList.add('display-flex');
    SELECTED_UI = 'add-child';
});

addWordsButton.addEventListener('click', () => {
    backdrop.classList.add('display-block');
    addWordsUI.classList.add('display-flex');
    SELECTED_UI = 'add-words';
});

addParentForm.addEventListener('submit', event => {
    if (parentName.value.trim() == '') {
        event.preventDefault();
        addParentErrorMessage.innerHTML = '<p>You must name your parent!</p>';
    }
});

addChildForm.addEventListener('submit', event => {
    addChildErrorMessage.innerHTML = '';
    if (childName.value.trim() == '') {
        event.preventDefault();
        addChildErrorMessage.innerHTML = '<p>You must name your child!</p>';
    }
    if (!childUISelectedParentId.value) {
        event.preventDefault();
        addChildErrorMessage.innerHTML += '<p>You must select a parent!</p>';
    }
});

addWordsForm.addEventListener('submit', event => {
    addWordsErrorMessage.innerHTML = '';
    if (firstWord.value.trim() == '') {
        event.preventDefault();
        addWordsErrorMessage.innerHTML = '<p>You must name the first word!</p>';
    }
    if (secondWord.value.trim() == '') {
        event.preventDefault();
        addWordsErrorMessage.innerHTML += '<p>You must name the second word!</p>';
    }
    if (!wordsUISelectedParentId.value) {
        event.preventDefault();
        addWordsErrorMessage.innerHTML += '<p>You must select a parent!</p>';
    }
    if (!selectedChildPosition.value) {
        event.preventDefault();
        addWordsErrorMessage.innerHTML += '<p>You must select a child!</p>';
    }
});

backdrop.addEventListener('click', removeBackdropAndUI);

closeMainPageButtons.forEach(closeMainButton => {
    closeMainButton.addEventListener('click', removeBackdropAndUI);
});

secondBackdrop.addEventListener('click', removeSecondBackdropAndUI);

editButtons.forEach(editButton => {
    editButton.addEventListener('click', event => {
        event.preventDefault();
        backdrop.classList.add('display-block');
        editUI.classList.add('display-flex');
        SELECTED_UI = 'edit';

        
        const parentId = editButton.parentNode.parentNode.querySelector('[name="parentId"]').value;
        
        fetch(`/api/parentData?parentId=${parentId}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            // populating editUI
            const parentContainer = editButton.parentNode.parentNode;
        })
        .catch(error => {
            console.error(error);
        });

    })
})

childUISelectedParentButton.addEventListener('click', () => {
    secondBackdrop.classList.add('display-block');
    childUISelectParent.classList.add('display-flex');
    SELECTED_SECOND_UI = 'select-parent';
});

childUISelectParent.addEventListener('click', event => {
    if (event.target.className !== 'list-parent' && event.target.className !== 'list-parent-name') return;
    const selectedParent = (event.target.className == 'list-parent') ? event.target : event.target.parentNode;
    const selectedParentInputValue = selectedParent.querySelector('input').value;
    addChildErrorMessage.innerHTML = '';
    childUISelectedParentId.value = selectedParentInputValue;
    childUISelectedParentButton.style.background = selectedParent.style.background;
    childUISelectedParentButton.style.color = selectedParent.querySelector('p').style.color;
    childUISelectedParentButton.textContent = selectedParent.querySelector('p').textContent;
    childUISelectedParentButton.style.border = 'none';

    secondBackdrop.classList.remove('display-block');
    childUISelectParent.classList.remove('display-flex')
});

wordsUISelectParentButton.addEventListener('click', () => {
    secondBackdrop.classList.add('display-block');
    wordsUISelectParentList.classList.add('display-flex');
    SELECTED_SECOND_UI = 'select-words-parent';
});

wordsUISelectParentList.addEventListener('click', event => {
    if (event.target.className !== 'list-words-parent' && event.target.className !== 'list-words-parent-name') return;
    const selectedParent = (event.target.className == 'list-words-parent') ? event.target : event.target.parentNode;
    const selectedParentInputValue = selectedParent.querySelector('input').value;
    const selectedParentChildrenValue = selectedParent.querySelector('.selectedParentChildrenValue').value;
    addWordsErrorMessage.innerHTML = '';
    wordsUISelectedParentId.value = selectedParentInputValue;
    wordsUISelectedParentChildren.value = selectedParentChildrenValue;
    previousWordsUISelectParentButton = wordsUISelectParentButton.textContent;

    wordsUISelectParentButton.style.background = selectedParent.style.background;
    wordsUISelectParentButton.style.color = selectedParent.querySelector('p').style.color;
    wordsUISelectParentButton.textContent = selectedParent.querySelector('p').textContent;
    wordsUISelectParentButton.style.border = 'none';

    if(previousWordsUISelectParentButton != wordsUISelectParentButton.textContent) {
        populateChildList([], false);
        selectedChildPosition.value = null;

        wordsUISelectChildButton.style.background = 'none';
        wordsUISelectChildButton.style.color = '#fafaff';
        wordsUISelectChildButton.textContent = 'Choose a child';
        wordsUISelectChildButton.style.border = '0.1rem solid #ac1e2d';
    }

    secondBackdrop.classList.remove('display-block');
    wordsUISelectParentList.classList.remove('display-flex')
});

wordsUISelectChildButton.addEventListener('click', () => {
    secondBackdrop.classList.add('display-block');
    wordsUISelectChildList.classList.add('display-flex');
    SELECTED_SECOND_UI = 'select-words-child';

    // populate ChildListUI
    populateChildList(JSON.parse(wordsUISelectedParentChildren.value), true);
});

wordsUISelectChildList.addEventListener('click', event => {
    if (event.target.className !== 'list-words-child' && event.target.className !== 'list-words-child-name') return;
    const selectedChild = (event.target.className == 'list-words-child') ? event.target : event.target.parentNode;
    const selectedChildInputValue = selectedChild.querySelector('input').value;
    addWordsErrorMessage.innerHTML = '';
    selectedChildPosition.value = selectedChildInputValue;

    wordsUISelectChildButton.style.background = selectedChild.style.background;
    wordsUISelectChildButton.style.color = selectedChild.querySelector('p').style.color;
    wordsUISelectChildButton.textContent = selectedChild.querySelector('p').textContent;
    wordsUISelectChildButton.style.border = 'none';

    secondBackdrop.classList.remove('display-block');
    wordsUISelectChildList.classList.remove('display-flex');
});



parentName.addEventListener('change', () => {
    if (parentName.value.trim() == '') return;
    addParentErrorMessage.innerHTML = '';
    previewParent.textContent = parentName.value;
});

parentBackground.addEventListener('change', () => {
    previewParent.style.background = `${parentBackground.value}`;
});

parentTextColor.addEventListener('change', () => {
    previewParent.style.color = `${parentTextColor.value}`;
});




childName.addEventListener('change', () => {
    if (childName.value.trim() == '') return;
    addChildErrorMessage.innerHTML = '';
    previewChild.textContent = childName.value;
});

childBackground.addEventListener('change', () => {
    previewChild.style.background = `${childBackground.value}`;
});

childTextColor.addEventListener('change', () => {
    previewChild.style.color = `${childTextColor.value}`;
});

firstWord.addEventListener('change', () => {
    if (firstWord.value.trim() == '') return;
    addWordsErrorMessage.innerHTML = '';
});

secondWord.addEventListener('change', () => {
    if (secondWord.value.trim() == '') return;
    addWordsErrorMessage.innerHTML = '';
});


// NEAR EACH PARENT AND CHILD NAME THERES AN EDIT ICON THAT CAN EDIT IT AND YOU CAN ALSO DELETE IT
// IF YOU PRESS ON A CHILD, IT WILL SHOW UP A LIST OF THE WORDS THAT ARE STORED AND A DELETE CHILD BUTTON
// THERES AN EDIT BUTTON THAT APEARS WHEN THE LIST OF WORDS APPERS, YOU HAVE TO SELECT A WORD AND EITHER EDIT IT OR DELETE IT

// RIGHT NEXT TO EACH COLOR PICKER, YOU'LL HAVE A LIST WITH THE PREVIOUS USED COLORS

// ADD EXTENDS FOR EACH CLASS AND ID THAT REPEATS ITSELF
// MAKE MAIN PAGE WORK