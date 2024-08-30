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
    .then(res => {
        if (res.ok) {
            return res.json();
        }             // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// запрос на получение всех карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
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
    .then(res => {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
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
    .then(res => {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
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
    .then(res => res.json())
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// отправляем на сервер запрос на удаление карточки
export function removeCard(cardToDelId) {
    return fetch(`${config.baseUrl}/cards/${cardToDelId.textContent}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// запрос на постановку/снятие лайка
export function toggleCardLike(cardToLikeId, likeMethod) {
    return fetch(`${config.baseUrl}/cards/likes/${cardToLikeId}`, {
        method: likeMethod,
        headers: config.headers
    })
    .then(res => res.json())
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}
