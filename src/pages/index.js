import {
  config,
  disableButton,
  enableButton,
  enableValidation,
  resetValidation,
} from "../scripts/validation.js";
import { initializeWebpack } from "../util/util.js";
import Api from "../components/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  token: "a30404cf-e968-457d-9272-e0540b733e36",
  contentType: "application/json",
});

const changeProfileInfo = (data) => {
  changeText(data.name, profileNameElement);
  changeText(data.about, profileJobElement);
};

const handleLoadProfileInfo = (data) => {
  changeProfileInfo(data);
  setImageAttributes(profilePictureElement, {
    link: data.avatar,
    name: data.name,
  });
};

api
  .getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    handleLoadProfileInfo(data);
  })
  .catch((err) => {
    console.error(err);
  });

//TODO edit profile avatar => api.updateAvatar({link})
//update avatar src with link

//TODO create card => api.createCard({name, link})
//add a card to the database and render the new card

//TODO delete a card => api.deleteCard({cardId})
//delete te card from the database and the page

//selecting elements that control the edit profile modal
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");

//selecting the parts of the form that will be prefilled
const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const editProfileSubmitButton = profileForm.querySelector(
  ".modal__form-submit"
);

//selecting the profile elements to change/get values from
const profile = document.querySelector(".profile");
const profileNameElement = profile.querySelector(".profile__name");
const profileJobElement = profile.querySelector(".profile__description");
const profilePictureElement = profile.querySelector(".profile__picture");

//selection elements that control the new post modal
const newPostButton = document.querySelector(".profile__button-new");
const newPostModal = document.querySelector("#new-post-modal");

//select the parts of the new post modal to use
const addCardForm = document.forms["new-post"];
const captionInput = addCardForm.elements.caption;
const linkInput = addCardForm.elements.link;
const addCardSubmitButton = addCardForm.querySelector(".modal__form-submit");

//select the parts of the image preview modal
const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

//select the card template and cards container
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

//helper functions
const prefillInput = (text, inputElement) => {
  inputElement.value = text;
};

const changeText = (value, elementToChange) => {
  elementToChange.textContent = value;
};

const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
};

//select all modals
const modals = document.querySelectorAll(".modal");

//add closeModal functionality to close buttons or overlay
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (
      e.target === modal ||
      e.target.classList.contains("modal__button_type_close")
    ) {
      closeModal(modal);
    }
  });
});

const setImageAttributes = (imageElement, data) => {
  imageElement.setAttribute("src", data.link);
  imageElement.setAttribute("alt", data.name);
};

const renderCard = (item, method = "prepend") => {
  const cardElement = getCardElement(item);

  cardsContainer[method](cardElement);
};

//create a new card
const getCardElement = (data) => {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__description");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  changeText(data.name, cardTitle);
  setImageAttributes(cardImage, data);

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  likeButton.addEventListener("click", () => {
    data.isLiked
      ? api
          .deleteLike({ cardId: data._id })
          .then(likeButton.classList.toggle("card__like-button_active"))
          .catch((err) => console.error(err))
      : api
          .addLike({ cardId: data._id })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          })
          .then(likeButton.classList.toggle("card__like-button_active"))
          .catch((err) => console.error(err));
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    setImageAttributes(modalImage, data);
    changeText(data.name, modalCaption);
    openModal(previewModal);
  });

  return cardElement;
};

const handleProfileFormSubmission = (e) => {
  e.preventDefault();
  api
    .updateProfileInfo({
      name: profileNameInput.value,
      about: jobInput.value,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      changeProfileInfo(data);
      closeModal(editProfileModal);
    })
    .catch((err) => console.error(err));
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();
  api
    .createCard({
      name: captionInput.value,
      link: linkInput.value,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      renderCard(data);
      addCardForm.reset();
      disableButton(addCardSubmitButton, config.inactiveButtonClass);
      closeModal(newPostModal);
    });
};

//open the edit profile modal on edit button click
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  resetValidation(profileForm, config);
  prefillInput(profileNameElement.textContent, profileNameInput);
  prefillInput(profileJobElement.textContent, jobInput);
  enableButton(editProfileSubmitButton, config.inactiveButtonClass);
});

//change the page text on form submission
profileForm.addEventListener("submit", handleProfileFormSubmission);

//open the new post modal on edit button click
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

//save the changes and display them on the page
addCardForm.addEventListener("submit", handleNewPostFormSubmission);

initializeWebpack();

api
  .getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    if (!data.length) {
      return console.log("no cards found");
    }
    data.forEach((card) => {
      renderCard(card);
    });
  });

enableValidation(config);
