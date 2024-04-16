const acceptedModal = document.querySelector('.accepted-modal');

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
    acceptedModal.showModal();
    event.preventDefault();
});

const closeModalButton = document.querySelector('.accepted-modal .close');
closeModalButton.addEventListener('click', () => acceptedModal.close());

document
    .querySelector('.add-button')
    .addEventListener('click', () => addBeverageCard());


function addBeverageCard() {
    const newCard = document.querySelector('.beverage').cloneNode(deep=true);
    const form = document.querySelector('form');
    form.insertBefore(newCard, form.children[form.childElementCount-2]);
}
