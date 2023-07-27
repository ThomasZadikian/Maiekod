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
  "La simplicité":
    "Parce que s'engager dans un nouveau chemin peut-être compliqué, mes services se veulent simple, efficace et toujours le plus qualititif possible",
  "La communication":
    "Être à l'écoute est une valeur importante et centrale de mes services pour toujours confectionner le site dont vous avez envie et besoin",
  "L'optimisation":
    "Les recherches google correspondent à plus de 92% des recherche internet, c'est pour cela que votre site sera optimisé pour un meilleur référencement",
  "La maintenance":
    "Puisque les technologies évoluent, votre site doit évoluer avec. Un service de maintenance vous est proposé afin d'avoir les meilleures sécurités et performances possible",
  "L'indépendance":
    "Gérer un site vous semble complexe ? Un document PDF vous est fourni à chaque livraison, vous expliquant comment gérer le site et comment utiliser vos outils d'administration",
  "Une question, un besoin ?":
    "Vous pouvez me contacter grace au lien suivant et je serai ravi de répondre à vos interrogations",
};

function createCard() {
  let cardContainer = document.querySelector("#cardContainer");
  for (let engagement in engagementArray) {
    if (engagement != "Une question, un besoin ? ") {
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
    } else {
      cardContainer.innerHTML += `
        <li id="card">
        <div>
        <div class="discovery">
        <h1>${engagement}</h1>
        <p>
        ${engagementArray[engagement]}
        </p>
        <button type="button" class="button">REDIRECT_TO</button>
        </div>
        </div>
        </li>
        `;
    }
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
