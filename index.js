const acceptedModal = document.querySelector('.accepted-modal');

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
    acceptedModal.showModal();
    event.preventDefault();
});

const closeModalButton = document.querySelector('.accepted-modal .close');
closeModalButton.addEventListener('click', () => acceptedModal.close());


function addCardDeleteButtonListener(card){
    card
        .querySelector('.remove-button')
        .addEventListener('click', (e) => {
                if (document.querySelectorAll('.beverage').length <= 1){
                    return;
                }
                e.target.closest('.beverage').remove();
                restoreBeverageCardNumeration();
            }
        );
}

document
    .querySelector('.add-button')
    .addEventListener('click', () => addBeverageCard());


addCardDeleteButtonListener(document.querySelector('.beverage'));
restoreBeverageCardNumeration();


function addBeverageCard() {
    const newCard = document.querySelector('.beverage').cloneNode(deep=true);
    setRadioInputNameFor(newCard, 'abra kadabra');
    addCardDeleteButtonListener(newCard);
    const form = document.querySelector('form');
    form.insertBefore(newCard, form.children[form.childElementCount-2]);
    restoreBeverageCardNumeration();
}


function restoreBeverageCardNumeration() {
    let nextNumber = 1;
    document
        .querySelectorAll('.beverage')
        .forEach(
            (el) => {
                el.querySelector('.beverage-count').textContent = `Напиток №${nextNumber}`;
                setRadioInputNameFor(el, `milkForBeverage${nextNumber}`);
                nextNumber++;
            }
        );
}


function setRadioInputNameFor(card, name){
    card.querySelectorAll("input[type='radio']")
        .forEach((el) => el.setAttribute('name', name));
}