const projecten = [
  {
    titel: "Portfoliosite",
    categorie: "HTML / CSS",
    beschrijving:
      "Dit is de portfoliosite die je nu bekijkt. De site is gebouwd met semantische HTML5 en responsive CSS3. De pagina's zijn opgebouwd met correcte HTML-elementen zoals header, nav, main, section en footer.",
    details:
      "De layout past zich aan op verschillende schermgroottes: mobiel, tablet en desktop. Er is een skip-link aanwezig voor toetsenbordgebruikers en de kleuren voldoen aan WCAG AA-contrast.",
    jaar: "2026",
    type: "Persoonlijk project",
  },
  {
    titel: "Hotelsimulatie",
    categorie: "Java",
    beschrijving:
      "Een simulatie van een hotel in Java. In de simulatie worden gasten en medewerkers aangemaakt die elk hun eigen gedrag hebben.",
    details:
      "Gasten kunnen inchecken, een kamer bezetten en uitchecken. Tijdens hun verblijf kunnen er events plaatsvinden zoals een roomservice-aanvraag, een klacht of een storing. Medewerkers reageren op deze events en handelen ze af. De simulatie loopt automatisch door een tijdslijn.",
    jaar: "2026",
    type: "Schoolopdracht",
  },
];

const maakProjectBlok = (project) => {
  const li = document.createElement("li");
  li.className = "blok blok--groot";

  const label = document.createElement("p");
  label.className = "label";
  label.textContent = project.categorie;

  const titel = document.createElement("h3");
  titel.textContent = project.titel;

  const beschrijving = document.createElement("p");
  beschrijving.textContent = project.beschrijving;

  const details = document.createElement("p");
  details.textContent = project.details;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${project.jaar} · ${project.type} · ${project.categorie}`;

  li.appendChild(label);
  li.appendChild(titel);
  li.appendChild(beschrijving);
  li.appendChild(details);
  li.appendChild(meta);

  return li;
};

const renderProjecten = (filter) => {
  const lijst = document.getElementById("projecten-lijst");
  lijst.innerHTML = "";

  const gefilterd = filter === "alle"
    ? projecten
    : projecten.filter((p) => p.categorie === filter);

  gefilterd.forEach((project) => {
    lijst.appendChild(maakProjectBlok(project));
  });
};

const initFilter = () => {
  const knoppen = document.querySelectorAll(".filter-knoppen button");

  knoppen.forEach((knop) => {
    knop.addEventListener("click", () => {
      knoppen.forEach((k) => k.classList.remove("actief"));
      knop.classList.add("actief");
      renderProjecten(knop.dataset.filter);
    });
  });
};

renderProjecten("alle");
initFilter();
