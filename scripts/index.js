// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;
const card = cardTmp.querySelector('.card');
const cardImg = card.querySelector('.card__image');
const cardTitle = card.querySelector('.card__title');
const cardDelBtn = card.querySelector('.card__delete-button');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardImgSrc, cardTitle) {
    const cardAdd = cardTmp.querySelector('.places__item').cloneNode(true);
    cardAdd.querySelector('.card__image').src = cardImgSrc;
    cardAdd.querySelector('.card__image').alt = ('фотография места - ' + cardTitle);
    cardAdd.querySelector('.card__title').textContent = cardTitle;

    cardAdd.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardAdd;
};

// @todo: Функция удаления карточки
function deleteCard(cardToDel) {
    cardToDel.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
for(let i = 0; initialCards.length - i > 0; i++) {
    placesList.append(createCard(initialCards[i].link, initialCards[i].name));
};
