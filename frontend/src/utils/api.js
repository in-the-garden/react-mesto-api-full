class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(this._handleResponse)
    }
    
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    updateUserInfo(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._handleResponse)
    }

    loadNewCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._handleResponse)
    }

    deleteCard(cardElement) {
        return fetch(`${this.baseUrl}/cards/${cardElement._id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    setLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'PUT',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    deleteLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._handleResponse)
    }
}

const api = new Api({
    baseUrl: 'http://api.mesto.pupkova.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api