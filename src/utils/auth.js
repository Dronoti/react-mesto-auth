export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
    if (res.ok)
        return res.json();
    else
        return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({password, email}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(checkResponse);
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(checkResponse);
};

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
        .then(checkResponse);
}
