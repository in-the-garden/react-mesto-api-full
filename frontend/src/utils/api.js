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
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }
    
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    updateUserInfo(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
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
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
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
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    setLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    deleteLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._handleResponse)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3003',
    
});

export default api