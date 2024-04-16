document
    .querySelector('.add-button')
    .addEventListener('click', () => addBeverageCard());


function addBeverageCard() {
    const newCard = document.querySelector('.beverage').cloneNode(deep=true);
    const form = document.querySelector('form');
    form.insertBefore(newCard, form.children[form.childElementCount-2]);
}
