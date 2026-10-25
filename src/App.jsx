import React, { useEffect, useState } from 'react';
import { groups, faqItems, chipLabels } from './content.js';

// Konverterer en CSS-tekst ("display: flex; gap: 8px") til et React style-objekt.
// Gør det let at sammenligne med designet og rette i det.
const cache = new Map();
function css(text) {
  if (!text) return undefined;
  if (cache.has(text)) return cache.get(text);
  const out = {};
  text.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = val;
  });
  cache.set(text, out);
  return out;
}

const CHIP_BASE = 'font-size: 15px; font-weight: 600; padding: 10px 16px; border-radius: 999px; min-height: 44px; cursor: pointer; ';

export default function App() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [picked, setPicked] = useState({});
  const [sent, setSent] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goTo = (id, e) => {
    if (view !== 'home') {
      if (e && e.preventDefault) e.preventDefault();
      setView('home');
      setMenu(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
      }, 30);
    } else {
      setMenu(false);
    }
  };
  const openPage = (next, e) => {
    if (e && e.preventDefault) e.preventDefault();
    setView(next);
    setMenu(false);
    window.scrollTo(0, 0);
  };

  const isDesktop = w >= 1000;
  const nav = {};
  ['top', 'ydelser', 'om', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => goTo(id, e); });

  const faqs = faqItems.map((f, i) => {
    const open = openFaq === i;
    return { ...f, open, expanded: open ? 'true' : 'false', sign: open ? '−' : '+', toggle: () => setOpenFaq(open ? -1 : i) };
  });
  const chips = chipLabels.map((label) => {
    const on = !!picked[label];
    return {
      label,
      pressed: on ? 'true' : 'false',
      style: CHIP_BASE + (on ? 'background: #142A4A; color: #ffffff; border: 1px solid #142A4A;' : 'background: #ffffff; color: #142A4A; border: 1px solid #CBD5E1;'),
      pick: () => setPicked({ ...picked, [label]: !on }),
    };
  });

  const v = {
    isDesktop,
    isCompact: !isDesktop,
    isHome: view === 'home',
    isPrivacy: view === 'privatliv',
    isCookies: view === 'cookies',
    nav,
    showPrivacy: (e) => openPage('privatliv', e),
    showCookies: (e) => openPage('cookies', e),
    showMobileMenu: !isDesktop && menu,
    menuExpanded: menu ? 'true' : 'false',
    toggleMenu: () => setMenu(!menu),
    groups, faqs, chips,
    sent,
    notSent: !sent,
    // Demo: formularen sender ikke noget endnu. Kobles til en formulartjeneste i den færdige version.
    submit: (e) => { if (e && e.preventDefault) e.preventDefault(); setSent(true); },
    reset: () => { setSent(false); setPicked({}); },
  };

  return (
<div style={css("font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #18202B; background: #ffffff; font-size: 17px; line-height: 1.65")}>

{/* TOPBAR (kun desktop) */}
{v.isDesktop && (<>
<div style={css("background: #142A4A; color: #C9D6E8; font-size: 14px")}>
<div style={css("max-width: 1200px; margin: 0 auto; padding: 8px 24px; display: flex; flex-wrap: wrap; gap: 6px 24px; justify-content: space-between; align-items: center")}>
<span>IT- og hjemmeservice til private og erhverv i Kerteminde og omegn</span>
<span style={css("display: flex; flex-wrap: wrap; gap: 6px 20px")}>
<a href="tel:+4522216814" style={css("color: #ffffff; text-decoration: none; font-weight: 600")}>Tlf. 22 21 68 14</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" style={css("color: #ffffff; text-decoration: none; font-weight: 600")}>kontakt@hverdagshjaelpogit.dk</a>
</span>
</div>
</div>
</>)}

{/* HEADER */}
<header style={css("position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,0.97); border-bottom: 1px solid #E6EAF0; backdrop-filter: blur(8px)")}>
<div style={css("max-width: 1200px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; min-height: 44px")}>
<img src="/img/mark.png" alt="" style={css("height: 44px; width: auto; display: block")} />
<span style={css("display: flex; flex-direction: column; line-height: 1.15")}>
<span style={css("font-weight: 800; font-size: 18px; color: #3F6E1C; letter-spacing: -0.01em")}>Sørens hverdagshjælp</span>
<span style={css("font-weight: 700; font-size: 10.5px; letter-spacing: 0.16em; color: #1E3A64")}>IT &amp; HJEMMESERVICE</span>
</span>
</a>

{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 2px")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="hv-nav" style={css("padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; color: #334155")}>Ydelser og priser</a>
<a href="#om" onClick={v.nav.om} className="hv-nav" style={css("padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; color: #334155")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} className="hv-nav" style={css("padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; color: #334155")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} className="hv-btn" style={css("margin-left: 12px; display: inline-flex; align-items: center; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 12px 20px; border-radius: 10px; min-height: 44px; box-sizing: border-box")}>Kontakt Søren</a>
</nav>
</>)}

