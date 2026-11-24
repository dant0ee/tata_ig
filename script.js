const missionScreen = document.getElementById("missionScreen");
const nextScreen = document.getElementById("nextScreen");
const finalScreen = document.getElementById("finalScreen");

const startBtn = document.getElementById("startBtn");
const declineBtn = document.getElementById("declineBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const ringCards = document.querySelectorAll(".ring-card");

const dealPanel = document.getElementById("dealPanel");
const successPanel = document.getElementById("successPanel");

const selectedRing = document.getElementById("selectedRing");

const instagramForm = document.getElementById("instagramForm");
const instagramInput = document.getElementById("instagramInput");

const usernameDisplay = document.getElementById("usernameDisplay");

// SMOOTH SCREEN TRANSITION

function showScreen(screenToShow, screenToHide) {
  screenToHide.classList.add("hidden");

  screenToShow.classList.remove("hidden");

  screenToShow.classList.remove("screen-enter");

  void screenToShow.offsetWidth;

  screenToShow.classList.add("screen-enter");
}

// START MISSION

startBtn.addEventListener("click", () => {
  showScreen(nextScreen, missionScreen);
});

// DECLINE BUTTON SHRINKS SMOOTHLY

let declineScale = 1;

function shrinkDeclineButton() {
  declineScale = Math.max(0.05, declineScale - 0.12);

  declineBtn.style.transform = `scale(${declineScale})`;
}

declineBtn.addEventListener("mouseenter", shrinkDeclineButton);

declineBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();

  shrinkDeclineButton();
});

declineBtn.addEventListener("click", (event) => {
  event.preventDefault();

  shrinkDeclineButton();
});

// YES BUTTON

yesBtn.addEventListener("click", () => {
  showScreen(finalScreen, nextScreen);
});

// NO BUTTON ESCAPES

function escapeButton() {
  const buttonRect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - buttonRect.width - 20;
  const maxY = window.innerHeight - buttonRect.height - 20;

  const randomX = Math.max(10, Math.random() * maxX);
  const randomY = Math.max(10, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", escapeButton);

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();

  escapeButton();
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();

  escapeButton();
});

// RING SELECTION

ringCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove previous selection

    ringCards.forEach((item) => {
      item.classList.remove("selected");
    });

    // Select current ring

    card.classList.add("selected");

    const ringType = card.dataset.ring;

    // Update selected ring appearance

    selectedRing.className = `ring-art ring-selected ring-${ringType.toLowerCase()}`;

    // Show deal panel

    dealPanel.classList.remove("hidden");

    successPanel.classList.add("hidden");

    // Smooth appearance

    dealPanel.classList.remove("screen-enter");

    void dealPanel.offsetWidth;

    dealPanel.classList.add("screen-enter");

    // Scroll to deal

    setTimeout(() => {
      dealPanel.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  });
});

// INSTAGRAM FORM

// INSTAGRAM FORM - GMAIL DELIVERY

let selectedRingName = "";

ringCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectedRingName = card.dataset.ring;
  });
});

instagramForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = instagramInput.value.trim();

  const claimBtn = document.getElementById("claimBtn");

  if (!username) return;

  claimBtn.disabled = true;
  claimBtn.textContent = "SENDING... 💌";

  try {
    await emailjs.send(
      "service_6px2oub",
      "template_l8farhk",
      {
        instagram: username,
        selected_ring: selectedRingName,
      },
      {
        publicKey: "cagnY20jc4UAF9U2d",
      },
    );

    usernameDisplay.textContent = "@" + username;

    dealPanel.classList.add("hidden");
    successPanel.classList.remove("hidden");

    successPanel.classList.remove("screen-enter");
    void successPanel.offsetWidth;
    successPanel.classList.add("screen-enter");

    launchCelebration();

    setTimeout(() => {
      successPanel.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  } catch (error) {
    console.error("EmailJS error:", error);

    alert("Email could not be sent. Please try again.");

    claimBtn.disabled = false;
    claimBtn.textContent = "CLAIM YOUR RING 💍";
  }
});

function launchCelebration() {
  const emojis = ["❤️", "💋", "💍", "✨", "😘", "💕"];

  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * 1.5 + "s";

    successPanel.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 5000);
  }
}
