export const createProfileConfig = () => {
  //edit profile elements
  const editProfileButton = document.querySelector(".profile__button-edit");
  const editProfileModal = document.querySelector("#edit-profile-modal");
  const profileForm = document.forms["edit-profile"];
  const profileNameInput = profileForm.elements.name;
  const jobInput = profileForm.elements.description;
  const editProfileSubmitButton = profileForm.querySelector(
    ".modal__form-submit"
  );

  //elements in the profile that will be changed
  const profile = document.querySelector(".profile");
  const profileNameElement = profile.querySelector(".profile__name");
  const profileJobElement = profile.querySelector(".profile__description");
  const profilePictureElement = profile.querySelector(".profile__picture");

  //edit avatar elements
  const editAvatarModal = document.querySelector("#edit-avatar-modal");
  const editAvatarButton = document.querySelector(".profile__avatar-button");
  const editAvatarForm = document.forms["edit-avatar"];
  const editAvatarInput = editAvatarForm.elements.avatar;
  const editAvatarSubmitButton = editAvatarForm.querySelector(
    ".modal__form-submit"
  );

  return {
    editProfileButton,
    editProfileModal,
    profileForm,
    profileNameInput,
    jobInput,
    editProfileSubmitButton,
    profile,
    profileNameElement,
    profileJobElement,
    profilePictureElement,
    editAvatarButton,
    editAvatarForm,
    editAvatarInput,
    editAvatarSubmitButton,
    editAvatarModal,
  };
};

export const createNewPostConfig = () => {
  const newPostButton = document.querySelector(".profile__button-new");
  const newPostModal = document.querySelector("#new-post-modal");
  const addCardForm = document.forms["new-post"];
  const captionInput = addCardForm.elements.caption;
  const linkInput = addCardForm.elements.link;
  const addCardSubmitButton = addCardForm.querySelector(".modal__form-submit");

  return {
    newPostButton,
    newPostModal,
    addCardForm,
    captionInput,
    linkInput,
    addCardSubmitButton,
  };
};

export const createPreviewModalConfig = () => {
  const previewModal = document.querySelector("#preview-modal");
  const modalImage = previewModal.querySelector(".modal__image");
  const modalCaption = previewModal.querySelector(".modal__caption");

  return {
    previewModal,
    modalImage,
    modalCaption,
  };
};

export const createCardSelectorConfig = () => {
  //select the card template and cards container
  const cardsContainer = document.querySelector(".cards__list");
  const cardTemplate = document.querySelector("#card-template");

  return { cardsContainer, cardTemplate };
};

export const createDeleteCardConfig = () => {
  //delete card form selectors
  const deleteCardModal = document.querySelector("#delete-confirmation-modal");
  const deleteCardForm = document.forms["delete-confirmation"];
  const deleteCardSubmitButton = deleteCardForm.querySelector(
    ".modal__form-submit"
  );

  return {
    deleteCardModal,
    deleteCardForm,
    deleteCardSubmitButton,
  };
};
