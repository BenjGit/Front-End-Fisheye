//Mettre le code JavaScript lié à la page photographer.html
import MediaFactory from "./../factories/mediaFactory.js";
import PhotographerFactory from "./../factories/photographer.js";
import getMedias from "./../models/media.js";
import getPhotographers from "./../models/photographer.js";
import ContactForm from "./../utils/contactForm.js";
import SortMedias from "./../utils/sortmedias.js";
import getTotalLikes from "./../utils/totallike.js";

//récupérer l'id du photographe
function getPhotographerIdFromUrl() {
  let params = new URL(document.location).searchParams;
  return params.get("id");
}

async function displayData(photographers, medias) {
  const photographerData = photographers.find(
    (photographer) => photographer.id == getPhotographerIdFromUrl()
  );
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = new PhotographerFactory(photographerData);
  const photographerCardDOM = photographerModel.getPhotographerCardDOM();
  const totalLikes = document.querySelector(
    ".total-likes-container .total-likes"
  );
  photographersSection.appendChild(photographerCardDOM);

  const mediasSection = document.querySelector(".medias");
  const photographerMediasData = medias.filter(
    (media) => media.photographerId == getPhotographerIdFromUrl()
  );

  photographerMediasData.forEach((media, index) => {
    const mediaModel = new MediaFactory(media);

    const mediaCardDOM = mediaModel.getMediasCardDOM(
      photographerModel.name,
      index
    );
    mediasSection.appendChild(mediaCardDOM);
  });
  totalLikes.textContent = getTotalLikes();

  new SortMedias(photographerMediasData, photographerModel.name);

  document.querySelector(".logo").focus();
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();

  displayData(photographers, medias);

  new ContactForm();
}

init();
