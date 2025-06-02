const initialCards = [
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terraces",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//selecting elements that control the edit profile modal
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");

//selecting the parts of the form that will be prefilled
const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

//selecting the profile elements to change/get values from
const profile = document.querySelector(".profile");
const profileNameElement = profile.querySelector(".profile__name");
const profileJobElement = profile.querySelector(".profile__description");

//selection elements that control the new post modal
const newPostButton = document.querySelector(".profile__button-new");
const newPostModal = document.querySelector("#new-post-modal");

//select the parts of the new post modal to use
const addCardForm = document.forms["new-post"];
const nameInput = addCardForm.elements.link;
const linkInput = addCardForm.elements.caption;

//select the parts of the image preview modal
const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

//select the card template and cards container
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

//helper functions
const prefillInput = (text, formElement) => {
  formElement.value = text;
};

const changeText = (value, elementToChange) => {
  elementToChange.textContent = value;
};

const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
};

const setImageAttributes = (imageElement, data) => {
  imageElement.setAttribute("src", data.link);
  imageElement.setAttribute("alt", data.name);
};

// Select all close buttons
const closeButtons = document.querySelectorAll(".modal__button_type_close");

closeButtons.forEach((button) => {
  // Find the closest modal for each button, only once
  const modal = button.closest(".modal");

  // Attach a click event listener to each close button
  button.addEventListener("click", () => closeModal(modal));
});

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
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
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
  changeText(profileNameInput.value, profileNameElement);
  changeText(jobInput.value, profileJobElement);
  closeModal(editProfileModal);
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();
  const newElement = getCardElement({
    name: nameInput.value,
    link: linkInput.value,
  });
  addCardForm.reset();
  cardsContainer.prepend(newElement);
  closeModal(newPostModal);
};

//open the edit profile modal on edit button click
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  prefillInput(profileNameElement.textContent, profileNameInput);
  prefillInput(profileJobElement.textContent, jobInput);
});

//change the page text on form submission
profileForm.addEventListener("submit", handleProfileFormSubmission);

//open the new post modal on edit button click
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

//save the changes and display them on the page
addCardForm.addEventListener("submit", handleNewPostFormSubmission);

initialCards.forEach((card) => {
  renderCard(card);
});
