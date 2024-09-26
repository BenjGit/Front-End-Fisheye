export default async function getPhotographers() {
  try {
    const photographers = await fetch("data/photographers.json")
      .then((response) => response.json())
      .then((data) => data.photographers);
    return { photographers: photographers };
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}
