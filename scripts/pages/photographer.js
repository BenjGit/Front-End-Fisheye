//Mettre le code JavaScript lié à la page photographer.html
import getPhotographers from "./../models/photographer.js";

function getPhotographerIdFromUrl(){
    let params = (new URL(document.location)).searchParams;
    return params.get('id'); 
}
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const result = photographers.find(photographer => photographer.id == getPhotographerIdFromUrl());
    console.log(photographers);
    console.log(result);
};

init();
