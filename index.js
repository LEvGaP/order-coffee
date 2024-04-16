const acceptedModal = document.querySelector('.accepted-modal');

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
    acceptedModal.showModal();
    event.preventDefault();
});

const closeModalButton = document.querySelector('.accepted-modal .close');
closeModalButton.addEventListener('click', () => acceptedModal.close());