import ModalFocusManager from "./modalFocusManager.js";

export default class LightBox {
  constructor() {
    this.lightboxFocusManager = null;
    this.selectedImage = null;
    this.modal = document.getElementById("img_modal");
    this.titleElement = document.querySelector("#img_modal h2");
    this.closeImgBtn = document.querySelector(".close-media-btn");
    this.nextArrow = document.querySelector(".next-arrow");
    this.prevArrow = document.querySelector(".prev-arrow");
    this.previouslyDisabledEls = [];

    this.init();
    this.addLightBoxEventListeners();
  }

  init() {
    this.closeImgBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.nextArrow.addEventListener("click", () => {
      this.showNextMedia();
    });

    this.prevArrow.addEventListener("click", () => {
      this.showPrevMedia();
    });

    this.prevArrow.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.showPrevMedia();
      }
    });

    this.nextArrow.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.showNextMedia();
      }
    });

    this.closeImgBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.closeModal();
      }
    });

    this.modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        this.closeModal();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.showNextMedia();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.showPrevMedia();
      }
    });
  }

  addLightBoxEventListeners() {
    const openImgBtn = document.querySelectorAll(".medias-container");

    const openLightBox = (event) => {
      if (event.target.tagName === "IMG" || event.target.tagName === "VIDEO") {
        const index = event.target.dataset.index;
        this.displayModal(index);
      }
    };

    openImgBtn.forEach((medias) => {
      medias.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openLightBox(event);
        }
      });
      medias.addEventListener("click", (e) => openLightBox(e));
    });
  }

  displayModal(index) {
    const overlayMedia = document.getElementById("overlay-media");
    const selectedImage = document.querySelector(
      `.medias-container [data-index="${index}"]`
    );
    const title = selectedImage.dataset.name;

    this.titleElement.textContent = title;
    this.modal.style.display = "block";
    this.selectedImage = selectedImage;

    // Stocker l'index actuel dans une propriété de la classe
    this.currentIndex = parseInt(index);

    // Afficher l'image sélectionnée
    this.showMedia(this.currentIndex);

    document.body.classList.add("img-open");
    overlayMedia.style.display = "block";

    // Récupérez l'image affichée dans la lightbox
    const lightboxImage = document.querySelector(
      `#img_modal [data-index="${index}"]`
    );
    const lightboxModalElement = document.getElementById("img_modal");
    this.lightboxFocusManager = new ModalFocusManager(
      lightboxModalElement,
      lightboxImage
    );
  }
  /**
   * Permet d'afficher les médias sélectionnés
   * @param {int} index l'index correspond à l'image sélectionnée
   */
  showMedia(index) {
    const medias = document.querySelectorAll(
      "#img_modal img, #img_modal video"
    );
    medias.forEach((media, i) => {
      if (media.tagName === "IMG") {
        media.style.display = i === index ? "block" : "none";
      } else if (media.tagName === "VIDEO") {
        if (i === index) {
          media.style.display = "block";
          media.play();
        } else {
          media.style.display = "none";
          media.pause();
        }
      }
    });
  }

  showNextMedia() {
    const mediaElements = document.querySelectorAll(
      "#img_modal img, #img_modal video"
    );
    const totalMedias = mediaElements.length;
    this.currentIndex = (this.currentIndex + 1) % totalMedias;
    this.showMedia(this.currentIndex);
    const selectedImage = document.querySelector(
      `.medias-container [data-index="${this.currentIndex}"]`
    );
    this.titleElement.textContent = selectedImage.dataset.name;
    const newImage = document.querySelector(
      `#img_modal [data-index="${this.currentIndex}"]`
    );
    newImage.focus();
    this.lightboxFocusManager.destroy();
    this.lightboxFocusManager = new ModalFocusManager(this.modal, newImage);
  }

  showPrevMedia() {
    const mediaElements = document.querySelectorAll(
      "#img_modal img, #img_modal video"
    );
    const totalMedias = mediaElements.length;
    this.currentIndex = (this.currentIndex - 1 + totalMedias) % totalMedias;
    this.showMedia(this.currentIndex);
    const selectedImage = document.querySelector(
      `.medias-container [data-index="${this.currentIndex}"]`
    );
    this.titleElement.textContent = selectedImage.dataset.name;
    const newImage = document.querySelector(
      `#img_modal [data-index="${this.currentIndex}"]`
    );
    newImage.focus();
    this.lightboxFocusManager.destroy();
    this.lightboxFocusManager = new ModalFocusManager(this.modal, newImage);
  }

  closeModal() {
    const modal = document.getElementById("img_modal");
    const overlayMedia = document.getElementById("overlay-media");
    modal.style.display = "none";
    document.body.classList.remove("img-open");
    // Masque le fond semi-transparent
    this.lightboxFocusManager.toggleBackgroundFocus(true);
    overlayMedia.style.display = "none";
    if (this.selectedImage) {
      this.selectedImage.focus();
    }
  }
}
