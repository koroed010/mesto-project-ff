// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;


// @todo: DOM узлы
const placeContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card) {
    const cardAdd = cardTmp.querySelector('.places__item').cloneNode(true);
    cardAdd.querySelector('.card__image').src = card.link;
    cardAdd.querySelector('.card__image').alt = ('фотография места - ' + card.title);
    cardAdd.querySelector('.card__title').textContent = card.title;

    cardAdd.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardAdd;
};

// @todo: Функция удаления карточки
function deleteCard(cardToDel) {
    cardToDel.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
// for(let i = 0; initialCards.length - i > 0; i++) {

initialCards.forEach((place) => {
    placeContainer.append(createCard(place));
});
