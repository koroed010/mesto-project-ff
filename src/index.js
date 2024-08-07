
import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
// Функция создания карточки
import { createCard } from './components/card.js';
// Функция удаления карточки
import { deleteCard } from './components/card.js';
// Функция лайка карточки
import { likeCard } from './components/card.js';
// функция открытия окна
import { OpenModal } from './components/modal.js';
// Функция показа фото
import { showCardImage } from './components/card.js';
// функция закрытия окна
import { closeModal } from './components/modal.js';
// функция сохранения данных профиля
import { handleFormProfileSubmit } from './components/modal.js';
import { handleFormPlaceSubmit } from './components/modal.js';

// DOM узлы
const placeContainer = document.querySelector('.places__list');
// Вывести карточки на страницу
initialCards.forEach((place) => {
    placeContainer.append(createCard(place, deleteCard, likeCard, showCardImage));
});

// переменные для слушателей

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms.editProfile;
const profileEditName = formEditProfile.name;
const profileEditDescription = formEditProfile.description;

const newCardPopup = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms.newPlace;
const newPlaceName = formNewPlace.placeName;
const newPlaceLink = formNewPlace.link;

export const imagePopup = document.querySelector('.popup_type_image');

let modalSelected = '';
let input1 = '';
let input2 = '';
let save1 = '';
let save2 = '';
let clickTarget = '';

document.addEventListener('click', (evt) => {
//    console.log(evt.target.classList.value);
//    console.log(evt.target);

    clickTarget = evt.target.classList.value;

    switch (clickTarget) {
        case 'profile__edit-button':
            profileEditName.value = profileTitle.textContent;
            profileEditDescription.value = profileDescription.textContent;
            save1 = profileTitle;
            save2 = profileDescription;
            input1 = profileEditName;
            input2 = profileEditDescription;
            modalSelected = profileEditPopup;

            OpenModal(modalSelected);
            break;

        case 'profile__add-button':
            input1 = newPlaceName;
            input2 = newPlaceLink;
            input1.value = "";
            input2.value = "";         
            modalSelected = newCardPopup;

            OpenModal(modalSelected);
            break;

        case 'card__image':
            modalSelected = imagePopup;
            break;

        case 'popup__close':
            closeModal(modalSelected);
            break;            
    };

// обработка клика по оверлею    
    if (clickTarget.includes('popup_is-opened')) {
        closeModal(modalSelected);
    };
    
});

// слушатели кнопки Сохранить в формах профиля и новой карточки
formEditProfile.addEventListener('submit', (evt) => {
    handleFormProfileSubmit(evt, save1, save2, input1, input2, modalSelected);
});

formNewPlace.addEventListener('submit', (evt) => {
    handleFormPlaceSubmit(evt, input1, input2, modalSelected);
});

