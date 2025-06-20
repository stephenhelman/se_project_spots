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
  changeTextOnSubmission,
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

const handleProfileFormSubmission = (e) => {
  e.preventDefault();
  changeTextOnSubmission(
    profileConfig.editProfileSubmitButton,
    true,
    "Saving...",
    "Save"
  );
  api
    .updateProfileInfo({
      name: profileConfig.profileNameInput.value,
      about: profileConfig.jobInput.value,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      changeProfileInfo(data, profileConfig);
      closeModal(profileConfig.editProfileModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeTextOnSubmission(
        profileConfig.editProfileSubmitButton,
        false,
        "Saving...",
        "Save"
      );
    });
};

const handleChangeAvatarSubmission = (e) => {
  e.preventDefault();
  changeTextOnSubmission(
    profileConfig.editAvatarSubmitButton,
    true,
    "Saving...",
    "Save"
  );
  api
    .updateAvatar({ avatar: profileConfig.editAvatarInput.value })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then(() => {
      setImageAttributes(profileConfig.profilePictureElement, {
        link: profileConfig.editAvatarInput.value,
        name: "Profile Picture",
      });
      profileConfig.editAvatarForm.reset();
      closeModal(profileConfig.editAvatarModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeTextOnSubmission(
        profileConfig.editAvatarSubmitButton,
        false,
        "Saving...",
        "Save"
      );
    });
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();
  changeTextOnSubmission(
    newPostConfig.addCardSubmitButton,
    true,
    "Saving...",
    "Save"
  );
  api
    .createCard({
      name: newPostConfig.captionInput.value,
      link: newPostConfig.linkInput.value,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      renderCard(data, cardConfig.cardsContainer, api);
      newPostConfig.addCardForm.reset();
      disableButton(
        newPostConfig.addCardSubmitButton,
        config.inactiveButtonClass
      );
      closeModal(newPostConfig.newPostModal);
    })
    .finally(() => {
      changeTextOnSubmission(
        newPostConfig.addCardSubmitButton,
        false,
        "Saving...",
        "Save"
      );
    });
};

const handleDeleteSubmission = (e) => {
  e.preventDefault();
  changeTextOnSubmission(
    deleteConfig.deleteCardSubmitButton,
    true,
    "Deleting...",
    "Delete"
  );
  api
    .deleteCard({ cardId: selectedCardId })
    .then((res) => {
      if (res.ok) {
        selectedCard.remove();
        closeModal(deleteConfig.deleteCardModal);
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeTextOnSubmission(
        deleteConfig.deleteCardSubmitButton,
        false,
        "Deleting...",
        "Delete"
      );
    });
};

profileConfig.editAvatarButton.addEventListener("click", () => {
  openModal(profileConfig.editAvatarModal);
});

profileConfig.editAvatarForm.addEventListener(
  "submit",
  handleChangeAvatarSubmission
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

profileConfig.profileForm.addEventListener(
  "submit",
  handleProfileFormSubmission
);

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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    handleLoadProfileInfo(data, profileConfig);
  })
  .catch((err) => {
    console.error(err);
  });

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
      renderCard(card, cardConfig.cardsContainer, api);
    });
  });

enableValidation(config);
