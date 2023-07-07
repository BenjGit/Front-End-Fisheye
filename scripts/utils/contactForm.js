export default class ContactForm {
  constructor(contactFocusManager){
    this.contactFocusManager = contactFocusManager;
    this.openContactBtn = document.querySelector(".contact_button");
    this.closeContactBtn = document.querySelector(".close-btn");

    this.openContactBtn.addEventListener("click", () => {
      this.displayModal();
    });

    this.closeContactBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.closeContactBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', e => {
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
    this.contactFocusManager.setInitialFocus();
    this.contactFocusManager.toggleBackgroundFocus(false);
    this.contactFocusManager.trapFocus();
  }

  closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    // Masque le fond semi-transparent
    document.getElementById("overlay").style.display = "none";
    this.contactFocusManager.toggleBackgroundFocus(true);
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
