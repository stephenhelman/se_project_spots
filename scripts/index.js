//selecting elements that control the edit profile modal
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

//open the edit profile modal on edit button click
editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

//close the edit profile modal on close button click
editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

//selection elements that control the new post modal
const newPostButton = document.querySelector(".profile__button-new");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

//open the new post modal on edit button click
newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

//close the new post modal on close button click
newPostCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
