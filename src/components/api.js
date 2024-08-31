import { checkResponse } from '../utils/utils.js';

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-21',
    headers: {
      authorization: 'c63a6862-2b22-43ae-9822-2abd2ea69ca7',
      'Content-Type': 'application/json'
    }
}
  
// запрос данных о пользователе
export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
    })
    .then(checkResponse)
}

// запрос на получение всех карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
    })
    .then(checkResponse)
}

// отправляем на сервер обновленные данные пользователя
export function editProfile(profileEditName, profileEditDescription) {
    console.log(profileEditName.value);
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        name: profileEditName.value,
        about: profileEditDescription.value
        })
    })
    .then(checkResponse)
}

// отправляем на сервер новую карточку
export function addNewPlaceCard(newPlaceName, newPlaceLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
        name: newPlaceName.value,
        link: newPlaceLink.value
        })
    })
    .then(checkResponse)
}

// отправляем на сервер обновленную ссылку на аватар
export function changeAvatarLink(profileEditImageLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        avatar: profileEditImageLink.value
        })
    })
    .then(checkResponse)
}

// отправляем на сервер запрос на удаление карточки
export function removeCard(cardToDelId) {
    return fetch(`${config.baseUrl}/cards/${cardToDelId.textContent}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

// запрос на постановку/снятие лайка
export function toggleCardLike(cardToLikeId, likeMethod) {
    return fetch(`${config.baseUrl}/cards/likes/${cardToLikeId}`, {
        method: likeMethod,
        headers: config.headers
    })
    .then(checkResponse)
}
