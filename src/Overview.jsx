import React from 'react';

const FONTS = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

const CSS = `
body{margin:0;background:#F5F7F3}
.ov{min-height:100vh;background:#F5F7F3;color:#142A4A;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:17px;line-height:1.6}
.ov *{box-sizing:border-box}
.ov-wrap{max-width:1080px;margin:0 auto;padding:56px 16px 72px}
.ov-eyebrow{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#3F6E1C}
.ov h1{margin:0 0 16px;font-size:clamp(34px,5vw,54px);line-height:1.05;font-weight:800;letter-spacing:-.03em}
.ov-lead{margin:0 0 12px;max-width:40em;font-size:19px;color:#4B5668}
.ov-note{margin:0 0 44px;max-width:40em;font-size:16px;color:#4B5668}
.ov-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.ov-card{display:flex;flex-direction:column;background:#fff;border:1px solid #E1E6DD;border-radius:18px;overflow:hidden;text-decoration:none;color:#142A4A;transition:transform .2s ease,box-shadow .2s ease}
.ov-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(20,42,74,.12)}
.ov-card:focus-visible{outline:3px solid #E9A23B;outline-offset:3px}
.ov-thumb{height:150px;position:relative;overflow:hidden}
.ov-thumb span{position:absolute;display:block}
.ov-body{padding:20px 22px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
.ov-num{font-size:13px;font-weight:700;color:#3F6E1C;letter-spacing:.06em}
.ov-name{margin:0;font-size:21px;font-weight:800;letter-spacing:-.02em}
.ov-desc{margin:0;font-size:15px;color:#4B5668;flex:1}
.ov-open{margin-top:10px;display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:15px;color:#3F6E1C}
.ov-open svg{transition:transform .2s ease}
.ov-card:hover .ov-open svg{transform:translateX(4px)}
.ov-foot{margin-top:48px;padding:24px;border-radius:18px;background:#EEF4E7;font-size:16px}
.ov-foot strong{display:block;margin-bottom:4px;font-size:18px}
@media (prefers-reduced-motion: reduce){.ov-card,.ov-open svg{transition:none}.ov-card:hover{transform:none}}
`;

