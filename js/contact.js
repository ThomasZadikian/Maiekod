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

// Vérification user data

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const submitContact = document.getElementById("submitContact");

submitContact.addEventListener("click", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const raisonInput = document.getElementById("raison");
  const textInput = document.getElementById("text");
  const errorMessage = document.getElementById("errorMessage");
  let isValid = true;

  if (!isValidEmail(emailInput.value) && emailInput.value === "") {
    isValid = false;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  if (raisonInput.value.trim() === "") {
    isValid = false;
    raisonInput.classList.add("error");
  } else {
    raisonInput.classList.remove("error");
  }

  if (textInput.value.trim() === "") {
    isValid = false;
    textInput.classList.add("error");
  } else {
    textInput.classList.remove("error");
  }

  if (!isValid) {
    // errorMessage.style.display = "block";
    errorMessage.style.opacity = "1";
    errorMessage.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      errorMessage.style.opacity = "0";
    }, 5000);
  } else {
    errorMessage.style.opacity = "0";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../back-end/form.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form.urlencoded");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Le formulaire a bien été envoyé");
      } else {
        console.error("Une erreur est survenue lors de l'envoi du formulaire");
      }
    };
    xhr.send(
      "email=" +
        encodeURIComponent(emailInput.value) +
        "&raison=" +
        encodeURIComponent(raisonInput.value) +
        "&text=" +
        encodeURIComponent(textInput.value)
    );
  }
});
