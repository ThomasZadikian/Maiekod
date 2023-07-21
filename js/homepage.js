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

function createStar() {
  const star = {
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    size: Math.random() * 2,
    opacity: Math.random(),
    speed: 0.1 + Math.random() * 0.5,
  };
  stars.push(star);
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
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

// function createStars() {
//   const numStars = Math.floor(Math.random() * 21) + 30;
//   const container = document.body;

//   for (let i = 0; i < numStars; i++) {
//     const stars = document.createElement("div");
//     stars.classList.add("stars");
//     stars.style.left = `${Math.random() * 100}%`;
//     stars.style.top = `${Math.random() * 100}%`;
//     stars.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
//     container.appendChild(stars);
//   }
// }

// createStars();
