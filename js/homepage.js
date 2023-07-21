// Function for stars in background

function parallaxEffect(layer, scrollSpeed) {
  const element = document.querySelector(layer);
  let scrollPosition = 0;

  function scrollAnimation() {
    scrollPosition += scrollSpeed;
    element.style.transform = "translateY(-${scrollPosition}px)";
    requestAnimationFrame(scrollAnimation);
  }
  scrollAnimation();
}
parallaxEffect(".twinkling", 0.3);

const starsCanvas = document.getElementById("starsCanvas");
const ctx = starsCanvas.getContext("2d");
starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

const stars = [];

function randomOpacity() {
  return Math.random() * 1 + 0.2;
}

function updateStarOpacity() {
  for (const star of stars) {
    star.opacity = randomOpacity();
  }
  const randomDelay = Math.random() * 200 + 100;
  setTimeout(updateStarOpacity, randomDelay);
}

function createStar() {
  const star = {
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    size: Math.random() * 2,
    opacity: Math.random(),
    speed: 0.3 + Math.random() * 0.5,
    opacity: randomOpacity(),
  };
  stars.push(star);
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(232,232,232,${star.opacity})`;
    ctx.fill();

    star.x += star.speed;
    if (star.x > starsCanvas.width) {
      star.x = 0;
    }
  }
  requestAnimationFrame(drawStars);
}
for (let i = 0; i < 100; i++) {
  createStar();
}
drawStars();
updateStarOpacity();
