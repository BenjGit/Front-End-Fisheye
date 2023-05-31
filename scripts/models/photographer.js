export default async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    try{

        
        const photographers =  await fetch("data/photographers.json")
        .then(response => response.json())
        .then(data => data.photographers)
        return {photographers: photographers};
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
}        