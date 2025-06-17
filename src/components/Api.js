class Api {
  constructor({ baseUrl, token, contentType }) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": contentType,
    };
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
    return this._initializeRequest();
  }

  //update profile information
  updateProfileInfo({ name, about }) {
    this._generateRequestOptions({
      endpoint: "/users/me",
      method: "PATCH",
      body: { name, about },
    });
    return this._initializeRequest();
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
    return this._initializeRequest();
  }

  /* CARD ROUTES */
  //get all cards
  getCards() {
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "GET",
    });
    return this._initializeRequest();
  }

  //create a card
  createCard({ name, link }) {
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "POST",
      body: { name, link },
    });
    return this._initializeRequest();
  }

  //delete a card
  deleteCard({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}`,
      method: "DELETE",
    });
    return this._initializeRequest();
  }

  //add a like to a card
  addLike({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "PUT",
    });
    return this._initializeRequest();
  }

  //remove a like from a card
  deleteLike({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "DELETE",
    });
    return this._initializeRequest();
  }
}

export default Api;
