import Medias from "./../models/Medias.js";

export default class Video extends Medias {
  constructor(data){
    super(data);
    this.video = data.video;
    this.title = data.title;
  }

  getMediasCardDOM(name,index){

    const mediaContainer = super.getCardDOM(name);
    const LightBoxMediaContainer = document.querySelector('#img_modal');
    const videoContainer = document.createElement('video');
    const videoSrc = document.createElement('source');
    const LightBoxVideoContainer = document.createElement('video');
    const lightBoxVideoSrc = document.createElement('source');
    const lightBoxTitle = LightBoxMediaContainer.querySelector('h2');

    videoContainer.setAttribute('data-index', index);
    videoContainer.setAttribute('data-name', this.title);
    videoContainer.setAttribute('tabIndex','0');
    videoSrc.setAttribute('type', 'video/mp4');
    videoSrc.setAttribute('src', `assets/medias/${name.split(' ', 1)[0]}/${this.video}`);

    LightBoxVideoContainer.setAttribute('controls', true);
    LightBoxVideoContainer.setAttribute('tabIndex','0');
    LightBoxVideoContainer.setAttribute('data-index', index);
    LightBoxVideoContainer.setAttribute('class', 'photographer-media');
    lightBoxVideoSrc.setAttribute('type', 'video/mp4');
    lightBoxVideoSrc.setAttribute('src', `assets/medias/${name.split(' ', 1)[0]}/${this.video}`);
    
    videoContainer.appendChild(videoSrc);
    LightBoxVideoContainer.appendChild(lightBoxVideoSrc);
    LightBoxMediaContainer.insertBefore(LightBoxVideoContainer, lightBoxTitle);

    mediaContainer.prepend(videoContainer);
    return mediaContainer;
  }
}