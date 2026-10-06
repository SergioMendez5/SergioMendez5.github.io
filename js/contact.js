// contact.js – Sergio Mendez
// Valideert het contactformulier vóór verzending.
// Drie velden: naam (verplicht), e-mail (geldig formaat), bericht (min. 20 tekens).

const formulier = document.getElementById("contact-formulier");
const bevestiging = document.getElementById("bevestiging");

// Toont een foutmelding bij een veld
const toonFout = (veldId, foutId) => {
  document.getElementById(foutId).classList.add("zichtbaar");
  document.getElementById(veldId).setAttribute("aria-invalid", "true");
};

// Verbergt een foutmelding bij een veld
const verbergFout = (veldId, foutId) => {
  document.getElementById(foutId).classList.remove("zichtbaar");
  document.getElementById(veldId).removeAttribute("aria-invalid");
};

// Controleert of het e-mailadres een geldig formaat heeft
const isGeldigEmail = (waarde) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarde);
};

// Valideert alle velden en geeft true terug als alles klopt
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

// Verwerkt het formulier bij verzending
formulier.addEventListener("submit", (gebeurtenis) => {
  gebeurtenis.preventDefault();

  if (valideerFormulier()) {
    formulier.style.display = "none";
    bevestiging.classList.add("zichtbaar");
  }
});
