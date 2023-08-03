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

function messageForm(opacity, className, messageContent) {
  message.style.opacity = opacity;
  message.classList.add(className);
  message.innerHTML = `
  <p>${messageContent}</p>
  `;
}

submitContact.addEventListener("click", (e) => {
  e.preventDefault();

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    console.log(`Email: ${email}, isRegexValid: ${isValid}`);
    return isValid;
  }

  const submitContact = document.getElementById("submitContact");
  const emailInput = document.getElementById("email");
  const raisonInput = document.getElementById("raison");
  const textInput = document.getElementById("text");
  const message = document.getElementById("message");
  let isValid = true;
  const isEmailValid = isValidEmail(emailInput.value);

  if (!isEmailValid) {
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

  if (textInput.value.trim() === "" || textInput.value.length < 25) {
    isValid = false;
    textInput.classList.add("error");
  } else {
    textInput.classList.remove("error");
  }

  if (!isValid) {
    messageForm(
      "1",
      "error",
      "Merci de bien vouloir vérifier les informations entrées dans le formulaire"
    );
    message.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      message.style.opacity = "0";
    }, 5000);
  } else {
    console.log(isValid);
    message.style.opacity = "0";
    const formData = new FormData();
    formData.append("email", emailInput.value);
    formData.append("raison", raisonInput.value);
    formData.append("text", textInput.value);

    fetch("/.netlify/functions/sendMail", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          messageForm(
            "1",
            "success",
            "Votre demande de contact à bien été envoyée, vous receverez une réponse dans les meilleurs délais"
          );
          submitContact.style.display = "none";
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur réseau s'est produite lors de la requête AJAX",
          error
        );
      });
  }
});
