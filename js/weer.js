const weerBlok = document.getElementById("weer-inhoud");

// WMO weercodes naar leesbare tekst
const omschrijvingVanCode = (code) => {
  const codes = {
    0:  "☀️ Helder",
    1:  "🌤️ Grotendeels helder",
    2:  "⛅ Gedeeltelijk bewolkt",
    3:  "☁️ Bewolkt",
    45: "🌫️ Mist",
    48: "🌫️ Rijpmist",
    51: "🌦️ Lichte motregen",
    53: "🌦️ Matige motregen",
    55: "🌧️ Dichte motregen",
    61: "🌧️ Lichte regen",
    63: "🌧️ Matige regen",
    65: "🌧️ Zware regen",
    71: "🌨️ Lichte sneeuw",
    73: "🌨️ Matige sneeuw",
    75: "❄️ Zware sneeuw",
    80: "🌦️ Lichte buien",
    81: "🌧️ Matige buien",
    82: "⛈️ Zware buien",
    95: "⛈️ Onweer",
  };
  return codes[code] ?? "Onbekend";
};

const toonWeerFout = (melding) => {
  weerBlok.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = melding;
  weerBlok.appendChild(p);
};

const haalWeerOp = (latitude, longitude) => {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relativehumidity_2m,weathercode,windspeed_10m` +
    `&timezone=Europe%2FAmsterdam`;

  fetch(url)
    .then((antwoord) => {
      if (!antwoord.ok) throw new Error("API fout");
      return antwoord.json();
    })
    .then((data) => {
      const { temperature_2m, apparent_temperature, relativehumidity_2m, weathercode, windspeed_10m } = data.current;

      weerBlok.innerHTML = "";

      const rijen = [
        { label: "Omstandigheden",    waarde: omschrijvingVanCode(weathercode) },
        { label: "Temperatuur",        waarde: `${temperature_2m} °C` },
        { label: "Gevoelstemperatuur", waarde: `${apparent_temperature} °C` },
        { label: "Luchtvochtigheid",   waarde: `${relativehumidity_2m}%` },
        { label: "Windsnelheid",       waarde: `${windspeed_10m} km/u` },
      ];

      rijen.forEach(({ label, waarde }) => {
        const rij = document.createElement("p");
        const sterk = document.createElement("strong");
        sterk.textContent = `${label}: `;
        rij.appendChild(sterk);
        rij.appendChild(document.createTextNode(waarde));
        weerBlok.appendChild(rij);
      });

      const bron = document.createElement("p");
      bron.className = "weer-bron";
      bron.textContent = "Bron: Open-Meteo (open-meteo.com)";
      weerBlok.appendChild(bron);
    })
    .catch(() => {
      toonWeerFout("Het weerbericht kon niet worden geladen. Probeer het later opnieuw.");
    });
};

const initWeer = () => {
  if (!navigator.geolocation) {
    toonWeerFout("Je browser ondersteunt geen locatiebepaling.");
    return;
  }

  weerBlok.innerHTML = "";
  const laadTekst = document.createElement("p");
  laadTekst.textContent = "Locatie bepalen en weerbericht laden...";
  weerBlok.appendChild(laadTekst);

  navigator.geolocation.getCurrentPosition(
    (positie) => haalWeerOp(positie.coords.latitude, positie.coords.longitude),
    () => toonWeerFout("Locatie kon niet worden bepaald. Geef toestemming in je browser.")
  );
};

initWeer();
