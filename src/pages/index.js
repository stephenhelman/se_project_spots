import {
  config,
  disableButton,
  enableValidation,
  resetValidation,
} from "../scripts/validation.js";
import { createProfileConfig, createNewPostConfig } from "../util/config.js";
import {
  initializeWebpack,
  handleLoadProfileInfo,
  renderCard,
  openModal,
  closeModal,
  changeProfileInfo,
  prefillInput,
  selectedCard,
  selectedCardId,
  cardConfig,
  deleteConfig,
  setModalEventListeners,
  setImageAttributes,
  handleSubmit,
} from "../util/util.js";
import Api from "../components/Api.js";
import "./index.css";

const profileConfig = createProfileConfig();

const newPostConfig = createNewPostConfig();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  token: "a30404cf-e968-457d-9272-e0540b733e36",
  contentType: "application/json",
});

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const makeRequest = () => {
    return api
      .updateProfileInfo({
        name: profileConfig.profileNameInput.value,
        about: profileConfig.jobInput.value,
      })
      .then((data) => {
        changeProfileInfo(data, profileConfig);
        closeModal(profileConfig.editProfileModal);
      });
  };

  handleSubmit(makeRequest, e);
};

const handleChangeAvatarSubmit = (e) => {
  e.preventDefault();

  const makeRequest = () => {
    return api
      .updateAvatar({ avatar: profileConfig.editAvatarInput.value })
      .then(() => {
        setImageAttributes(profileConfig.profilePictureElement, {
          link: profileConfig.editAvatarInput.value,
          name: "Profile Picture",
        });
        profileConfig.editAvatarForm.reset();
        disableButton(
          profileConfig.editAvatarSubmitButton,
          config.inactiveButtonClass
        );
        closeModal(profileConfig.editAvatarModal);
      });
  };

  handleSubmit(makeRequest, e);
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();

  const makeRequest = () => {
    return api
      .createCard({
        name: newPostConfig.captionInput.value,
        link: newPostConfig.linkInput.value,
      })
      .then((data) => {
        renderCard(data, cardConfig.cardsContainer, api);
        newPostConfig.addCardForm.reset();
        disableButton(
          newPostConfig.addCardSubmitButton,
          config.inactiveButtonClass
        );
        closeModal(newPostConfig.newPostModal);
      });
  };

  handleSubmit(makeRequest, e);
};

const handleDeleteSubmission = (e) => {
  e.preventDefault();

  const makeRequest = () => {
    return api
      .deleteCard({ cardId: selectedCardId })
      .then(() => selectedCard.remove());
  };

  handleSubmit(makeRequest, e, "Deleting...");
};

profileConfig.editAvatarButton.addEventListener("click", () => {
  openModal(profileConfig.editAvatarModal);
});

profileConfig.editAvatarForm.addEventListener(
  "submit",
  handleChangeAvatarSubmit
);

profileConfig.editProfileButton.addEventListener("click", () => {
  openModal(profileConfig.editProfileModal);
  resetValidation(
    profileConfig.profileForm,
    config,
    profileConfig.editProfileSubmitButton
  );
  prefillInput(
    profileConfig.profileNameElement.textContent,
    profileConfig.profileNameInput
  );
  prefillInput(
    profileConfig.profileJobElement.textContent,
    profileConfig.jobInput
  );
});

profileConfig.profileForm.addEventListener("submit", handleProfileFormSubmit);

newPostConfig.newPostButton.addEventListener("click", () => {
  openModal(newPostConfig.newPostModal);
});

newPostConfig.addCardForm.addEventListener(
  "submit",
  handleNewPostFormSubmission
);

deleteConfig.deleteCardForm.addEventListener("submit", handleDeleteSubmission);
deleteConfig.deleteCardForm.addEventListener("reset", () =>
  closeModal(deleteConfig.deleteCardModal)
);

initializeWebpack();
setModalEventListeners();

api
  .getUserInfo()
  .then((data) => {
    handleLoadProfileInfo(data, profileConfig);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getCards()
  .then((data) => {
    if (!data.length) {
      return console.log("no cards found");
    }
    data.forEach((card) => {
      renderCard(card, cardConfig.cardsContainer, api);
    });
  })
  .catch((err) => console.error(err));

enableValidation(config);
