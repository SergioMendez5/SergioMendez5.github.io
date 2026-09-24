# Request/Response-schema – Sergio Mendez Portfolio

## Overzicht

Deze site is een **statische website** gehost op GitHub Pages.
Er is geen server-side verwerking: alle bestanden (HTML, CSS) worden rechtstreeks
door GitHub's CDN geserveerd.

---

## Stap-voor-stap cyclus

```
Browser (client)                    GitHub Pages (server/CDN)
      |                                       |
      |  1. GET /index.html HTTP/1.1          |
      |  Host: sergiomendez5.github.io -----> |
      |                                       |  2. Zoek index.html op schijf
      |                                       |     (of CDN-cache)
      |  3. HTTP/1.1 200 OK                   |
      |  Content-Type: text/html <----------- |
      |                                       |
      |  4. Browser parseert HTML             |
      |     → vindt <link rel="stylesheet">   |
      |                                       |
      |  5. GET /css/style.css -------------> |
      |  6. HTTP/1.1 200 OK                   |
      |     Content-Type: text/css <--------- |
      |                                       |
      |  7. Browser past CSS toe              |
      |     → pagina is zichtbaar             |
```

---

## Uitleg per stap

| # | Wie      | Wat                                                                 |
|---|----------|---------------------------------------------------------------------|
| 1 | Client   | Browser stuurt een HTTP GET-request voor de gevraagde HTML-pagina  |
| 2 | Server   | GitHub Pages zoekt het bestand op (of levert het uit de CDN-cache) |
| 3 | Server   | Antwoord: statuscode 200 OK + HTML-inhoud als response body         |
| 4 | Client   | Browser parseert de HTML en bouwt de DOM                           |
| 5 | Client   | Voor elke externe resource (CSS) volgt een nieuw GET-request        |
| 6 | Server   | Antwoord: 200 OK + CSS-inhoud                                       |
| 7 | Client   | Browser combineert DOM + CSSOM → render tree → pagina schilderen   |

---

## Navigatie tussen pagina's

Klikken op een `<a href="projects.html">` start de cyclus opnieuw:
de browser stuurt een nieuw GET-request voor `projects.html`.
Omdat de site statisch is, is er **geen** server-side logica, sessie of database.

---

## HTTP-statuscodes die kunnen voorkomen

| Code | Betekenis                                    |
|------|----------------------------------------------|
| 200  | OK – bestand gevonden en geleverd            |
| 301  | Redirect – bijv. HTTP → HTTPS (GitHub Pages) |
| 304  | Not Modified – browser gebruikt cache        |
| 404  | Not Found – bestand bestaat niet             |

---

## Bronnen

- MDN Web Docs – [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- web.dev – [How browsers work](https://web.dev/articles/howbrowserswork)
