export default function photographerFactory(data) {
    const { id, name, portrait, city, country , tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement( 'a' );
        a.setAttribute('href', `photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute('src', picture);
        img.setAttribute('alt', 'Portrait du photographe');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = country + ', ' + city;
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        const span = document.createElement( 'span' );
        span.textContent = price + '€/jour';
        article.appendChild(a);
        a.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
