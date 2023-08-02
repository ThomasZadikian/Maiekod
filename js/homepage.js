import {
  drawStars,
  updateStarOpacity,
  toogleStyle,
  parallaxEffect,
  toggleTheme,
} from "./index.js";
parallaxEffect(".twinkling", 0.3);
drawStars();
updateStarOpacity();
toogleStyle();
toggleTheme();

// function for scroll button
const presentationContainer = document.querySelector("#hiddenContainer");
const showContentButton = document.querySelector("#showContentButton");
const boxPresentation = document.querySelector(".boxPresentation");

showContentButton.addEventListener("click", () => {
  presentationContainer.removeAttribute("hidden");
  boxPresentation.scrollIntoView({ behavior: "smooth" });
});
