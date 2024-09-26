export default function getTotalLikes() {
  let totalLikes = 0;
  const medias = document.querySelectorAll(".medias-container");
  medias.forEach((media) => {
    totalLikes += parseInt(
      media.querySelector(".likes-container p").textContent
    );
  });

  return totalLikes;
}
