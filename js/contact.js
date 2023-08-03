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

    fetch("../back-end/form.php", {
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

$(() => {
  var $sendBtn = $(".send-button"),
    $iWrapper = $(".icon-wrapper"),
    $i1 = $(".icon-1"),
    $i2 = $(".icon-2");

  function animationEvent() {
    var t,
      el = document.createElement("fakeelement");

    var animations = {
      animation: "animationend",
      OAnimation: "oAnimationEnd",
      MozAnimation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
    };

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

  // Animation effect

  $sendBtn.on("click", (e) => {
    $iWrapper.css("color", "#66bb6a");
    $iWrapper.addClass("icon-wrapper-animation");
    $sendBtn.addClass("clicked");
    $i1.delay(900);
    $i1.fadeTo(300, 0);
    $i2.delay(900);
    $i2.fadeTo(300, 1);
  });

  $sendBtn.on(animationEvent(), (e) => {
    if (e.originalEvent.animationName == "input-shadow") {
      $sendBtn.removeClass("clicked");
    }
  });

  $iWrapper.on(animationEvent(), (e) => {
    if (e.originalEvent.animationName == "icon-animation") {
      $iWrapper.removeClass("icon-wrapper-animation");
      setTimeout(reset, 1200);
    }
  });

  function reset() {
    $i1.fadeTo(250, 1);
    $i2.fadeTo(250, 0);
    $iWrapper.css("color", "#f8bbd0");
  }
}); // end of document ready
