// nieuws.js – Sergio Mendez
// Haalt de top 5 tech-artikelen op via de Hacker News API (hacker-news.firebaseio.com).
// Toont per artikel: titel, domeinnaam als context, punten en aantal reacties.

const nieuwsLijst = document.getElementById("nieuws-lijst");
const AANTAL = 5;

// Toont een foutmelding in de nieuwssectie
const toonNieuwsFout = (melding) => {
  nieuwsLijst.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = melding;
  nieuwsLijst.appendChild(li);
};

// Haalt de domeinnaam uit een URL (bijvoorbeeld "github.com")
const haalDomein = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
};

// Haalt de details van één artikel op en voegt het toe aan de lijst
const voegArtikelToe = (id) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((antwoord) => antwoord.json())
    .then((artikel) => {
      const li = document.createElement("li");
      li.className = "nieuws-item";

      // Titel als link
      const titel = document.createElement("p");
      titel.className = "nieuws-titel";

      if (artikel.url) {
        const link = document.createElement("a");
        link.href = artikel.url;
        link.textContent = artikel.title;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        titel.appendChild(link);
      } else {
        titel.textContent = artikel.title;
      }

      // Domeinnaam als kleine context-zin
      const domein = artikel.url ? haalDomein(artikel.url) : null;
      const context = document.createElement("p");
      context.className = "nieuws-context";
      context.textContent = domein
        ? `Bron: ${domein}`
        : "Geplaatst op Hacker News";

      // Statistieken: punten en reacties
      const meta = document.createElement("p");
      meta.className = "nieuws-meta";
      meta.textContent = `${artikel.score} punten · ${artikel.descendants ?? 0} reacties`;

      li.appendChild(titel);
      li.appendChild(context);
      li.appendChild(meta);

      nieuwsLijst.appendChild(li);
    });
};

// Haalt de top verhalen op en toont de eerste 5
const initNieuws = () => {
  nieuwsLijst.innerHTML = "";
  const laadItem = document.createElement("li");
  laadItem.textContent = "Tech-nieuws laden...";
  nieuwsLijst.appendChild(laadItem);

  fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((antwoord) => {
      if (!antwoord.ok) {
        throw new Error("API fout");
      }
      return antwoord.json();
    })
    .then((ids) => {
      nieuwsLijst.innerHTML = "";
      const topIds = ids.slice(0, AANTAL);
      return Promise.all(topIds.map((id) => voegArtikelToe(id)));
    })
    .catch(() => {
      toonNieuwsFout("Het nieuws kon niet worden geladen. Probeer het later opnieuw.");
    });
};

initNieuws();
