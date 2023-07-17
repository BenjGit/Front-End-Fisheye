import ModalFocusManager from "./modalFocusManager.js";

export default class ContactForm {
  constructor(){
    this.contactFocusManager = null;
    this.openContactBtn = document.querySelector(".contact_button");
    this.closeContactBtn = document.querySelector(".close-btn");
    this.modalElement = document.getElementById("contact_modal");

    this.openContactBtn.addEventListener("click", () => {
      this.displayModal();
    });

    this.closeContactBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.closeContactBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.closeModal();
      }
    });

    this.modalElement.addEventListener('keydown', e => {
      if (e.key === 'Escape') { 
        e.preventDefault(); 
        this.closeModal();
      }
    });

    this.displayDataConsole();
  }

  displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.body.classList.add("modal-open");

    // Affiche le fond semi-transparent
    document.getElementById("overlay").style.display = "block";
    const contactModalElement = document.getElementById("contact_modal");
    const contactElementToFocus = document.querySelector(".modal h2")
    this.contactFocusManager = new ModalFocusManager(contactModalElement,contactElementToFocus);
  }

  closeModal() {
    const modal = document.getElementById("contact_modal");
    const currentButton = document.querySelector(".contact_button")
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    // Masque le fond semi-transparent
    document.getElementById("overlay").style.display = "none";
    this.contactFocusManager.toggleBackgroundFocus(true);
    this.contactFocusManager.destroy();
    currentButton.focus();
  }
  
  displayDataConsole(){
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
      event.preventDefault(); 

      const prenom = form.querySelector('input[name="prenom"]').value;
      const nom = form.querySelector('input[name="nom"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('input[name="message"]').value;

      let isValid = true;
    

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Adresse e-mail invalide');
        event.preventDefault();
        isValid = false;
      }

      if(prenom.length < 2 || prenom.length >50){
        console.log("Veuillez entrer 2 caractères ou plus pour le prénom");
        event.preventDefault();
        isValid = false;
          
      }
    
      if(nom.length < 2 || nom.length > 50){
        console.log("Veuillez entrer 2 caractères ou plus pour le nom");
        event.preventDefault();
        isValid = false;
          
      }

      if (!isValid) {
        event.preventDefault();
      } else {
        console.log('Prénom:', prenom);
        console.log('Nom:', nom);
        console.log('Email:', email);
        console.log('Message:', message);
        form.reset();
      }
    });
  }
}