const s = (o) => o;
const designs = [
  { n: 1, name: 'Bento', desc: 'Lyst og moderne med afrundede kort, faner til ydelserne og et løbebånd.', bg: '#F2F4F1', parts: [
    s({ left: 14, top: 14, width: '58%', height: 122, background: '#fff', borderRadius: 14 }),
    s({ right: 14, top: 14, width: '32%', height: 76, background: '#3F6E1C', borderRadius: 14 }),
    s({ right: 14, bottom: 14, width: '32%', height: 38, background: '#0D1B2A', borderRadius: 12 }),
    s({ left: 26, top: 34, width: '42%', height: 12, background: '#0D1B2A', borderRadius: 6 }),
    s({ left: 26, top: 54, width: '30%', height: 12, background: '#3F6E1C', borderRadius: 6 }) ] },
  { n: 2, name: 'Organisk', desc: 'Flydende bølger, krydsende løbebånd og ydelserne som en ren liste.', bg: '#ffffff', parts: [
    s({ right: 18, top: 16, width: 118, height: 118, borderRadius: '46% 54% 50% 50%', background: '#3F6E1C' }),
    s({ left: -10, right: -10, bottom: 30, height: 14, background: '#3F6E1C', transform: 'rotate(2deg)', opacity: 0.8 }),
    s({ left: -10, right: -10, bottom: 22, height: 22, background: '#10233F', transform: 'rotate(-3deg)' }),
    s({ left: 20, top: 28, width: '46%', height: 14, background: '#10233F', borderRadius: 4 }),
    s({ left: 20, top: 50, width: '30%', height: 14, background: '#3F6E1C', borderRadius: 4 }) ] },
  { n: 3, name: 'Mørk delt skærm', desc: 'Mørkt og eksklusivt. Billedet glider væk, når man scroller, og ydelserne folder sig ud.', bg: '#0B1A2E', parts: [
    s({ left: 0, right: 0, top: 0, height: 14, background: '#C6E97A' }),
    s({ left: 14, top: 26, width: '40%', height: 110, background: '#3F6E1C', borderRadius: 12 }),
    s({ right: 20, top: 36, width: '44%', height: 14, background: '#fff', borderRadius: 4 }),
    s({ right: 20, top: 58, width: '30%', height: 14, background: '#C6E97A', borderRadius: 4 }),
    s({ right: 20, bottom: 22, width: '44%', height: 30, background: '#fff', borderRadius: 10 }) ] },
  { n: 4, name: 'Nordisk minimal', desc: 'Roligt og luftigt med tynde streger, en klar pristabel og bløde overgange.', bg: '#ffffff', parts: [
    s({ right: 0, top: 0, bottom: 0, width: '42%', background: '#3F6E1C' }),
    s({ left: 18, top: 30, width: '44%', height: 16, background: '#0F1E33' }),
    s({ left: 18, top: 54, width: '36%', height: 16, background: '#0F1E33' }),
    s({ left: 18, right: '46%', top: 96, height: 1, background: '#C9CFD6' }),
    s({ left: 18, top: 108, width: '24%', height: 22, background: '#3F6E1C' }) ] },
  { n: 5, name: 'Lun og lokal', desc: 'Varmt og hyggeligt med håndskrevne noter, tegnede ikoner og et kort over Kerteminde.', bg: '#F7F3EC', parts: [
    s({ right: 0, top: 0, bottom: 0, width: '44%', background: '#3F6E1C' }),
    s({ right: 22, top: 22, width: 34, height: 34, borderRadius: 999, background: '#D9A93A' }),
    s({ left: 18, top: 30, width: '42%', height: 16, background: '#1F2A24', borderRadius: 3 }),
    s({ left: 18, top: 56, width: '14%', height: 6, background: '#D9A93A', borderRadius: 3 }),
    s({ left: 0, right: 0, bottom: 0, height: 26, background: '#22401B' }) ] },
  { n: 6, name: 'Kraftig og tydelig', desc: 'Sort og gult med store overskrifter, mørke priskort og en liste med flueben.', bg: '#15171B', parts: [
    s({ left: 18, top: 26, width: '52%', height: 14, background: '#F5C842' }),
    s({ left: 18, top: 48, width: '40%', height: 14, background: '#F5C842' }),
    s({ left: 18, top: 78, width: '24%', height: 20, background: '#F5C842', borderRadius: 4 }),
    s({ right: 26, top: 24, width: 86, height: 86, borderRadius: 999, background: '#1E3A64' }),
    s({ left: 0, right: 0, bottom: 0, height: 26, background: '#000' }) ] },
];

export default function Overview() {
  return (
    <div className="ov">
      <link rel="stylesheet" href={FONTS} />
      <style>{CSS}</style>
      <main className="ov-wrap">
        <p className="ov-eyebrow">Sørens hverdagshjælp</p>
        <h1>Seks bud på din nye hjemmeside</h1>
        <p className="ov-lead">Hej Søren. Her er seks forskellige designforslag. Indholdet er det samme, men udseendet og stemningen er forskellige.</p>
        <p className="ov-note">Tryk på et forslag for at se det. Du kan scrolle og klikke rundt, som på en rigtig hjemmeside, og prøve dem på både telefon og computer. Kontaktformularen sender ikke noget endnu.</p>
        <div className="ov-grid">
          {designs.map((d) => (
            <a key={d.n} className="ov-card" href={`/forslag/${d.n}`}>
              <div className="ov-thumb" aria-hidden="true" style={{ background: d.bg }}>
                {d.parts.map((p, i) => <span key={i} style={p} />)}
              </div>
              <div className="ov-body">
                <span className="ov-num">FORSLAG {d.n}</span>
                <h2 className="ov-name">{d.name}</h2>
                <p className="ov-desc">{d.desc}</p>
                <span className="ov-open">Se forslaget
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="ov-foot">
          <strong>Hvilken kan du bedst lide?</strong>
          Skriv eller ring og fortæl, hvilket forslag du foretrækker. Du må også gerne sige, hvis du kan lide noget fra flere af dem, så sætter vi det sammen.
        </div>
      </main>
    </div>
  );
}
