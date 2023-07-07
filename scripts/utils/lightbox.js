import ModalFocusManager from "./modalFocusManager.js";

export default class LightBox {
  constructor(){
    const lightboxModalElement = document.getElementById("img_modal");
    const lightboxFocusManager = new ModalFocusManager(lightboxModalElement);
    this.lightboxFocusManager = lightboxFocusManager;
    console.log(lightboxFocusManager)
    this.selectedImage = null;
    this.modal = document.getElementById("img_modal");
    this.titleElement = document.querySelector("#img_modal h2");
    this.closeImgBtn = document.querySelector(".close-media-btn");
    this.nextArrow = document.querySelector(".next-arrow");
    this.prevArrow = document.querySelector(".prev-arrow");
    this.previouslyDisabledEls = [];

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

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { 
        e.preventDefault(); 
        this.closeModal();
      }
      if (e.key === 'ArrowRight') { 
        e.preventDefault(); 
        this.showNextMedia(); 
      }
      if (e.key === 'ArrowLeft') { 
        e.preventDefault(); 
        this.showPrevMedia(); 
      }
    });


    this.addLightBoxEventListeners();
  }

  addLightBoxEventListeners() {
    const openImgBtn = document.querySelectorAll(".medias-container");
    
    const openLightBox = (event) => {
      if (event.target.tagName === "IMG" || event.target.tagName === "VIDEO") {
        const index = event.target.dataset.index;
        this.displayModal(index);
      }
    };
        
    openImgBtn.forEach(medias => {
      medias.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openLightBox(event);
        }
      });
      medias.addEventListener("click", (e) => openLightBox(e));
    });
  }

  displayModal(index) {
    const overlayMedia = document.getElementById("overlay-media")
    const selectedImage = document.querySelector(`[data-index="${index}"]`);
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
    this.lightboxFocusManager.setInitialFocus();
    this.lightboxFocusManager.toggleBackgroundFocus(false);
    this.lightboxFocusManager.trapFocus();
  }

  showMedia(index) {
    const medias = document.querySelectorAll("#img_modal img, #img_modal video");
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
    const mediaElements = document.querySelectorAll("#img_modal img, #img_modal video");
    const totalMedias = mediaElements.length;
    this.currentIndex = (this.currentIndex + 1) % totalMedias;
    this.showMedia(this.currentIndex);
    const selectedImage = document.querySelector(`[data-index="${this.currentIndex}"]`);
    this.titleElement.textContent = selectedImage.dataset.name;

  }

  showPrevMedia() {
    const mediaElements = document.querySelectorAll("#img_modal img, #img_modal video");
    const totalMedias = mediaElements.length;
    this.currentIndex = (this.currentIndex - 1 + totalMedias) % totalMedias;
    this.showMedia(this.currentIndex);
    const selectedImage = document.querySelector(`[data-index="${this.currentIndex}"]`);
    this.titleElement.textContent = selectedImage.dataset.name;

        
  }

  closeModal() {
    const modal = document.getElementById("img_modal");
    const overlayMedia = document.getElementById("overlay-media")
    modal.style.display = "none";
    document.body.classList.remove("img-open");
    // Masque le fond semi-transparent
    this.lightboxFocusManager.toggleBackgroundFocus(true);
    overlayMedia.style.display = "none"
    if (this.selectedImage) {
      this.selectedImage.focus();
    }
        
  }

}
