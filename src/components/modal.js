
// функция открытия окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') { 
            closeModal(modal);
        };
    });
};

// функция закрытия окна 
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModal);
};


