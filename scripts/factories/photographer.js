export default class PhotographerFactory{
    
  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.picture = `assets/photographers/${data.portrait}`;
  }

  getUserCardDOM() {
    const article = document.createElement( 'article' );
    const a = document.createElement( 'a' );
    const h2 = document.createElement( 'h2' );
    const h3 = document.createElement( 'h3' );
    const p = document.createElement( 'p' );
    const span = document.createElement( 'span' );
    const div = document.createElement( 'div' );
    const img = document.createElement( 'img' );

    a.setAttribute('href', `photographer.html?id=${this.id}`);
    a.setAttribute('tabIndex', '3')
    div.setAttribute('class' , 'photographer-infos');
    div.setAttribute('tab' , 'photographer-infos');
    div.setAttribute('tabIndex', '3');
    img.setAttribute('src', this.picture);
    img.setAttribute('alt', 'Portrait du photographe');
    h2.textContent = this.name;
    h3.textContent = this.country + ', ' + this.city;
    p.textContent = this.tagline;
    span.textContent = this.price + '€/jour';

        
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(span);
    article.appendChild(div)
    return (article);
  }

  getPhotographerCardDOM() {
    const imgDiv = document.querySelector( '.photographer-img' );
    const contentDiv = document.querySelector( '.photographer-content' );
    const photographerInfoDiv = document.createElement( 'div' );
    const img = document.createElement( 'img' );
    const contactFormName = document.querySelector( '.photographer-name' );
    const h2 = document.createElement( 'h2' );
    const h3 = document.createElement( 'h3' );
    const p = document.createElement( 'p' );
    const priceElement = document.querySelector( '.medias-info-container .price' );
        
    h2.setAttribute('tabIndex' , '2');
    photographerInfoDiv.setAttribute( 'class','photographer-infos' );
    photographerInfoDiv.setAttribute('tabIndex','3');
    img.setAttribute('src', this.picture);
    img.setAttribute('alt', 'Portrait du photographe');
    img.setAttribute('tabIndex' , '5');
    h2.textContent = this.name;
    h3.textContent = this.city + ', ' + this.country;
    p.textContent = this.tagline;
    contactFormName.textContent = this.name;
    priceElement.textContent = this.price + '€/jour';

    imgDiv.appendChild(img);
    contentDiv.appendChild(h2);
    photographerInfoDiv.appendChild(h3);
    photographerInfoDiv.appendChild(p);
    contentDiv.appendChild(photographerInfoDiv);
    // contentDiv.appendChild(span);
    return (contentDiv,imgDiv);
  }
}
