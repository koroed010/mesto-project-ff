
// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, showCardImage) {
    const cardAdd = cardTmp.querySelector('.places__item').cloneNode(true);
    const cardAddImage = cardAdd.querySelector('.card__image');
    cardAddImage.src = card.link;
    cardAddImage.alt = ('фотография места - ' + card.name);
    cardAdd.querySelector('.card__title').textContent = card.name;
// слушатели удаления и лайка карточки, показа фото крупным планом
    cardAdd.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardAdd.querySelector('.card__like-button').addEventListener('click', likeCard);
//    cardAddImage.addEventListener('click', showCardImage);
    cardAddImage.addEventListener('click', function () {
        showCardImage(card.link, card.name)
    });

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


