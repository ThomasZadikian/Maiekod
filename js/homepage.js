// function for scroll button
const presentationContainer = document.querySelector("#hiddenContainer");
const showContentButton = document.querySelector("#showContentButton");
const presentationText = document.querySelector("#presentationText");

showContentButton.addEventListener("click", () => {
  presentationContainer.removeAttribute("hidden");
  presentationText.scrollIntoView({ behavior: "smooth" });
});
