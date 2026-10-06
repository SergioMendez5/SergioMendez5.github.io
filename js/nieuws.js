const nieuwsLijst = document.getElementById("nieuws-lijst");
const AANTAL = 5;

const toonNieuwsFout = (melding) => {
  nieuwsLijst.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = melding;
  nieuwsLijst.appendChild(li);
};

// Haal domeinnaam op uit URL
const haalDomein = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
};

const voegArtikelToe = (id) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((antwoord) => antwoord.json())
    .then((artikel) => {
      const li = document.createElement("li");
      li.className = "nieuws-item";

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

      const domein = artikel.url ? haalDomein(artikel.url) : null;
      const context = document.createElement("p");
      context.className = "nieuws-context";
      context.textContent = domein ? `Bron: ${domein}` : "Geplaatst op Hacker News";

      const meta = document.createElement("p");
      meta.className = "nieuws-meta";
      meta.textContent = `${artikel.score} punten · ${artikel.descendants ?? 0} reacties`;

      li.appendChild(titel);
      li.appendChild(context);
      li.appendChild(meta);
      nieuwsLijst.appendChild(li);
    });
};

const initNieuws = () => {
  nieuwsLijst.innerHTML = "";
  const laadItem = document.createElement("li");
  laadItem.textContent = "Tech-nieuws laden...";
  nieuwsLijst.appendChild(laadItem);

  fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((antwoord) => {
      if (!antwoord.ok) throw new Error("API fout");
      return antwoord.json();
    })
    .then((ids) => {
      nieuwsLijst.innerHTML = "";
      return Promise.all(ids.slice(0, AANTAL).map((id) => voegArtikelToe(id)));
    })
    .catch(() => {
      toonNieuwsFout("Het nieuws kon niet worden geladen. Probeer het later opnieuw.");
    });
};

initNieuws();
