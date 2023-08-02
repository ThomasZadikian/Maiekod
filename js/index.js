import { setCookie, getCookie, cookieExists, deleteCookie } from "./cookies.js";

// Cookies verification
document.addEventListener("DOMContentLoaded", function () {
  if (!cookieExists("cookie_consent")) {
    document.querySelector(".cookie-banner").style.display = "block";
  }

  const acceptCookieButton = document.querySelector(".cookiesAccept");
  acceptCookieButton.addEventListener("click", function () {
    setCookie("cookie_consent", "true", new Date("2030-01-01"));
    document.querySelector(".cookie-banner").style.display = "none";
  });

  selectThemeWhithoutCookies();

  if (cookieExists("cookie_consent")) {
    // Cookie for theme
    const theme = getCookie("theme");
    console.log(theme);
    if (theme === "day-mode") {
      body.classList.add("day-mode");
      updateSocialButtonColors();
    } else {
      body.classList.remove("day-mode");
      updateSocialButtonColors();
    }
  }
});

// Const & variable for all JS
const body = document.body;

// Function for stars in background
function parallaxEffect(layer, scrollSpeed) {
  const element = document.querySelector(layer);
  let scrollPosition = 0;

  function scrollAnimation() {
    scrollPosition += scrollSpeed;
    element.style.transform = `translateY(-${scrollPosition}px)`;
    requestAnimationFrame(scrollAnimation);
  }
  scrollAnimation();
}

const starsCanvas = document.getElementById("starsCanvas");
const ctx = starsCanvas.getContext("2d");
starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

const stars = [];

function randomOpacity() {
  return Math.random() * 0.8 + 0.2;
}

function updateStarOpacity() {
  for (const star of stars) {
    star.opacity = randomOpacity();
  }
  const randomDelay = Math.random() * 150 + 100;
  setTimeout(updateStarOpacity, randomDelay);
}

function createStar() {
  const star = {
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    size: Math.random() * 2,
    speed: 0.3 + Math.random() * 0.2,
    opacity: randomOpacity(),
  };
  stars.push(star);
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  let test = document.querySelector(".sun");

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    if (body.classList.contains("day-mode")) {
      ctx.fillStyle = `rgba(64, 64, 122,0)`;
      test.style.borderRadius = "50%";
      test.style.boxShadow = "0 0 1000px 250px rgba(243, 156, 18,1.0)";
    } else {
      ctx.fillStyle = `rgba(232,232,232,${star.opacity})`;
      test.style.boxShadow = "0 0 1000px 90px rgba(243, 156, 18,0.6)";
    }
    ctx.fill();

    star.x += star.speed;
    if (star.x > starsCanvas.width) {
      star.x = 0;
    }
  }
  requestAnimationFrame(drawStars);
}

for (let i = 0; i < 200; i++) {
  createStar();
}

// function for socialButton
const socialButton = {
  facebook: document.querySelector("#facebook"),
  github: document.querySelector("#github"),
  instagram: document.querySelector("#instagram"),
  linkedin: document.querySelector("#linkedin"),
};

function toogleStyle() {
  function moveSocialMedia(event, social, color) {
    if (event.type === "mouseover") {
      socialButton[social].style.fill = color;
      socialButton[social].classList.add("moveIcon");
    } else if (event.type === "mouseout") {
      if (body.classList.contains("day-mode")) {
        socialButton[social].style.fill = "rgb(25, 25, 25)";
      } else {
        socialButton[social].style.fill = "rgb(255, 255, 255)";
      }
      socialButton[social].classList.remove("moveIcon");
    }
  }

  function addEventListenersToSocialButton(social, color) {
    const button = socialButton[social];
    button.addEventListener("mouseover", (event) =>
      moveSocialMedia(event, social, color)
    );
    button.addEventListener("mouseout", (event) =>
      moveSocialMedia(event, social, "black")
    );
  }

  for (const social in socialButton) {
    switch (social) {
      case "facebook":
        addEventListenersToSocialButton(social, "rgba(59, 89, 152, 100%)");
        break;
      case "github":
        addEventListenersToSocialButton(social, "rgba(150, 3, 0, 100%)");
        break;
      case "instagram":
        addEventListenersToSocialButton(social, "rgba(195, 42, 163, 100%)");
        break;
      case "linkedin":
        addEventListenersToSocialButton(social, "rgba(10, 102, 194, 100%)");
        break;
      default:
        break;
    }
  }
  updateSocialButtonColors();
}

function updateSocialButtonColors() {
  if (body.classList.contains("day-mode")) {
    for (const social in socialButton) {
      socialButton[social].style.fill = "rgb(25, 25, 25)";
    }
  } else {
    for (const social in socialButton) {
      socialButton[social].style.fill = "rgb(255, 255, 255)";
    }
  }
}

// function for toogle theme

// Vérification dark mode
function detectSystemTheme(callback) {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const lightModeQuery = window.matchMedia("(prefers-color-scheme: light)");

  const updateTheme = () => {
    const isDarkMode = darkModeQuery.matches;
    const isLightMode = lightModeQuery.matches;

    callback(isDarkMode, isLightMode);
  };

  // Appeler updateTheme pour obtenir les valeurs initiales
  updateTheme();

  // Ajouter des écouteurs d'événements pour détecter les changements de thème
  darkModeQuery.addListener(updateTheme);
  lightModeQuery.addListener(updateTheme);
}

function toggleTheme() {
  const buttonThemeChanger = document.querySelector("#themeToogle");
  const body = document.body;
  let isLeft = false;
  let currentPosition = 0;

  buttonThemeChanger.addEventListener("click", () => {
    body.classList.toggle("day-mode");
    updateSocialButtonColors();

    const themeChangerButton = document.querySelector(".themeChangerButton");
    const themeChangerWidth =
      document.querySelector(".themeChanger").offsetWidth;
    const themeChangerButtonWidth = themeChangerButton.offsetWidth + 26;
    currentPosition = isLeft ? 0 : themeChangerWidth - themeChangerButtonWidth;
    themeChangerButton.style.transform = `translateX(-${currentPosition}px)`;
    isLeft = !isLeft;

    if (cookieExists("cookie_consent")) {
      if (body.classList.contains("day-mode")) {
        setCookie("theme", "day-mode", new Date("2030-01-01"));
      } else {
        setCookie("theme", "night-mode", new Date("2030-01-01"));
      }
    }
  });
}

function selectThemeWhithoutCookies() {
  detectSystemTheme((isDarkMode, isLightMode) => {
    if (isDarkMode) {
      body.classList.remove("day-mode");
    } else if (isLightMode) {
      body.classList.add("day-mode");
    } else {
      console.log("Le thème préféré du système n'est ni sombre ni clair.");
      // Faire quelque chose lorsque le thème préféré n'est ni sombre ni clair
    }
  });
}

export {
  drawStars,
  updateStarOpacity,
  toogleStyle,
  parallaxEffect,
  toggleTheme,
  selectThemeWhithoutCookies,
};
