import headerImage from "../images/Logo.svg";
import pencilImage from "../images/pencil.svg";
import plusImage from "../images/Plus.svg";
import {
  createDeleteCardConfig,
  createPreviewModalConfig,
  createCardSelectorConfig,
} from "./config.js";

export const initializeWebpack = () => {
  //set up images for webpack
  const headerImageElement = document.querySelector("#image-header");
  const pencilImageElement = document.querySelector("#image-pencil");
  const plusImageElement = document.querySelector("#image-plus");
  const webpackImageArray = [
    [headerImageElement, headerImage],
    [pencilImageElement, pencilImage],
    [plusImageElement, plusImage],
  ];

  const defineSrcForWebpackImages = ([element, imageImport]) => {
    element.src = imageImport;
  };

  webpackImageArray.forEach((element) => {
    defineSrcForWebpackImages(element);
  });
};

export const deleteConfig = createDeleteCardConfig();
export const cardConfig = createCardSelectorConfig();
const previewModalConfig = createPreviewModalConfig();

export const changeProfileInfo = (data, config) => {
  changeText(data.name, config.profileNameElement);
  changeText(data.about, config.profileJobElement);
};

export const handleLoadProfileInfo = (data, config) => {
  changeProfileInfo(data, config);
  setImageAttributes(config.profilePictureElement, {
    link: data.avatar,
    name: data.name,
  });
};

export const renderCard = (item, container, api, method = "prepend") => {
  const cardElement = getCardElement(item, api);

  container[method](cardElement);
};

export const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
};

export const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
};

export const prefillInput = (text, inputElement) => {
  inputElement.value = text;
};

const changeText = (value, elementToChange) => {
  elementToChange.textContent = value;
};

export const setModalEventListeners = () => {
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
};

const setImageAttributes = (imageElement, data) => {
  imageElement.setAttribute("src", data.link);
  imageElement.setAttribute("alt", data.name);
};

export let selectedCard;
export let selectedCardId;

const handleDeleteCard = (cardElement, data) => {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteConfig.deleteCardModal);
};

export const getCardElement = (data, api) => {
  const cardElement = cardConfig.cardTemplate.content
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
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", () => {
    setImageAttributes(previewModalConfig.modalImage, data);
    changeText(data.name, previewModalConfig.modalCaption);
    openModal(previewModalConfig.previewModal);
  });

  return cardElement;
};