{v.isCompact && (<>
<div style={css("display: flex; align-items: center; gap: 8px")}>
<a href="tel:+4522216814" aria-label="Ring til Søren på 22 21 68 14" style={css("display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 10px; background: #3F6E1C; color: #ffffff")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
</a>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 10px; border: 1px solid #CBD5E1; background: #ffffff; color: #1E3A64; cursor: pointer")}>
<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
</button>
</div>
</>)}
</div>

{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("border-top: 1px solid #E6EAF0; padding: 4px 24px 16px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 14px 0; text-decoration: none; font-weight: 700; font-size: 17px; color: #18202B; border-bottom: 1px solid #EEF1F5")}>Ydelser og priser</a>
<a href="#om" onClick={v.nav.om} style={css("padding: 14px 0; text-decoration: none; font-weight: 700; font-size: 17px; color: #18202B; border-bottom: 1px solid #EEF1F5")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 14px 0; text-decoration: none; font-weight: 700; font-size: 17px; color: #18202B; border-bottom: 1px solid #EEF1F5")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 14px 0; text-decoration: none; font-weight: 700; font-size: 17px; color: #18202B")}>Kontakt</a>
</nav>
</>)}
</header>

{v.isHome && (<>

{/* HERO */}
<section id="top" style={css("position: relative; background: linear-gradient(180deg, #F5F8F2 0%, #ffffff 100%); overflow: hidden")}>
<div style={css("position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 72px 24px 120px; display: flex; flex-wrap: wrap; align-items: center; gap: 56px")}>
<div style={css("flex: 1 1 460px; min-width: 0")}>
<p style={css("margin: 0 0 18px; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #3F6E1C")}>IT &amp; hjemmeservice · Kerteminde og omegn</p>
<h1 style={css("margin: 0 0 22px; font-size: clamp(38px, 5.4vw, 60px); line-height: 1.06; font-weight: 800; letter-spacing: -0.03em; color: #142A4A")}>Den hjælp, du altid står og mangler.</h1>
<p style={css("margin: 0 0 34px; font-size: 19px; line-height: 1.6; color: #475467; max-width: 32em")}>Jeg kommer hjem til dig og hjælper med computer, wifi, telefon og de praktiske opgaver i hjemmet. Roligt, grundigt og med tid til at forklare.</p>
<div style={css("display: flex; flex-wrap: wrap; gap: 12px")}>
<a href="tel:+4522216814" className="hv-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 17px; padding: 16px 26px; border-radius: 12px; min-height: 56px; box-sizing: border-box; box-shadow: 0 8px 20px rgba(63,110,28,0.25)")}>
<svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
Ring 22 21 68 14
</a>
<a href="#kontakt" className="hv-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #ffffff; color: #142A4A; text-decoration: none; font-weight: 700; font-size: 17px; padding: 15px 24px; border-radius: 12px; border: 1px solid #CBD5E1; min-height: 56px; box-sizing: border-box")}>
Bliv ringet op
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
</a>
</div>
</div>

