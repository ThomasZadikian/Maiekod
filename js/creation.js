import {
  drawStars,
  updateStarOpacity,
  toogleStyle,
  parallaxEffect,
} from "./index.js";
parallaxEffect(".twinkling", 0.3);
drawStars();
updateStarOpacity();
toogleStyle();

let engagementArray = {
  "Engagement 1": "je suis l'engagement numéro 1",
  "Engagement 2": "je suis l'engagement numéro 2",
  "Engagement 3": "je suis l'engagement numéro 3",
  "Engagement 4": "je suis l'engagement numéro 4",
  "Engagement 5": "je suis l'engagement numéro 5",
  "Engagement 6": "je suis l'engagement numéro 6",
  "Engagement 7": "je suis l'engagement numéro 7",
};

function createCard() {
  let cardContainer = document.querySelector("#cardContainer");
  for (let engagement in engagementArray) {
    cardContainer.innerHTML += `
      <li id="card">
      <div>
        <div class="discovery">
          <h1>${engagement}</h1>
          <p>
          ${engagementArray[engagement]}
          </p>
        </div>
      </div>
    </li>
      `;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  createCard();
});

window.addEventListener("DOMContentLoaded", () => {
  var items = document.querySelectorAll("#card");
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      console.log(i);
      if (isElementInViewport(items[i])) {
        if (!items[i].classList.contains("in-view")) {
          items[i].classList.add("in-view");
        }
      } else if (items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
      }
    }
  }

  window.addEventListener("load", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
});
