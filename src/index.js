
import './pages/index.css'; // добавьте импорт главного файла стилей
// Функция создания карточки
import { createCard } from './components/card.js';
// Функция удаления карточки
import { deleteCard } from './components/card.js';
import { cardToDelId } from './components/card.js';
import { cardToDel } from './components/card.js';
// Функция лайка карточки
import { likeCard } from './components/card.js';
// функция открытия окна
import { openModal } from './components/modal.js';
// функция закрытия окна
import { closeModal } from './components/modal.js';

// импорт запросов
import { getProfile } from './components/api.js';
import { getInitialCards } from './components/api.js';
import { editProfile } from './components/api.js';
import { addNewPlaceCard } from './components/api.js';
import { changeAvatarLink } from './components/api.js';
import { removeCard } from './components/api.js';


// функция включения валидации всех форм
import { enableValidation } from './components/validation.js';
// функция очистки ошибок валидации всех форм
import { clearValidation } from './components/validation.js';


// DOM узлы
const placeContainer = document.querySelector('.places__list');

// переменные для слушателей
const popups = document.querySelectorAll('.popup');
// Редактировать данные о пользователе
const editButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditButton = profileEditPopup.querySelector('.popup__button');
const formEditProfile = document.forms.editProfile;
const profileEditName = formEditProfile.name;
const profileEditDescription = formEditProfile.description;
let ownerId = '';

// Поменять аватар
const profileImageEditPopup = document.querySelector('.popup_type_profile_image-edit');
const ImageEditButton = profileImageEditPopup.querySelector('.popup__button');
const formEditProfileImage = document.forms.profileImageEdit;
const profileEditImageLink = formEditProfileImage.link;

// Добавить(+)
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = newCardPopup.querySelector('.popup__button');
const formNewPlace = document.forms.newPlace;
const newPlaceName = formNewPlace.placeName;
const newPlaceLink = formNewPlace.link;

// Показать фотографию крупно
const imagePopup = document.querySelector('.popup_type_image');

// Подтвердить удаление карточки
const confirmPopup  = document.querySelector('.popup_type_confirm');
const formConfirm = document.forms.confirm;


// отрисовка страницы - вывод профиля пользователя и карточек мест
// запрос данных о профиле пользователя
const promise1 = new Promise((resolve) => {
    resolve(getProfile())
});

// запрос карточек с сервера
const promise2 = new Promise((resolve) => {
    resolve(getInitialCards())
})

// Выводим данные пользователя и карточки на страницу
Promise.all([promise1, promise2])
.then(([res1, res2]) => {
    profileTitle.textContent = res1.name;
    profileDescription.textContent = res1.about;
    profileImage.style = `background-image: url(${res1.avatar})`;
    ownerId = res1._id;
    res2.forEach((place) => {
        placeContainer.append(createCard(place, deleteCard, likeCard, showCardImage, ownerId));
    })
}); 

// настройки для сброса состояния полей, связанных с валидацией ввода данных
const validationConfig = {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// слушатели кнопок Редактировать
editButton.addEventListener('click', () => {
    profileEditName.value = profileTitle.textContent;
    profileEditDescription.value = profileDescription.textContent;
    profileEditButton.textContent = 'Сохранить';
// сброс состояния ошибки, которое могло остаться от предыдущего открытия
    clearValidation(formEditProfile, validationConfig);

    openModal(profileEditPopup);
});
// и Добавить(+)
addButton.addEventListener('click', () => {
    newPlaceName.value = "";
    newPlaceLink.value = "";
    newCardButton.textContent = 'Сохранить';
// выключаем кнопку "Сохранить" перед открытием пустой формы
    const submitButton = formNewPlace.querySelector('.popup__button');
    submitButton.disabled = true;
    submitButton.classList.add('popup__button_disabled');
// сброс состояния ошибки, которое могло остаться от предыдущего открытия
    clearValidation(formNewPlace, validationConfig);

    openModal(newCardPopup);
});

// слушатель на аватар пользователя и его редактирование
profileImage.addEventListener('click', () => {
    profileEditImageLink.value = '';
    ImageEditButton.textContent = 'Сохранить';
// сброс состояния ошибки, которое могло остаться от предыдущего открытия
    clearValidation(formEditProfileImage, validationConfig);

    openModal(profileImageEditPopup);
});


// слушатели кнопок Сохранить в формах: профиля, новой карточки и замены аватара
// + функционал по сохранению/добавлению
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileEditButton.textContent = 'Сохранение...'
// отправляем обновленные данные на сервер
    editProfile(profileEditName, profileEditDescription)
    .then (() => {
        profileTitle.textContent = profileEditName.value;
        profileDescription.textContent = profileEditDescription.value
    });
    closeModal(profileEditPopup);
});    

formNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    newCardButton.textContent = 'Сохранение...'
// отправляем новую карточку на сервер
    addNewPlaceCard(newPlaceName, newPlaceLink)
    .then((res) => {
    //    console.log(res);
        document.querySelector('.places__list').prepend(createCard(res, deleteCard, likeCard, showCardImage, ownerId));
    });
    closeModal(newCardPopup);
});

// меняем аватарку
formEditProfileImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    ImageEditButton.textContent = 'Сохранение...'
// отправляем обновленные данные на сервер
    changeAvatarLink(profileEditImageLink)
    .then ((res) => {
        profileImage.style = `background-image: url(${res.avatar})`;
    });
    closeModal(profileImageEditPopup);
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

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
  

// слушатель кнопки Да в форме подтверждения (удаления карточки) + удаление с сервера
formConfirm.addEventListener('submit', (evt) => {
    evt.preventDefault();
//    console.log(cardToDelId.textContent);
// отправляем запрос на удаление карточки на сервер
    removeCard(cardToDelId)
    .then(() => {
        cardToDel.remove();
        formConfirm.removeEventListener('submit', (evt))
    })
    closeModal(confirmPopup);
});




