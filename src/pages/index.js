import {
  config,
  disableButton,
  enableButton,
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

//TODO edit profile avatar => api.updateAvatar({link})
//update avatar src with link

//TODO create card => api.createCard({name, link})
//add a card to the database and render the new card

const handleProfileFormSubmission = (e) => {
  e.preventDefault();
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
    .catch((err) => console.error(err));
};

const handleNewPostFormSubmission = (e) => {
  e.preventDefault();
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
    });
};

const handleDeleteSubmission = () => {
  api.deleteCard({ cardId: selectedCardId }).then((res) => {
    if (res.ok) {
      selectedCard.remove();
      closeModal(deleteConfig.deleteCardModal);
    }
  });
};

//open the edit profile modal on edit button click
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

//change the page text on form submission
profileConfig.profileForm.addEventListener(
  "submit",
  handleProfileFormSubmission
);

//open the new post modal on edit button click
newPostConfig.newPostButton.addEventListener("click", () => {
  openModal(newPostConfig.newPostModal);
});

//save the changes and display them on the page
newPostConfig.addCardForm.addEventListener(
  "submit",
  handleNewPostFormSubmission
);

//delete the card from the
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
