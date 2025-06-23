class Api {
  constructor({ baseUrl, token, contentType }) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": contentType,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _initializeRequest() {
    return fetch(`${this._baseUrl}${this._endpoint}`, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : null,
    });
  }

  _generateRequestOptions({ endpoint, method, body = null }) {
    this._endpoint = endpoint;
    this._method = method;
    this._body = body;
  }

  /* USER ROUTES */
  //get user information
  getUserInfo() {
    this._generateRequestOptions({ endpoint: "/users/me", method: "GET" });
    return this._initializeRequest().then(this._checkResponse);
  }

  //update profile information
  updateProfileInfo({ name, about }) {
    this._generateRequestOptions({
      endpoint: "/users/me",
      method: "PATCH",
      body: { name, about },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  //update profile picture
  updateAvatar({ avatar }) {
    this._generateRequestOptions({
      endpoint: "/users/me/avatar",
      method: "PATCH",
      body: {
        avatar,
      },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  /* CARD ROUTES */
  //get all cards
  getCards() {
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  //create a card
  createCard({ name, link }) {
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "POST",
      body: { name, link },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  //delete a card
  deleteCard({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}`,
      method: "DELETE",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  //add a like to a card
  addLike({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "PUT",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  //remove a like from a card
  deleteLike({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "DELETE",
    });
    return this._initializeRequest().then(this._checkResponse);
  }
}

export default Api;