<div style={css("flex: 1 1 380px; min-width: 0; display: flex; justify-content: center")}>
<div style={css("position: relative; width: 100%; max-width: 460px; height: 520px")}>
<div style={css("position: absolute; left: 0; right: 0; bottom: 0; height: 440px; background: #3F6E1C; border-radius: 28px; overflow: hidden")}>
<svg aria-hidden="true" viewBox="0 0 460 440" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<path d="M0 0 H460 V120 C 330 60, 170 40, 0 90 Z" fill="#ffffff" opacity="0.07" />
<path d="M0 330 C 140 270, 300 300, 460 210 L460 440 L0 440 Z" fill="#1E3A64" />
<path d="M0 352 C 150 300, 310 330, 460 244" stroke="#ffffff" strokeWidth="9" fill="none" strokeLinecap="round" />
<path d="M0 440 L0 410 C 160 380, 320 400, 460 340 L460 440 Z" fill="#2F5715" />
</svg>
</div>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-30%); height: 500px; width: auto; display: block")} />
<div style={css("position: absolute; bottom: 24px; left: -16px; background: #ffffff; color: #18202B; border-radius: 14px; padding: 12px 16px; box-shadow: 0 14px 34px rgba(20,42,74,0.22); display: flex; align-items: center; gap: 12px")}>
<span style={css("width: 40px; height: 40px; border-radius: 10px; background: #EAF0F7; color: #1E3A64; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a14 14 0 0 1 20 0" /><circle cx="12" cy="19.5" r="1" /></svg></span>
<span style={css("display: flex; flex-direction: column; line-height: 1.25")}><span style={css("font-size: 12px; color: #5B6474; font-weight: 600")}>1 times hjælp til wifi &amp; PC</span><span style={css("font-size: 20px; font-weight: 800; color: #142A4A")}>350 kr. <span style={css("font-size: 12px; font-weight: 600; color: #5B6474")}>inkl. moms</span></span></span>
</div>
</div>
</div>
</div>
{/* Bølge fra visitkortet */}
<svg aria-hidden="true" viewBox="0 0 1440 110" preserveAspectRatio="none" style={css("position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 90px; display: block")}>
<path d="M0 46 C 360 96, 820 100, 1440 14 L1440 52 C 860 120, 380 112, 0 78 Z" fill="#1E3A64" />
<path d="M0 110 L0 96 C 480 118, 980 92, 1440 48 L1440 110 Z" fill="#3F6E1C" />
</svg>
</section>

{/* TILLID */}
<section aria-label="Kort fortalt" style={css("background: #ffffff; border-bottom: 1px solid #EEF1F5; padding: 32px 24px")}>
<ul style={css("list-style: none; margin: 0 auto; padding: 0; max-width: 1200px; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px 32px")}>
<li style={css("display: flex; align-items: center; gap: 14px")}><span style={css("width: 44px; height: 44px; border-radius: 12px; background: #EEF4E7; color: #3F6E1C; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg></span><span style={css("line-height: 1.3")}><span style={css("display: block; font-weight: 700; font-size: 16px; color: #142A4A")}>Hjemme hos dig</span><span style={css("font-size: 14px; color: #5B6474")}>Kerteminde og omegn</span></span></li>
<li style={css("display: flex; align-items: center; gap: 14px")}><span style={css("width: 44px; height: 44px; border-radius: 12px; background: #EAF0F7; color: #1E3A64; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span><span style={css("line-height: 1.3")}><span style={css("display: block; font-weight: 700; font-size: 16px; color: #142A4A")}>Fast timepris</span><span style={css("font-size: 14px; color: #5B6474")}>Du kender prisen på forhånd</span></span></li>
<li style={css("display: flex; align-items: center; gap: 14px")}><span style={css("width: 44px; height: 44px; border-radius: 12px; background: #EEF4E7; color: #3F6E1C; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M8 12l3 3 9-9" /></svg></span><span style={css("line-height: 1.3")}><span style={css("display: block; font-weight: 700; font-size: 16px; color: #142A4A")}>Ingen dumme spørgsmål</span><span style={css("font-size: 14px; color: #5B6474")}>Jeg forklarer gerne undervejs</span></span></li>
<li style={css("display: flex; align-items: center; gap: 14px")}><span style={css("width: 44px; height: 44px; border-radius: 12px; background: #EAF0F7; color: #1E3A64; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V9l8-5 8 5v12" /><path d="M9 21v-6h6v6" /></svg></span><span style={css("line-height: 1.3")}><span style={css("display: block; font-weight: 700; font-size: 16px; color: #142A4A")}>Privat og erhverv</span><span style={css("font-size: 14px; color: #5B6474")}>Erhvervspriser + moms</span></span></li>
</ul>
</section>

{/* YDELSER OG PRISER */}
<section id="ydelser" style={css("background: #ffffff; padding: 96px 24px")}>
<div style={css("max-width: 1200px; margin: 0 auto")}>
<div style={css("display: flex; flex-wrap: wrap; gap: 16px 48px; align-items: flex-end; justify-content: space-between; margin-bottom: 56px")}>
<div style={css("max-width: 640px")}>
<p style={css("margin: 0 0 12px; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #3F6E1C")}>Ydelser og priser</p>
<h2 style={css("margin: 0; font-size: clamp(30px, 3.8vw, 42px); line-height: 1.15; font-weight: 800; letter-spacing: -0.025em; color: #142A4A")}>Hjælp til både det digitale og det praktiske</h2>
</div>
<p style={css("margin: 0; font-size: 17px; color: #475467; max-width: 400px")}>Du behøver ikke vide, hvad problemet hedder. Fortæl mig, hvad der driller, så finder vi ud af det sammen.</p>
</div>

<div style={css("display: flex; flex-direction: column; gap: 56px")}>
{v.groups.map((g, i_) => (<React.Fragment key={i_}>
<div style={css("display: flex; flex-wrap: wrap; gap: 24px; align-items: stretch")}>

<div style={css(`flex: 1 1 280px; max-width: 100%; min-width: 0; background: ${g.panelBg}; color: ${g.panelInk}; border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 6px; box-sizing: border-box; position: relative; overflow: hidden`)}>
<svg aria-hidden="true" viewBox="0 0 320 120" preserveAspectRatio="none" style={css("position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 90px")}>
<path d="M0 70 C 90 40, 200 60, 320 20 L320 120 L0 120 Z" fill={g.waveFill} />
<path d="M0 86 C 100 58, 210 78, 320 40" stroke={g.waveLine} strokeWidth="5" fill="none" />
</svg>
<span style={css(`position: relative; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${g.eyebrow}`)}>{g.eyebrowText}</span>
<h3 style={css("position: relative; margin: 4px 0 0; font-size: 26px; line-height: 1.2; font-weight: 800; letter-spacing: -0.02em")}>{g.title}</h3>
<div style={css("position: relative; display: flex; align-items: baseline; gap: 8px; margin-top: 20px")}><span style={css("font-size: 48px; font-weight: 800; letter-spacing: -0.03em; line-height: 1")}>{g.price}</span><span style={css("font-size: 15px; opacity: 0.85")}>pr. time</span></div>
<div style={css("position: relative; font-size: 14px; opacity: 0.85; margin-top: 10px")}>Privat: inkl. moms · Erhverv: + moms</div>
{g.note && (<><div style={css("position: relative; font-size: 14px; opacity: 0.85")}>{g.note}</div></>)}
<div style={css("height: 70px")}></div>
</div>

<div style={css("flex: 999 1 520px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px")}>
{g.items.map((s, i_) => (<React.Fragment key={i_}>
<article className="hv-card" style={css("background: #ffffff; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px; border: 1px solid #E6EAF0; box-shadow: 0 1px 2px rgba(16,24,40,0.04)")}>
<div style={css(`width: 50px; height: 50px; border-radius: 14px; background: ${g.tint}; color: ${g.ink}; display: flex; align-items: center; justify-content: center`)}>
{s.isWifi && (<><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg></>)}
{s.isPhone && (<><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></svg></>)}
{s.isFurniture && (<><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></svg></>)}
{s.isShopping && (<><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg></>)}
{s.isLamp && (<><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M6 14a6 6 0 0 1 12 0z" /><path d="M10 18a2 2 0 0 0 4 0" /></svg></>)}
</div>
<h4 style={css("margin: 6px 0 0; font-size: 20px; line-height: 1.3; font-weight: 700; letter-spacing: -0.01em; color: #142A4A")}>{s.title}</h4>
<p style={css("margin: 0; font-size: 16px; color: #475467")}>{s.text}</p>
<ul style={css("list-style: none; margin: auto 0 0; padding: 16px 0 0; border-top: 1px solid #EEF1F5; display: flex; flex-direction: column; gap: 8px; font-size: 15px; color: #344054")}>
{s.examples.map((ex, i_) => (<React.Fragment key={i_}><li style={css("display: flex; align-items: flex-start; gap: 10px")}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3F6E1C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={css("flex: 0 0 auto; margin-top: 3px")}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>{ex}</span></li></React.Fragment>))}
</ul>
</article>
</React.Fragment>))}
</div>
</div>
</React.Fragment>))}
</div>

<div style={css("margin-top: 40px; background: #F6F8FA; border: 1px solid #E6EAF0; border-radius: 18px; padding: 26px 30px; display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between")}>
<div style={css("max-width: 680px")}>
<h3 style={css("margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #142A4A")}>Noget helt andet?</h3>
<p style={css("margin: 0; font-size: 16px; color: #475467")}>Står din opgave ikke på listen, så spørg bare. Kan jeg klare den, siger jeg ja. Ellers siger jeg det ærligt. Større opgaver får en samlet pris på forhånd.</p>
</div>
<a href="#kontakt" className="hv-btn" style={css("display: inline-flex; align-items: center; gap: 8px; background: #142A4A; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; padding: 13px 22px; border-radius: 10px; min-height: 48px; box-sizing: border-box")}>Spørg mig
<svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
</a>
</div>
</div>
</section>

{/* OPFORDRING */}
<section style={css("background: #3F6E1C; padding: 56px 24px; position: relative; overflow: hidden")}>
<svg aria-hidden="true" viewBox="0 0 1440 200" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<path d="M0 150 C 420 90, 980 210, 1440 80 L1440 200 L0 200 Z" fill="#ffffff" opacity="0.06" />
<path d="M0 170 C 420 110, 980 230, 1440 100" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.18" />
</svg>
<div style={css("position: relative; max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: center; justify-content: space-between")}>
<div style={css("max-width: 640px")}>
<h2 style={css("margin: 0 0 8px; font-size: clamp(26px, 3.2vw, 34px); line-height: 1.2; font-weight: 800; letter-spacing: -0.02em; color: #ffffff")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0; font-size: 17px; color: #DDEBCF")}>Ring eller send en sms, så finder vi en tid, der passer.</p>
</div>
<a href="tel:+4522216814" className="hv-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #ffffff; color: #142A4A; text-decoration: none; font-weight: 800; font-size: 18px; padding: 16px 26px; border-radius: 12px; min-height: 56px; box-sizing: border-box")}>
<svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
22 21 68 14
</a>
</div>
</section>

{/* OM SØREN */}
<section id="om" style={css("background: #F5F8F2; padding: 96px 24px")}>
<div style={css("max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 56px; align-items: center")}>
<div style={css("flex: 1 1 300px; min-width: 0; display: flex; justify-content: center")}>
<div style={css("width: 100%; max-width: 380px; aspect-ratio: 1 / 1; border-radius: 24px; background: #ffffff; border: 1px solid #E2E8E0; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(20,42,74,0.08)")}>
<img src="/img/logo.png" alt="Logo for Sørens hverdagshjælp" style={css("width: 70%; height: auto; display: block")} />
</div>
</div>
<div style={css("flex: 1 1 460px; min-width: 0")}>
<p style={css("margin: 0 0 12px; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #3F6E1C")}>Om Søren</p>
<h2 style={css("margin: 0 0 22px; font-size: clamp(30px, 3.8vw, 42px); line-height: 1.15; font-weight: 800; letter-spacing: -0.025em; color: #142A4A")}>En hjælpende hånd fra én, der har tid</h2>
<p style={css("margin: 0 0 16px; font-size: 18px; color: #475467")}>Hej, jeg hedder Søren. Jeg hjælper med de ting i hverdagen, der er lettere, når man er to om dem. Det kan være en computer, der ikke vil, en telefon, der skal sættes op, eller et skab, der skal samles.</p>
<p style={css("margin: 0 0 30px; font-size: 18px; color: #475467")}>Jeg forklarer gerne undervejs, så du selv kan næste gang, hvis du vil. Og der er ingen dumme spørgsmål.</p>
<a href="#kontakt" className="hv-row" style={css("display: inline-flex; align-items: center; gap: 8px; color: #142A4A; font-weight: 700; font-size: 17px; min-height: 44px")}>Tag kontakt til mig
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
</a>
</div>
</div>
</section>

{/* FAQ */}
<section id="spoergsmaal" style={css("background: #ffffff; padding: 96px 24px 120px")}>
<div style={css("max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 40px 64px")}>
<div style={css("flex: 1 1 300px; min-width: 0")}>
<p style={css("margin: 0 0 12px; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #3F6E1C")}>Spørgsmål</p>
<h2 style={css("margin: 0 0 18px; font-size: clamp(30px, 3.8vw, 42px); line-height: 1.15; font-weight: 800; letter-spacing: -0.025em; color: #142A4A")}>Ofte stillede spørgsmål</h2>
<p style={css("margin: 0; font-size: 17px; color: #475467")}>Finder du ikke svaret her, så ring til mig på <a href="tel:+4522216814" style={css("font-weight: 700")}>22 21 68 14</a>.</p>
</div>
<div style={css("flex: 1.6 1 480px; min-width: 0; border-top: 1px solid #E6EAF0")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css("border-bottom: 1px solid #E6EAF0")}>
<h3 style={css("margin: 0; font-size: 18px")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} className="hv-row" style={css("width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; background: transparent; border: 0; padding: 22px 0; font-size: 18px; font-weight: 700; color: #142A4A; cursor: pointer; min-height: 64px")}>
<span>{f.q}</span>
<span style={css("flex: 0 0 auto; width: 32px; height: 32px; border-radius: 999px; border: 1px solid #CBD5E1; color: #1E3A64; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 600; line-height: 1")}>{f.sign}</span>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 48px 24px 0; font-size: 16px; color: #475467")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* KONTAKT */}
<section id="kontakt" style={css("position: relative; background: #142A4A; padding: 96px 24px")}>
<svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none" style={css("position: absolute; left: 0; right: 0; top: -99px; width: 100%; height: 100px; display: block")}>
<path d="M0 100 L0 64 C 420 10, 960 110, 1440 30 L1440 100 Z" fill="#142A4A" />
<path d="M0 58 C 420 4, 960 104, 1440 24" stroke="#3F6E1C" strokeWidth="8" fill="none" />
</svg>
<div style={css("max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start")}>
<div style={css("flex: 1 1 360px; min-width: 0; color: #ffffff")}>
<p style={css("margin: 0 0 12px; font-weight: 700; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #B9D79A")}>Kontakt</p>
<h2 style={css("margin: 0 0 18px; font-size: clamp(30px, 3.8vw, 42px); line-height: 1.15; font-weight: 800; letter-spacing: -0.025em; color: #ffffff")}>Ring, skriv eller send en sms</h2>
<p style={css("margin: 0 0 34px; font-size: 17px; color: #C9D6E8; max-width: 28em")}>Det letteste er at ringe eller sende en sms. Tager jeg ikke telefonen, ringer jeg tilbage.</p>
<div style={css("display: flex; flex-direction: column; gap: 12px; max-width: 420px")}>
<a href="tel:+4522216814" className="hv-btn" style={css("display: flex; align-items: center; gap: 16px; text-decoration: none; background: #3F6E1C; color: #ffffff; border-radius: 14px; padding: 18px 22px")}>
<span style={css("width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.16); display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg></span>
<span style={css("display: flex; flex-direction: column; line-height: 1.25")}><span style={css("font-size: 14px; color: #DDEBCF")}>Ring eller sms</span><span style={css("font-size: 24px; font-weight: 800; letter-spacing: -0.01em")}>22 21 68 14</span></span>
</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="hv-btn" style={css("display: flex; align-items: center; gap: 16px; text-decoration: none; background: #1E3A64; color: #ffffff; border-radius: 14px; padding: 18px 22px; border: 1px solid #2B4670")}>
<span style={css("width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.10); display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
<span style={css("display: flex; flex-direction: column; line-height: 1.25; min-width: 0")}><span style={css("font-size: 14px; color: #C9D6E8")}>Skriv en mail</span><span style={css("font-size: 17px; font-weight: 700; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</span></span>
</a>
</div>
</div>

<div style={css("flex: 1 1 460px; min-width: 0; background: #ffffff; border-radius: 20px; padding: 36px; box-sizing: border-box; box-shadow: 0 24px 60px rgba(0,0,0,0.25)")}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 18px")}>
<div>
<h3 style={css("margin: 0 0 4px; font-size: 22px; font-weight: 800; letter-spacing: -0.01em; color: #142A4A")}>Bliv ringet op</h3>
<p style={css("margin: 0; font-size: 15px; color: #5B6474")}>Udfyld formularen, så ringer jeg dig op.</p>
</div>
<fieldset style={css("border: 0; margin: 0; padding: 0")}>
<legend style={css("font-size: 15px; font-weight: 700; color: #18202B; margin-bottom: 10px; padding: 0")}>Hvad skal du have hjælp til?</legend>
<div style={css("display: flex; flex-wrap: wrap; gap: 8px")}>
{v.chips.map((c, i_) => (<React.Fragment key={i_}>
<button type="button" onClick={c.pick} aria-pressed={c.pressed} className="hv-btn" style={css(c.style)}>{c.label}</button>
</React.Fragment>))}
</div>
</fieldset>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px")}>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="navn" style={css("font-size: 15px; font-weight: 700")}>Navn</label>
<input id="navn" name="navn" type="text" autoComplete="name" style={css("font-size: 17px; padding: 12px 14px; border-radius: 10px; border: 1px solid #CBD5E1; background: #ffffff; min-height: 50px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="tlf" style={css("font-size: 15px; font-weight: 700")}>Telefon</label>
<input id="tlf" name="tlf" type="tel" autoComplete="tel" style={css("font-size: 17px; padding: 12px 14px; border-radius: 10px; border: 1px solid #CBD5E1; background: #ffffff; min-height: 50px; box-sizing: border-box")} />
</div>
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="besked" style={css("font-size: 15px; font-weight: 700")}>Besked <span style={css("font-weight: 500; color: #5B6474")}>(valgfrit)</span></label>
<textarea id="besked" name="besked" rows="4" style={css("font-size: 17px; padding: 12px 14px; border-radius: 10px; border: 1px solid #CBD5E1; background: #ffffff; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="hv-btn" style={css("background: #3F6E1C; color: #ffffff; border: 0; border-radius: 12px; font-size: 17px; font-weight: 700; padding: 16px 28px; min-height: 56px; cursor: pointer")}>Send besked</button>
<p style={css("margin: 0; font-size: 14px; color: #5B6474")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 14px; align-items: flex-start; padding: 24px 0")}>
<span style={css("width: 60px; height: 60px; border-radius: 999px; background: #3F6E1C; color: #ffffff; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
<h3 style={css("margin: 0; font-size: 24px; font-weight: 800; color: #142A4A")}>Tak for din besked</h3>
<p style={css("margin: 0; font-size: 17px; color: #475467")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="hv-btn" style={css("background: transparent; border: 1px solid #CBD5E1; color: #142A4A; border-radius: 10px; font-size: 16px; font-weight: 700; padding: 12px 20px; min-height: 46px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</section>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("background: #ffffff; padding: 64px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 17px; color: #344054")}>
<a href="#top" onClick={v.nav.top} className="hv-row" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #1E3A64; text-decoration: none; min-height: 44px; margin-bottom: 16px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 12px; font-size: clamp(32px, 4.4vw, 46px); line-height: 1.1; font-weight: 800; letter-spacing: -0.025em; color: #142A4A")}>Privatlivspolitik</h1>
<p style={css("margin: 0 0 40px; font-size: 15px; color: #5B6474")}>Senest opdateret: oktober 2026</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 32px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 32px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 32px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 32px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 32px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 32px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 600")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("background: #ffffff; padding: 64px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 17px; color: #344054")}>
<a href="#top" onClick={v.nav.top} className="hv-row" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #1E3A64; text-decoration: none; min-height: 44px; margin-bottom: 16px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 12px; font-size: clamp(32px, 4.4vw, 46px); line-height: 1.1; font-weight: 800; letter-spacing: -0.025em; color: #142A4A")}>Cookiepolitik</h1>
<p style={css("margin: 0 0 40px; font-size: 15px; color: #5B6474")}>Senest opdateret: oktober 2026</p>

<div style={css("background: #F5F8F2; border: 1px solid #E2E8E0; border-radius: 16px; padding: 24px 26px; margin-bottom: 36px; display: flex; gap: 16px; align-items: flex-start")}>
<span style={css("width: 40px; height: 40px; border-radius: 10px; background: #3F6E1C; color: #ffffff; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
<p style={css("margin: 0; color: #18202B")}><strong>Kort fortalt:</strong> Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
</div>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 32px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 32px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 32px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>

<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #142A4A")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</article>
</main>
<svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" style={css("width: 100%; height: 70px; display: block; background: #ffffff")}>
<path d="M0 90 L0 56 C 420 6, 960 100, 1440 24 L1440 90 Z" fill="#0F2039" />
<path d="M0 50 C 420 0, 960 94, 1440 18" stroke="#3F6E1C" strokeWidth="7" fill="none" />
</svg>
</>)}

{v.isPrivacy && (<>
<svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" style={css("width: 100%; height: 70px; display: block; background: #ffffff")}>
<path d="M0 90 L0 56 C 420 6, 960 100, 1440 24 L1440 90 Z" fill="#0F2039" />
<path d="M0 50 C 420 0, 960 94, 1440 18" stroke="#3F6E1C" strokeWidth="7" fill="none" />
</svg>
</>)}

{/* FOOTER */}
<footer style={css("background: #0F2039; color: #C9D6E8; padding: 56px 24px 32px")}>
<div style={css("max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px")}>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<span style={css("font-weight: 800; font-size: 20px; color: #ffffff")}>Sørens hverdagshjælp</span>
<span style={css("font-weight: 700; font-size: 11px; letter-spacing: 0.16em; color: #B9D79A")}>IT &amp; HJEMMESERVICE</span>
<span style={css("font-size: 15px; margin-top: 10px")}>Kerteminde og omegn</span>
<span style={css("font-size: 15px")}>CVR 46656814</span>
</div>
<div style={css("display: flex; flex-direction: column; gap: 8px; font-size: 15px")}>
<span style={css("font-weight: 700; color: #ffffff; margin-bottom: 4px")}>Ydelser</span>
<span>PC &amp; wifi</span><span>iPhone &amp; iPad</span><span>Samling af møbler</span><span>Indkøb af dagligvarer</span><span>Ophæng af hylder og lamper</span>
</div>
<div style={css("display: flex; flex-direction: column; gap: 8px; font-size: 15px")}>
<span style={css("font-weight: 700; color: #ffffff; margin-bottom: 4px")}>Kontakt</span>
<a href="tel:+4522216814" className="hv-row" style={css("color: #ffffff; text-decoration: none")}>Tlf. 22 21 68 14</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="hv-row" style={css("color: #ffffff; text-decoration: none; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a>
</div>
</div>
<div style={css("max-width: 1200px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid #22385A; font-size: 14px; color: #9FB2CC; display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between; align-items: center")}>
<span>© 2026 Sørens hverdagshjælp · CVR 46656814</span>
<span style={css("display: flex; gap: 4px 20px; flex-wrap: wrap")}>
<a href="#top" onClick={v.showPrivacy} style={css("color: #DCE5F2; min-height: 32px; display: inline-flex; align-items: center")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} style={css("color: #DCE5F2; min-height: 32px; display: inline-flex; align-items: center")}>Cookiepolitik</a>
</span>
</div>
</footer>

{v.isCompact && (<>
<div style={css("height: 84px; background: #0F2039")}></div>
<div style={css("position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; background: #ffffff; border-top: 1px solid #E6EAF0; box-shadow: 0 -8px 24px rgba(20,42,74,0.10); padding: 12px 16px; display: flex; gap: 10px")}>
<a href="tel:+4522216814" style={css("flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; min-height: 52px")}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
Ring
</a>
<a href="sms:+4522216814" style={css("flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; color: #142A4A; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; border: 1px solid #CBD5E1; min-height: 52px")}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
Send sms
</a>
</div>
</>)}

</div>
  );
}
