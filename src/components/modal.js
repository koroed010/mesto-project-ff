
// функция открытия окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
};

// функция закрытия окна 
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};


function closeByEscape(event) {
    if(event.key === 'Escape') {
       closeModal(document.querySelector('.popup_is-opened'));
    }
}