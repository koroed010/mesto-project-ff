
import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
// Функция создания карточки
import { createCard } from './components/card.js';
// Функция удаления карточки
import { deleteCard } from './components/card.js';
// Функция лайка карточки
import { likeCard } from './components/card.js';
// функция открытия окна
import { openModal } from './components/modal.js';
// функция закрытия окна
import { closeModal } from './components/modal.js';


// DOM узлы
const placeContainer = document.querySelector('.places__list');
// Вывести карточки на страницу
initialCards.forEach((place) => {
    placeContainer.append(createCard(place, deleteCard, likeCard, showCardImage));
});

// переменные для слушателей
const popups = document.querySelectorAll('.popup');
// Редактировать
const editButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms.editProfile;
const profileEditName = formEditProfile.name;
const profileEditDescription = formEditProfile.description;
// Добавить(+)
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms.newPlace;
const newPlaceName = formNewPlace.placeName;
const newPlaceLink = formNewPlace.link;
// Показать фотографию крупно
const imagePopup = document.querySelector('.popup_type_image');

// слушатели кнопок Редактировать
editButton.addEventListener('click', () => {
    profileEditName.value = profileTitle.textContent;
    profileEditDescription.value = profileDescription.textContent;
    openModal(profileEditPopup);
});
// и Добавить(+)
addButton.addEventListener('click', () => {
    newPlaceName.value = "";
    newPlaceLink.value = "";
    openModal(newCardPopup);
});

// слушатели кнопок Сохранить в формах профиля и новой карточки
// + функционал по сохранению/добавлению
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
    closeModal(profileEditPopup);
});    

formNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const tempCard = {
        name: "",
        link: "",
    };
    tempCard.name = newPlaceName.value;
    tempCard.link = newPlaceLink.value;
    document.querySelector('.places__list').prepend(createCard(tempCard, deleteCard, likeCard, showCardImage));
    closeModal(newCardPopup);
});

// Функция показа фото
function showCardImage(showCardLink, showCardTitle) {
    document.querySelector('.popup__image').src = showCardLink;
    document.querySelector('.popup__caption').textContent = showCardTitle;
    openModal(imagePopup);
};

// обработка клика по кнопке закрытия для каждого попапа
// + обработка клика по оверлею для каждого попапа
popups.forEach((modal) => {
    modal.addEventListener('click', (evt) => {
        let clickTarget = evt.target.classList.value;
        if (clickTarget.includes('popup_is-opened') || clickTarget === 'popup__close') {
            closeModal(modal);
        }
    });
});
