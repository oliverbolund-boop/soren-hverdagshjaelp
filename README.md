# Sørens hverdagshjælp – demo

Designforslag til hjemmesiden for Sørens hverdagshjælp (IT & hjemmeservice, Kerteminde og omegn).
Siden er bygget med Vite og React og kan lægges gratis på Vercel eller Netlify.

> Siden er en **demo** og er skjult for Google (`noindex` i `index.html`). Fjern den linje, når siden skal live.

## Ret indhold

- **Priser, ydelser og spørgsmål:** `src/content.js`
- **Øvrige tekster og layout:** `src/App.jsx`
- **Farver for hover-effekter m.m.:** `src/styles.css`
- **Billeder og ikon:** `public/img/` og `public/favicon.png`
- **Sidetitel og Google-beskrivelse:** `index.html`

Skrifttypen (Plus Jakarta Sans) ligger i selve projektet via `@fontsource`, så der hentes intet fra Google.

## Kør lokalt

```bash
npm install
npm run dev
```

## Udgiv på Vercel

1. Log ind på vercel.com med din GitHub-konto.
2. **Add New → Project**, og vælg dette repo.
3. Vercel finder selv ud af, at det er Vite. Tjek at:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Tryk **Deploy**. Du får et link som `demo-sorens-hverdagshjaelp.vercel.app`.
5. Vil du have et underdomæne, fx `soren.ditdomæne.dk`: **Settings → Domains**.

Hver gang der bliver pushet til GitHub, opdaterer Vercel siden automatisk.

## Mangler før siden går live

- Kontaktformularen sender ikke noget endnu. Den skal kobles til en formulartjeneste (fx Formspree, Web3Forms eller Netlify Forms).
- Fjern `noindex` i `index.html`.
- Peg domænet hverdagshjaelpogit.dk på siden.
