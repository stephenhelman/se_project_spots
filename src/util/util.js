import headerImage from "../images/Logo.svg";
import avatarImage from "../images/avatar.jpg";
import pencilImage from "../images/pencil.svg";
import plusImage from "../images/Plus.svg";

export const initializeWebpack = () => {
  //set up images for webpack
  const headerImageElement = document.querySelector("#image-header");
  const avatarImageElement = document.querySelector("#image-avatar");
  const pencilImageElement = document.querySelector("#image-pencil");
  const plusImageElement = document.querySelector("#image-plus");
  const webpackImageArray = [
    [headerImageElement, headerImage],
    [avatarImageElement, avatarImage],
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
