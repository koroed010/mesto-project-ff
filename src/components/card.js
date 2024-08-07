import { openImageModal } from './modal.js';
import { imagePopup } from '../index.js';

// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, showCardImage) {
    const cardAdd = cardTmp.querySelector('.places__item').cloneNode(true);
    cardAdd.querySelector('.card__image').src = card.link;
    cardAdd.querySelector('.card__image').alt = ('фотография места - ' + card.name);
    cardAdd.querySelector('.card__title').textContent = card.name;
// слушатели удаления и лайка карточки, показа фото крупным планом
    cardAdd.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardAdd.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardAdd.querySelector('.card__image').addEventListener('click', showCardImage);

    return cardAdd;
};

// Функция удаления карточки
export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// Функция лайка карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Функция показа фото
export function showCardImage(evt) {
    let showCardLink = evt.target.src;
    let showCardTitle = evt.target.closest('.places__item').querySelector('.card__title').textContent;
    openImageModal(imagePopup, showCardLink, showCardTitle);
};

