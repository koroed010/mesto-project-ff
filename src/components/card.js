// функция открытия окна
import { openModal } from '../index.js';

// импорт запроса обработки лайка
import { toggleCardLike } from './api.js';


// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

const confirmPopup  = document.querySelector('.popup_type_confirm');
export let cardToDel = '';
export let cardToDelId = '';

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, showCardImage, ownerId) {
    const cardAdd = cardTmp.querySelector('.places__item').cloneNode(true);
    const cardAddImage = cardAdd.querySelector('.card__image');
    const cardDeleteButton = cardAdd.querySelector('.card__delete-button');
    const cardLikeButton = cardAdd.querySelector('.card__like-button');
    cardAddImage.src = card.link;
    cardAddImage.alt = ('фотография места - ' + card.name);
    cardAdd.querySelector('.card__title').textContent = card.name;
    cardAdd.querySelector('.card__likes_amount').textContent = card.likes.length;
    cardAdd.querySelector('.card__id').textContent = card._id;
// проверка на ранее поставленный лайк
    card.likes.forEach((like) => {
        if (like._id === ownerId) {
            return cardLikeButton.classList.add('card__like-button_is-active');
        }
    });

// слушатели удаления, лайка карточки, показа фото крупным планом
    if (card.owner._id === ownerId) {
        cardDeleteButton.addEventListener('click', deleteCard);
    } else {
        cardDeleteButton.setAttribute('disabled', true)
    };
    cardLikeButton.addEventListener('click', likeCard);
    cardAddImage.addEventListener('click', function () {
        showCardImage(card.link, card.name)
    });
    return cardAdd;
};

// Функция удаления карточки
export function deleteCard(evt) {
    cardToDel = evt.target.closest('.places__item');
    cardToDelId = cardToDel.querySelector('.card__id');

    openModal(confirmPopup);
    return cardToDel, cardToDelId.textContent;
};


// Функция лайка карточки
export function likeCard(evt) {
    const cardToLike = evt.target.closest('.places__item');
    const cardToLikeId = cardToLike.querySelector('.card__id').textContent;
    const cardLikesAmount = cardToLike.querySelector('.card__likes_amount');
    let likeMethod = 'PUT';

    if (evt.target.classList.contains('card__like-button_is-active')) {
        likeMethod = 'DELETE'
    }
    toggleCardLike(cardToLikeId, likeMethod)
    .then((res) => {
        cardLikesAmount.textContent = res.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
    
}


