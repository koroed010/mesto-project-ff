// Функция создания карточки
import { createCard } from './card.js';
// Функция удаления карточки
import { deleteCard } from './card.js';
// Функция лайка карточки
import { likeCard } from './card.js';
// Функция показа фото
import { showCardImage } from './card.js';

// функция открытия окон с инпутами
export function OpenModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') { 
            closeModal(modal);
        };
    });
};

// функция открытия окна с фотографией
export function openImageModal(modal, imageUrl, title) {
    document.querySelector('.popup__image').src = imageUrl;
    document.querySelector('.popup__caption').textContent = title;
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

// функция сохранения данных для формы профиля
export function handleFormProfileSubmit(evt, save1, save2, input1, input2, modal) {
    evt.preventDefault(); 
    save1.textContent = input1.value;
    save2.textContent = input2.value;
    closeModal(modal);
};

// функция сохранения данных для формы нового места
export function handleFormPlaceSubmit(evt, input1, input2, modal) {
    evt.preventDefault(); 
    const tempCard = {
        name: "",
        link: "",
      };
   
    tempCard.name = input1.value;
    tempCard.link = input2.value;

    document.querySelector('.places__list').prepend(createCard(tempCard, deleteCard, likeCard, showCardImage));

    input1.value = "";
    input2.value = "";

    closeModal(modal);
};

