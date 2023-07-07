import MediaFactory from "./../factories/mediaFactory.js";
import LightBox from "./../utils/lightbox.js";

export default class SortMedias {
  constructor(photographerMediasData,photographerName){
    this.photographerName = photographerName
    this.photographerMediasData = photographerMediasData;
    this.triButton = document.getElementById('tri-button');
    this.triListe = document.getElementById('tri-liste');
    this.triOptions = this.triListe.querySelectorAll('[role="option"]');
    this.currentArrow = document.querySelector('.fa-solid.fa-chevron-down');
    const firstOption = this.triOptions[0];
    const firstOptionText = firstOption.textContent;
    this.triButton.textContent = firstOptionText + " ";
    this.triButton.appendChild(this.currentArrow);


    this.triButton.addEventListener('click', () => {
      const expanded = this.triButton.getAttribute('aria-expanded') === 'true' || false;
      this.triButton.setAttribute('aria-expanded', !expanded);
      this.triListe.classList.toggle('visible', !expanded);

      this.currentArrow.classList.toggle('fa-chevron-down');
      this.currentArrow.classList.toggle('fa-chevron-up');
    });

    this.triListe.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-value')) {
        // Effectuer le tri en fonction de la valeur sélectionnée ici
        this.triButton.setAttribute('aria-expanded', false);
        this.triListe.classList.remove('visible');
        this.currentArrow.classList.toggle('fa-chevron-down');
        this.currentArrow.classList.toggle('fa-chevron-up');
      }
    });

    this.triOptions.forEach(option => {
      option.addEventListener('click', () => {         
        const mediasContainer = document.querySelector('.medias');
        const mediasModal = document.querySelector('#img_modal');
        const mediasToDelete = document.querySelectorAll('#img_modal video , .photographer-media')
        this.triButton.textContent = option.textContent + ' ';
        this.triButton.appendChild(this.currentArrow);

        //aria-selected
        this.triOptions.forEach(option => {
          option.setAttribute('aria-selected', 'false');
        });
        option.setAttribute('aria-selected', 'true');
        this.triButton.focus();
        // Masque le menu déroulant
        this.triListe.classList.remove('visible');

        if (option.getAttribute('data-value') === 'popularite')
        {  
          mediasContainer.innerHTML = '';

          this.photographerMediasData.sort((a, b) => {
            return b.likes - a.likes
          });

          this.photographerMediasData.forEach((mediaData,index) => {
            const mediaModel = new MediaFactory(mediaData);

            const mediaCardDOM = mediaModel.getMediasCardDOM(this.photographerName,index);
            mediasModal.appendChild(mediaCardDOM);
            mediasContainer.appendChild(mediaCardDOM);
          });
                        
        //   this.lightBox = new LightBox();
        //   this.lightBox.addLightBoxEventListeners();

          mediasToDelete.forEach(media => media.remove());
        }
        if (option.getAttribute('data-value') === 'titre')
        {
          mediasContainer.innerHTML = '';

          this.photographerMediasData.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });

          this.photographerMediasData.forEach((mediaData,index) => {
            const mediaModel = new MediaFactory(mediaData);

            const mediaCardDOM = mediaModel.getMediasCardDOM(this.photographerName,index);
            mediasModal.appendChild(mediaCardDOM);
            mediasContainer.appendChild(mediaCardDOM);
          });
                        
        //   this.lightBox = new LightBox();
        //   this.lightBox.addLightBoxEventListeners();

          mediasToDelete.forEach(media => media.remove());
        }
        if (option.getAttribute('data-value') === 'date')
        {   
          mediasContainer.innerHTML = '';
                    
          // Trier par date décroissante
          this.photographerMediasData.sort((a, b) => {
            return b.date.localeCompare(a.date);
          });
                    
          // Parcourir les éléments triés et les ajouter au conteneur
          this.photographerMediasData.forEach((mediaData,index) => {
            const mediaModel = new MediaFactory(mediaData);

            const mediaCardDOM = mediaModel.getMediasCardDOM(this.photographerName,index);
            mediasModal.appendChild(mediaCardDOM);
            mediasContainer.appendChild(mediaCardDOM);
          });

          mediasToDelete.forEach(media => media.remove());

        //   this.lightBox = new LightBox();
        //   this.lightBox.addLightBoxEventListeners();
        }
      });
      option.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
          e.preventDefault(); // Empêcher le comportement par défaut de la touche Entrée
          option.click(); 
        }
      });
    });
    this.defaultOptionSelected();
    this.lightBox = new LightBox();
    this.lightBox.addLightBoxEventListeners();
  }

  defaultOptionSelected(){
    const firstOption = this.triOptions[0];
    firstOption.click();
    firstOption.click();
  }
}