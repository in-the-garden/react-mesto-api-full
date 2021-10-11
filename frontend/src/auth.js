export const baseUrl = 'http://mesto.pupkova.nomoredomains.club';

function handleResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
        return handleResponse(res);
    })
    .then((res) => {
        return res;
    }).catch(err => console.log('Ошибка', err)
    )
}

export function authorize(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
        return handleResponse(res);
    })
    .then((data) => {
        if (data) {
            localStorage.setItem('token', data.token);
            return data;
        }
    }).catch(err => console.log('Ошибка', err)
    )
}

export function getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => {
        return handleResponse(res);
    })
    .then(data => data).catch(err => console.log('Ошибка', err)
    )
}