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

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    if (body.classList.contains("day-mode")) {
      ctx.fillStyle = `rgba(0,0,255,${star.opacity})`;
    } else {
      ctx.fillStyle = `rgba(232,232,232,${star.opacity})`;
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

function toogleTheme() {
  let buttonThemeChanger = document.querySelector("#themeToogle");
  buttonThemeChanger.addEventListener("click", () => {
    body.classList.toggle("day-mode");
    updateSocialButtonColors();
  });
}

export {
  drawStars,
  updateStarOpacity,
  toogleStyle,
  parallaxEffect,
  toogleTheme,
};
