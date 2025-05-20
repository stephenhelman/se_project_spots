const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terraces",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//selecting elements that control the edit profile modal
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

//selecting the parts of the form that will be prefilled
const profileFormElement = editProfileModal.querySelector(".modal__form");
const profileNameInput = profileFormElement.querySelector(
  "#profile-name-input"
);
const jobInput = profileFormElement.querySelector("#profile-description-input");

//selecting the profile elements to change/get values from
const profile = document.querySelector(".profile");
const profileNameElement = profile.querySelector(".profile__name");
const profileJobElement = profile.querySelector(".profile__description");

//selection elements that control the new post modal
const newPostButton = document.querySelector(".profile__button-new");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

//select the parts of the new post modal to log
const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = addCardFormElement.querySelector("#image-link-input");
const linkInput = addCardFormElement.querySelector("#caption-input");

const prefillForm = (text, formElement) => {
  formElement.value = text;
};

const changePageText = (inputToUse, elementToChange) => {
  elementToChange.textContent = inputToUse;
};

const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
};

const handleProfileFormSubmission = (e) => {
  e.preventDefault();
  changePageText(profileNameInput.value, profileNameElement);
  changePageText(jobInput.value, profileJobElement);
  closeModal(editProfileModal);
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();
  addCardFormElement.reset();
  closeModal(newPostModal);
};

//open the edit profile modal on edit button click
editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  prefillForm(profileNameElement.textContent, profileNameInput);
  prefillForm(profileJobElement.textContent, jobInput);
});

//close the edit profile modal on close button click
editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//change the page text on form submission
profileFormElement.addEventListener("submit", handleProfileFormSubmission);

//open the new post modal on edit button click
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

//close the new post modal on close button click
newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

//save the changes and display them on the page
addCardFormElement.addEventListener("submit", handleNewPostFormSubmission);

initialCards.forEach((card) => {
  //console.log(card);
});
