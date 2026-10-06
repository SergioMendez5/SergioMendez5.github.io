const formulier = document.getElementById("contact-formulier");
const bevestiging = document.getElementById("bevestiging");

const toonFout = (veldId, foutId) => {
  document.getElementById(foutId).classList.add("zichtbaar");
  document.getElementById(veldId).setAttribute("aria-invalid", "true");
};

const verbergFout = (veldId, foutId) => {
  document.getElementById(foutId).classList.remove("zichtbaar");
  document.getElementById(veldId).removeAttribute("aria-invalid");
};

// Controleer geldig e-mailformaat
const isGeldigEmail = (waarde) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarde);
};

const valideerFormulier = () => {
  const naam = document.getElementById("naam").value.trim();
  const email = document.getElementById("email").value.trim();
  const bericht = document.getElementById("bericht").value.trim();

  let geldig = true;

  if (naam === "") {
    toonFout("naam", "naam-fout");
    geldig = false;
  } else {
    verbergFout("naam", "naam-fout");
  }

  if (!isGeldigEmail(email)) {
    toonFout("email", "email-fout");
    geldig = false;
  } else {
    verbergFout("email", "email-fout");
  }

  if (bericht.length < 20) {
    toonFout("bericht", "bericht-fout");
    geldig = false;
  } else {
    verbergFout("bericht", "bericht-fout");
  }

  return geldig;
};

formulier.addEventListener("submit", (gebeurtenis) => {
  gebeurtenis.preventDefault();

  if (valideerFormulier()) {
    formulier.style.display = "none";
    bevestiging.classList.add("zichtbaar");
  }
});
