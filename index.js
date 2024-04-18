const acceptedModal = document.querySelector('.accepted-modal');

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    setOrderData(acceptedModal);
    acceptedModal.showModal();
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

function addTextAreaFlushEvent(card){
    card
        .querySelector('textarea')
        .addEventListener('input', (e) => {
            card.querySelector('.echo-output').textContent = e.target.value;
        });
}


document
    .querySelector('.add-button')
    .addEventListener('click', () => addBeverageCard());


addTextAreaFlushEvent(document.querySelector('.beverage'));
addCardDeleteButtonListener(document.querySelector('.beverage'));
restoreBeverageCardNumeration();


function addBeverageCard() {
    const newCard = document.querySelector('.beverage').cloneNode(deep=true);
    setRadioInputNameFor(newCard, 'abra kadabra');
    addCardDeleteButtonListener(newCard);
    addTextAreaFlushEvent(newCard);
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
}

function setOrderData(modal) {
    const beverages = document.querySelectorAll('form .beverage');
    const p = document.querySelector('.accepted-modal .beverages-count');
    p.textContent = `Вы заказали ${beverages.length} ${getCorrrectBeverageDeclination(beverages.length)}`;

    
    const beveragesTableBody = modal.querySelector('.order-details tbody');
    removeChildren(beveragesTableBody);
    
    for (const beverage of beverages){
        const name = getBeverageName(beverage);
        const milk = getBeverageMilk(beverage);
        const options = getBeverageOptions(beverage);
        beveragesTableBody.append(createRow([name, milk, options], 'td'));
    }
    }

function getBeverageName(beverageNode) {
    const select = beverageNode.querySelector('select');
    return russianSchemeForOrderCoffee['name'][select.value];
}

function getBeverageMilk(beverageNode) {
    const value = beverageNode.querySelector('input[type="radio"]:checked').value;
    return russianSchemeForOrderCoffee['milk'][value];
}

function getBeverageOptions(beverageNode) {
    const selectedOptions = beverageNode.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(selectedOptions)
        .map(item => russianSchemeForOrderCoffee['options'][item.value])
        .join(', ');
}

function createRow(values, type) {
    const row = document.createElement('tr');
    for (let i = 0; i < values.length; i++){
        row.append(createCell(values[i], type));
    }
    return row;
}

function createCell(text, tag){
    const th = document.createElement(tag);
    th.style.border = '1px solid';
    th.textContent = text;
    return th;
}

function createParagraph(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

function removeChildren(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}

function getCorrrectBeverageDeclination(count) {
    if (count % 100 >= 11 && count % 100 <= 14)
        return 'напитков';
    if (count % 10 == 1)
        return 'напиток';
    if (count % 10 >= 2 && count % 10 <= 4)
        return 'напитка';
    return 'напитков';
}

russianSchemeForOrderCoffee = {
    'name': {
        'espresso': 'Эсспрессо',
        'capuccino': 'Капучино',
        'cacao': 'Какао'
    },
    'milk': {
        'no-fat': 'обезжиренное',
        'soy': 'cоевое',
        'coconut': 'кокосовое'
    },
    'options': {
        'whipped cream': 'взбитые сливки',
        'marshmallow': 'зефирки',
        'chocolate': 'шоколад',
        'cinnamon': 'корица'
    }
}

