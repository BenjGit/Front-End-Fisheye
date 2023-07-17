import getTotalLikes from "./../utils/totallike.js";

export default class Medias{

  constructor(data)
  {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.video = data.video;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price; 
    this.heartIcon = document.querySelector('i.fa-heart');
  }

  getCardDOM() {
    const mediaContainer = document.createElement( 'div' );
    const mediaContent = document.createElement( 'div' );
    const mediaTitle = document.createElement( 'h2' );
    const mediaLikes = document.createElement( 'p' );
    const likesContainer = document.createElement( 'div' );
    const heartIcon = document.createElement( 'i' );
    
    mediaContainer.setAttribute('class','medias-container');
    mediaContent.setAttribute('class', 'medias-content');
    mediaTitle.setAttribute('tabIndex','0');
    likesContainer.setAttribute('class', 'likes-container');
    heartIcon.setAttribute('class', 'fa-regular fa-heart');
    heartIcon.setAttribute('aria-label', 'likes')
    heartIcon.setAttribute('tabIndex','0');
    mediaTitle.textContent = this.title;
    mediaLikes.textContent = this.likes;

    mediaContent.appendChild(mediaTitle);
    likesContainer.appendChild(mediaLikes);
    mediaContent.appendChild(likesContainer)
    likesContainer.appendChild(heartIcon);
    mediaContainer.appendChild(mediaContent);
        
    this.likeCounter(heartIcon,mediaLikes);

    return(mediaContainer);
  }

  likeCounter(heartImg,nbLikes){
    const totalLikes = document.querySelector( '.total-likes-container .total-likes' );
    heartImg.addEventListener("click", () => {
      heartImg.classList.toggle('fa-regular');
      heartImg.classList.toggle('fa-solid');
      if (heartImg.classList.contains('fa-solid')) {
        this.likes++;
        totalLikes.textContent = getTotalLikes() + 1;

                
      }
      else if (heartImg.classList.contains('fa-regular'))
      {
        this.likes--;
        totalLikes.textContent = getTotalLikes() - 1;
                
                
      }

      nbLikes.textContent = this.likes
    });
    heartImg.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        heartImg.click();
      }
    });
  }

}
