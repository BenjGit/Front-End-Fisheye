import Medias from "./../models/Medias.js";

export default class Image extends Medias {
  constructor(data) {
    super(data);
    this.image = data.image;
    this.title = data.title;
  }

  getMediasCardDOM(name,index) {
       
    const mediaContainer = super.getCardDOM();
    const LightBoxMediaContainer = document.querySelector('#img_modal');
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', `assets/medias/${name.split(' ', 1)[0]}/${this.image}`);
    thumbnail.setAttribute('alt', 'photo de ');
    thumbnail.setAttribute('data-index',index);
    thumbnail.setAttribute('data-name', this.title); // Ajout de l'attribut data-name
    thumbnail.setAttribute('tabIndex','8');

    const lightBoxImg = document.createElement('img');
    const lightBoxTitle = LightBoxMediaContainer.querySelector('h2');
    lightBoxImg.setAttribute('src', `assets/medias/${name.split(' ', 1)[0]}/${this.image}`);
    lightBoxImg.setAttribute('alt', '');
    lightBoxImg.setAttribute('class', 'photographer-media');
    lightBoxImg.setAttribute('tabIndex','1');
    lightBoxImg.setAttribute('data-index',index);
        
        

    LightBoxMediaContainer.insertBefore(lightBoxImg, lightBoxTitle);
    mediaContainer.insertBefore(thumbnail, mediaContainer.firstChild);
    return mediaContainer;
    
  }
}
