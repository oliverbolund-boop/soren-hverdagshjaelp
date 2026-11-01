// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap';
const PAGE_CSS = `body{margin:0;background:#ffffff}
html{scroll-behavior:smooth}
a{color:#0F1E33}a:hover{color:#3F6E1C}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #E9A23B;outline-offset:3px}
.n-ul{background-image:linear-gradient(currentColor,currentColor);background-size:0% 1.5px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .3s ease}
.n-ul:hover{background-size:100% 1.5px}
.n-btn{transition:background-color .2s ease,color .2s ease,transform .2s ease}
.n-btn:hover{transform:translateY(-2px)}
.n-arrow{transition:transform .25s ease}
.n-btn:hover .n-arrow,.n-row:hover .n-arrow{transform:translateX(6px)}
.n-row{transition:background-color .25s ease}
.n-row:hover{background:#F4F6F3}
.n-field{border:0;border-bottom:1.5px solid #C9CFD6;background:transparent;transition:border-color .2s ease}
.n-field:hover{border-bottom-color:#8C96A3}
.n-field:focus{border-bottom-color:#3F6E1C;outline:none}
.n-reveal{transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
@keyframes n-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.n-track{animation:n-left 46s linear infinite}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.n-track{animation:none}.n-reveal,.n-btn,.n-arrow,.n-row,.n-ul{transition:none}.n-btn:hover{transform:none}}`;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, openFaq: 0, sent: false, view: 'home', shown: {} };
    this.onResize = () => { this.setState({ w: window.innerWidth }); this.check(); };
    this.raf = 0;
    this.reduce = false;
    this.onScroll = () => {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => { this.raf = 0; this.check(); });
    };
  }
  // Viser en sektion, når den kommer ind i billedet. Gemmer kun, så der ikke regnes om ved hver scroll.
  check() {
    const ids = ['ydelser', 'priser', 'om', 'spoergsmaal', 'kontakt'];
    const vh = window.innerHeight || 800;
    let add = null;
    ids.forEach((id) => {
      if (this.state.shown[id]) return;
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.88) { add = add || {}; add[id] = true; }
    });
    if (add) this.setState({ shown: Object.assign({}, this.state.shown, add) });
  }
  componentDidMount() {
    try { this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { this.reduce = false; }
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    setTimeout(() => this.check(), 60);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
  goTo(id, e) {
    if (this.state.view !== 'home') {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ view: 'home', menu: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
        this.check();
      }, 30);
    } else {
      this.setState({ menu: false });
      setTimeout(() => this.check(), 400);
    }
  }
  openPage(view, e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ view, menu: false });
    window.scrollTo(0, 0);
  }
  renderVals() {
    const s = this.state;
    const isDesktop = s.w >= 1000;
    const isPhone = s.w < 640;
    const rv = {};
    ['ydelser', 'priser', 'om', 'spoergsmaal', 'kontakt'].forEach((id) => {
      const on = this.reduce || !!s.shown[id];
      rv[id] = { o: on ? '1' : '0', t: on ? 'none' : 'translateY(48px)' };
    });
    const groups = [
      {
        label: 'IT-hjælp', price: '350 kr.', color: '#1E3A64',
        items: [
          { title: 'PC & wifi', text: 'Når computeren er langsom, printeren ikke vil, eller wifi’en falder ud i stuen.', examples: 'Ny computer — Wifi og router — Printer, mail og opdateringer' },
          { title: 'iPhone & iPad', text: 'Jeg hjælper dig godt i gang med telefonen eller tabletten og får styr på det, der driller.', examples: 'Billeder — MitID, apps og MobilePay — Videoopkald med familien' }
        ]
      },
      {
        label: 'Hjemmeservice', price: '500 kr.', color: '#3F6E1C',
        items: [
          { title: 'Samling af møbler', text: 'Reolen, sengen eller kommoden fra papkassen, samlet og stillet på plads.', examples: 'Flatpack-møbler — Havemøbler — Emballagen fjernet' },
          { title: 'Indkøb af dagligvarer', text: 'Har du svært ved at komme ud, handler jeg ind for dig og bærer varerne ind.', examples: 'Fast ugentlig tur — Enkelte indkøb — Afhentning af pakker' },
          { title: 'Ophæng af hylder og lamper', text: 'Det, der skal op at hænge, hænger jeg lige og solidt op.', examples: 'Hylder og billeder — Lamper og gardiner — Tv på væggen' }
        ]
      }
    ];
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    const ticker = [];
    for (let r = 0; r < 2; r++) words.forEach((x, i) => ticker.push({
      label: x,
      color: i % 2 === 0 ? '#0F1E33' : 'transparent',
      stroke: i % 2 === 0 ? '0px transparent' : '1.5px #0F1E33'
    }));
    const faqRaw = [
      { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
      { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
      { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
      { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
      { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' }
    ];
    const faqs = faqRaw.map((f, i) => {
      const open = s.openFaq === i;
      return Object.assign({}, f, {
        n: '0' + (i + 1),
        open, expanded: open ? 'true' : 'false',
        iconStyle: 'flex: 0 0 auto; transition: transform .3s ease; ' + (open ? 'transform: rotate(45deg);' : ''),
        toggle: () => this.setState({ openFaq: open ? -1 : i })
      });
    });
    const nav = {};
    ['top', 'ydelser', 'priser', 'om', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isHome: s.view === 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      heroPad: isPhone ? '40px 24px 48px' : (isDesktop ? '64px 56px 64px max(28px, calc((100vw - 1360px) / 2 + 28px))' : '56px 40px'),
      heroMin: isDesktop ? '680px' : '0px',
      photoMin: isDesktop ? '680px' : (isPhone ? '440px' : '540px'),
      factCols: isDesktop ? '4' : '2',
      factBorder: isDesktop ? '0' : '1px solid #E3E6EA',
      factRight: isDesktop ? '1px solid #E3E6EA' : '0',
      stickyPos: isDesktop ? 'sticky' : 'static',
      listPad: isDesktop ? '96px 0 64px' : '0 0 72px',
      rowCols: isDesktop ? 'minmax(0, 1fr) minmax(0, 1.3fr) 32px' : 'minmax(0, 1fr)',
      wordmarkSize: 'min(8vw, 116px)',
      rv, groups, ticker, faqs, nav,
      showPrivacy: (e) => this.openPage('privatliv', e),
      showCookies: (e) => this.openPage('cookies', e),
      showMobileMenu: !isDesktop && s.menu,
      menuExpanded: s.menu ? 'true' : 'false',
      menuLabel: s.menu ? 'Luk' : 'Menu',
      toggleMenu: () => this.setState({ menu: !s.menu }),
      sent: s.sent,
      notSent: !s.sent,
      submit: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ sent: true }); },
      reset: () => this.setState({ sent: false })
    };
  }
}

Component.prototype.render = function () {
  const v = this.renderVals();
  return (
<>
<link rel="stylesheet" href={FONTS} />
<style>{PAGE_CSS}</style>
<div style={css("font-family: 'Schibsted Grotesk', system-ui, sans-serif; color: #0F1E33; background: #ffffff; font-size: 18px; line-height: 1.6")}>

{/* MENU */}
<header style={css("position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,0.94); backdrop-filter: blur(10px); border-bottom: 1px solid #E3E6EA")}>
<div style={css("max-width: 1360px; margin: 0 auto; padding: 0 28px; height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #0F1E33; min-height: 44px")}>
<img src="/img/mark.png" alt="" style={css("height: 36px; width: auto; display: block")} />
<span style={css("font-weight: 700; font-size: 17px; letter-spacing: -0.01em")}>Sørens hverdagshjælp</span>
</a>
{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 36px; font-size: 15px; font-weight: 500")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="n-ul" style={css("text-decoration: none; color: #0F1E33; padding: 6px 0")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} className="n-ul" style={css("text-decoration: none; color: #0F1E33; padding: 6px 0")}>Priser</a>
<a href="#om" onClick={v.nav.om} className="n-ul" style={css("text-decoration: none; color: #0F1E33; padding: 6px 0")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} className="n-ul" style={css("text-decoration: none; color: #0F1E33; padding: 6px 0")}>Spørgsmål</a>
</nav>
</>)}
{v.isDesktop && (<>
<a href="tel:+4522216814" className="n-btn" style={css("display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 600; font-size: 15px; color: #ffffff; background: #0F1E33; padding: 12px 20px; min-height: 46px; box-sizing: border-box")}>Ring 22 21 68 14</a>
</>)}
{v.isCompact && (<>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("height: 46px; padding: 0 16px; border: 1px solid #0F1E33; background: transparent; color: #0F1E33; font-weight: 600; font-size: 15px; cursor: pointer")}>{v.menuLabel}</button>
</>)}
</div>
{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("border-top: 1px solid #E3E6EA; padding: 8px 28px 24px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 14px 0; border-bottom: 1px solid #E3E6EA; text-decoration: none; font-weight: 600; font-size: 22px; color: #0F1E33")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} style={css("padding: 14px 0; border-bottom: 1px solid #E3E6EA; text-decoration: none; font-weight: 600; font-size: 22px; color: #0F1E33")}>Priser</a>
<a href="#om" onClick={v.nav.om} style={css("padding: 14px 0; border-bottom: 1px solid #E3E6EA; text-decoration: none; font-weight: 600; font-size: 22px; color: #0F1E33")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 14px 0; border-bottom: 1px solid #E3E6EA; text-decoration: none; font-weight: 600; font-size: 22px; color: #0F1E33")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 14px 0; text-decoration: none; font-weight: 600; font-size: 22px; color: #3F6E1C")}>Kontakt</a>
</nav>
</>)}
</header>

{v.isHome && (<>

{/* HERO */}
<section id="top" style={css("display: flex; flex-wrap: wrap; border-bottom: 1px solid #E3E6EA")}>
<div style={css(`flex: 1 1 560px; min-width: 0; padding: ${v.heroPad}; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 56px; min-height: ${v.heroMin}`)}>
<p style={css("margin: 0; display: flex; gap: 16px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}><span>IT &amp; hjemmeservice — Kerteminde og omegn</span></p>
<div>
<h1 style={css("margin: 0 0 32px; font-size: clamp(48px, 6.4vw, 100px); line-height: 0.96; font-weight: 800; letter-spacing: -0.045em; color: #0F1E33")}>Den hjælp, du altid står og mangler.</h1>
<p style={css("margin: 0 0 40px; font-size: 20px; line-height: 1.55; color: #4A5565; max-width: 28em")}>Jeg kommer hjem til dig og hjælper med computer, wifi og telefon, og med de praktiske ting i hjemmet. Roligt, grundigt og med tid til at forklare.</p>
<div style={css("display: flex; flex-wrap: wrap; align-items: center; gap: 16px 32px")}>
<a href="tel:+4522216814" className="n-btn" style={css("display: inline-flex; align-items: center; gap: 14px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 18px; padding: 18px 28px; min-height: 60px; box-sizing: border-box")}>Ring 22 21 68 14
<svg className="n-arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
<a href="#priser" onClick={v.nav.priser} className="n-ul" style={css("font-weight: 600; font-size: 18px; color: #0F1E33; text-decoration: none; padding: 6px 0")}>Se priser</a>
</div>
</div>
</div>
<div style={css(`flex: 1 1 440px; min-width: 0; position: relative; min-height: ${v.photoMin}; background: #3F6E1C; overflow: hidden`)}>
<svg aria-hidden="true" viewBox="0 0 600 700" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<path d="M0 520 C 170 450, 380 500, 600 390 L600 700 L0 700 Z" fill="#1E3A64"/>
<path d="M0 548 C 180 478, 390 528, 600 420" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round"/>
</svg>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-44%); height: 90%; width: auto; display: block")} />
<p style={css("position: absolute; left: 28px; bottom: 24px; margin: 0; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff")}>Søren — din lokale hjælper</p>
</div>
</section>

{/* FAKTA-STRIBE */}
<section aria-label="Kort fortalt" style={css("border-bottom: 1px solid #E3E6EA")}>
<div style={css(`max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: repeat(${v.factCols}, minmax(0, 1fr))`)}>
<div style={css(`padding: 28px; border-right: 1px solid #E3E6EA; border-bottom: ${v.factBorder}`)}><p style={css("margin: 0 0 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>IT-hjælp</p><p style={css("margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.03em")}>350 kr. <span style={css("font-size: 16px; font-weight: 500; color: #4A5565")}>/ time</span></p></div>
<div style={css(`padding: 28px; border-right: ${v.factRight}; border-bottom: ${v.factBorder}`)}><p style={css("margin: 0 0 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Hjemmeservice</p><p style={css("margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.03em")}>500 kr. <span style={css("font-size: 16px; font-weight: 500; color: #4A5565")}>/ time</span></p></div>
<div style={css("padding: 28px; border-right: 1px solid #E3E6EA")}><p style={css("margin: 0 0 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Område</p><p style={css("margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.35")}>Kerteminde og omegn</p></div>
<div style={css("padding: 28px")}><p style={css("margin: 0 0 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Betaling</p><p style={css("margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.35")}>MobilePay, kontant eller faktura</p></div>
</div>
</section>

{/* LØBEBÅND */}
<div aria-hidden="true" style={css("overflow: hidden; border-bottom: 1px solid #E3E6EA; padding: 26px 0")}>
<div className="n-track" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css(`display: inline-flex; align-items: center; gap: 36px; padding-right: 36px; font-size: clamp(34px, 4.6vw, 64px); font-weight: 700; letter-spacing: -0.04em; line-height: 1; white-space: nowrap; color: ${t.color}; -webkit-text-stroke: ${t.stroke}`)}>{t.label}<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#3F6E1C" strokeWidth="2.4" strokeLinecap="round"/></svg></span>
</React.Fragment>))}
</div>
</div>

{/* YDELSER */}
<section id="ydelser" style={css("max-width: 1360px; margin: 0 auto; padding: 0 28px; display: flex; flex-wrap: wrap")}>
<div style={css("flex: 1 1 300px; min-width: 0; padding: 96px 40px 32px 0; box-sizing: border-box")}>
<div style={css(`position: ${v.stickyPos}; top: 112px`)}>
<p style={css("margin: 0 0 20px; display: flex; gap: 16px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}><span>Ydelser</span></p>
<h2 style={css("margin: 0 0 20px; font-size: clamp(36px, 4vw, 56px); line-height: 1; font-weight: 800; letter-spacing: -0.04em")}>Det kan jeg hjælpe med</h2>
<p style={css("margin: 0; font-size: 17px; color: #4A5565; max-width: 22em")}>Du behøver ikke vide, hvad problemet hedder. Fortæl mig, hvad der driller, så finder vi ud af det sammen.</p>
</div>
</div>
<div className="n-reveal" style={css(`flex: 2 1 600px; min-width: 0; padding: ${v.listPad}; box-sizing: border-box; opacity: ${v.rv.ydelser.o}; transform: ${v.rv.ydelser.t}`)}>
{v.groups.map((g, i_) => (<React.Fragment key={i_}>
<div style={css("margin-bottom: 56px")}>
<div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 2px solid #0F1E33")}>
<h3 style={css(`margin: 0; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${g.color}`)}>{g.label}</h3>
<span style={css("font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #0F1E33")}>{g.price} / time</span>
</div>
{g.items.map((s, i_) => (<React.Fragment key={i_}>
<div className="n-row" style={css(`display: grid; grid-template-columns: ${v.rowCols}; gap: 6px 28px; padding: 28px 12px; margin: 0 -12px; border-bottom: 1px solid #E3E6EA; align-items: start`)}>
<h4 style={css("margin: 0; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.15; font-weight: 700; letter-spacing: -0.03em")}>{s.title}</h4>
<div>
<p style={css("margin: 0 0 8px; font-size: 17px; color: #4A5565")}>{s.text}</p>
<p style={css("margin: 0; font-size: 14px; font-weight: 600; color: #5B6675")}>{s.examples}</p>
</div>
{v.isDesktop && (<><svg className="n-arrow" aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F1E33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={css("margin-top: 6px")}><path d="M5 12h14M13 6l6 6-6 6"/></svg></>)}
</div>
</React.Fragment>))}
</div>
</React.Fragment>))}
<p style={css("margin: 0; font-size: 17px; color: #4A5565")}>Noget helt andet? Spørg bare. Kan jeg klare det, siger jeg ja. Ellers siger jeg det ærligt. <a href="#kontakt" onClick={v.nav.kontakt} className="n-ul" style={css("font-weight: 600; color: #3F6E1C; text-decoration: none")}>Spørg mig</a></p>
</div>
</section>

{/* PRISER */}
<section id="priser" style={css("background: #F4F6F3; border-top: 1px solid #E3E6EA; border-bottom: 1px solid #E3E6EA")}>
<div className="n-reveal" style={css(`max-width: 1360px; margin: 0 auto; padding: 96px 28px; opacity: ${v.rv.priser.o}; transform: ${v.rv.priser.t}`)}>
<div style={css("display: flex; flex-wrap: wrap; gap: 20px 48px; align-items: flex-end; justify-content: space-between; margin-bottom: 48px")}>
<div>
<p style={css("margin: 0 0 20px; display: flex; gap: 16px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}><span>Priser</span></p>
<h2 style={css("margin: 0; font-size: clamp(36px, 4vw, 56px); line-height: 1; font-weight: 800; letter-spacing: -0.04em")}>Klare priser</h2>
</div>
<p style={css("margin: 0; font-size: 17px; color: #4A5565; max-width: 26em")}>Du kender prisen, inden jeg går i gang. Større opgaver får en samlet pris på forhånd.</p>
</div>
<div style={css("overflow-x: auto")}>
<table style={css("width: 100%; min-width: 520px; border-collapse: collapse; font-size: 18px")}>
<caption style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>Timepriser for IT-hjælp og hjemmeservice</caption>
<thead>
<tr style={css("border-bottom: 2px solid #0F1E33")}>
<th scope="col" style={css("text-align: left; padding: 0 0 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Ydelse</th>
<th scope="col" style={css("text-align: right; padding: 0 0 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Privat (inkl. moms)</th>
<th scope="col" style={css("text-align: right; padding: 0 0 16px 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Erhverv</th>
</tr>
</thead>
<tbody>
<tr style={css("border-bottom: 1px solid #D5DBD2")}>
<th scope="row" style={css("text-align: left; padding: 28px 0; font-weight: 700; font-size: clamp(22px, 2.2vw, 28px); letter-spacing: -0.02em")}>IT-hjælp<span style={css("display: block; font-size: 15px; font-weight: 500; letter-spacing: 0; color: #5B6675")}>Computer, wifi, printer, iPhone og iPad</span></th>
<td style={css("text-align: right; padding: 28px 0; font-weight: 800; font-size: clamp(32px, 3.4vw, 48px); letter-spacing: -0.04em; white-space: nowrap")}>350 kr.<span style={css("font-size: 16px; font-weight: 500; letter-spacing: 0; color: #5B6675")}> / time</span></td>
<td style={css("text-align: right; padding: 28px 0 28px 24px; font-weight: 600; font-size: 18px; color: #4A5565; white-space: nowrap")}>350 kr. + moms</td>
</tr>
<tr style={css("border-bottom: 1px solid #D5DBD2")}>
<th scope="row" style={css("text-align: left; padding: 28px 0; font-weight: 700; font-size: clamp(22px, 2.2vw, 28px); letter-spacing: -0.02em")}>Hjemmeservice<span style={css("display: block; font-size: 15px; font-weight: 500; letter-spacing: 0; color: #5B6675")}>Møbelsamling, ophæng og indkøb</span></th>
<td style={css("text-align: right; padding: 28px 0; font-weight: 800; font-size: clamp(32px, 3.4vw, 48px); letter-spacing: -0.04em; white-space: nowrap; color: #3F6E1C")}>500 kr.<span style={css("font-size: 16px; font-weight: 500; letter-spacing: 0; color: #5B6675")}> / time</span></td>
<td style={css("text-align: right; padding: 28px 0 28px 24px; font-weight: 600; font-size: 18px; color: #4A5565; white-space: nowrap")}>500 kr. + moms</td>
</tr>
</tbody>
</table>
</div>
<p style={css("margin: 24px 0 0; font-size: 15px; color: #5B6675")}>Kørsel uden for området efter aftale. Betaling med MobilePay, kontant eller faktura.</p>
</div>
</section>

{/* OM SØREN */}
<section id="om" style={css("border-bottom: 1px solid #E3E6EA")}>
<div className="n-reveal" style={css(`max-width: 1000px; margin: 0 auto; padding: 112px 28px; text-align: center; opacity: ${v.rv.om.o}; transform: ${v.rv.om.t}`)}>
<p style={css("margin: 0 0 28px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}>Om Søren</p>
<p style={css("margin: 0 auto 56px; max-width: 20em; font-size: clamp(30px, 3.6vw, 52px); line-height: 1.12; font-weight: 600; letter-spacing: -0.035em")}>Hej, jeg hedder Søren. Jeg hjælper med de ting i hverdagen, <span style={css("color: #8A94A1")}>der er lettere, når man er to om dem.</span></p>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); border-top: 1px solid #E3E6EA")}>
<div style={css("padding: 28px 20px 0")}><p style={css("margin: 0 0 6px; font-size: 19px; font-weight: 700")}>Roligt tempo</p><p style={css("margin: 0; font-size: 16px; color: #4A5565")}>Jeg forklarer undervejs, så du selv kan næste gang.</p></div>
<div style={css("padding: 28px 20px 0")}><p style={css("margin: 0 0 6px; font-size: 19px; font-weight: 700")}>Ingen dumme spørgsmål</p><p style={css("margin: 0; font-size: 16px; color: #4A5565")}>Spørg om alt. Jeg svarer uden fagord.</p></div>
<div style={css("padding: 28px 20px 0")}><p style={css("margin: 0 0 6px; font-size: 19px; font-weight: 700")}>Ærlige svar</p><p style={css("margin: 0; font-size: 16px; color: #4A5565")}>Kan jeg ikke løse opgaven, siger jeg det med det samme.</p></div>
</div>
</div>
</section>

{/* SPØRGSMÅL */}
<section id="spoergsmaal" style={css("border-bottom: 1px solid #E3E6EA")}>
<div className="n-reveal" style={css(`max-width: 1360px; margin: 0 auto; padding: 96px 28px; display: flex; flex-wrap: wrap; gap: 40px; opacity: ${v.rv.spoergsmaal.o}; transform: ${v.rv.spoergsmaal.t}`)}>
<div style={css("flex: 1 1 300px; min-width: 0")}>
<p style={css("margin: 0 0 20px; display: flex; gap: 16px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}><span>Spørgsmål</span></p>
<h2 style={css("margin: 0; font-size: clamp(36px, 4vw, 56px); line-height: 1; font-weight: 800; letter-spacing: -0.04em")}>Godt at vide</h2>
</div>
<div style={css("flex: 2 1 600px; min-width: 0; border-top: 2px solid #0F1E33")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css("border-bottom: 1px solid #E3E6EA")}>
<h3 style={css("margin: 0")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} style={css("width: 100%; display: flex; align-items: center; gap: 24px; text-align: left; background: transparent; border: 0; padding: 24px 0; font-size: clamp(19px, 1.8vw, 23px); font-weight: 600; letter-spacing: -0.01em; color: #0F1E33; cursor: pointer; min-height: 72px")}>

<span style={css("flex: 1 1 auto")}>{f.q}</span>
<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1E33" strokeWidth="1.8" strokeLinecap="round" style={css(f.iconStyle)}><path d="M12 5v14M5 12h14"/></svg>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 48px 26px 0; font-size: 17px; color: #4A5565")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* KONTAKT */}
<section id="kontakt">
<div className="n-reveal" style={css(`max-width: 1360px; margin: 0 auto; padding: 112px 28px 96px; display: flex; flex-wrap: wrap; gap: 64px; opacity: ${v.rv.kontakt.o}; transform: ${v.rv.kontakt.t}`)}>
<div style={css("flex: 1.2 1 480px; min-width: 0")}>
<p style={css("margin: 0 0 20px; display: flex; gap: 16px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #3F6E1C")}><span>Kontakt</span></p>
<h2 style={css("margin: 0 0 24px; font-size: clamp(36px, 4vw, 56px); line-height: 1; font-weight: 800; letter-spacing: -0.04em")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0 0 40px; font-size: 18px; color: #4A5565; max-width: 28em")}>Ring eller send en sms, så finder vi en tid, der passer. Tager jeg ikke telefonen, ringer jeg tilbage.</p>
<a href="tel:+4522216814" className="n-ul" style={css("display: inline-block; color: #0F1E33; text-decoration: none; font-size: clamp(48px, 7vw, 108px); font-weight: 800; letter-spacing: -0.05em; line-height: 1.05")}>22 21 68 14</a>
<p style={css("margin: 20px 0 0; font-size: 18px")}><a href="mailto:kontakt@hverdagshjaelpogit.dk" className="n-ul" style={css("color: #3F6E1C; text-decoration: none; font-weight: 600; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a></p>
</div>
<div style={css("flex: 1 1 400px; min-width: 0")}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 28px")}>
<h3 style={css("margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Bliv ringet op</h3>
<div style={css("display: flex; flex-direction: column; gap: 4px")}>
<label htmlFor="n-navn" style={css("font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Navn</label>
<input id="n-navn" name="navn" type="text" autoComplete="name" className="n-field" style={css("font-size: 22px; padding: 10px 0; color: #0F1E33; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 4px")}>
<label htmlFor="n-tlf" style={css("font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Telefon</label>
<input id="n-tlf" name="tlf" type="tel" autoComplete="tel" className="n-field" style={css("font-size: 22px; padding: 10px 0; color: #0F1E33; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 4px")}>
<label htmlFor="n-besked" style={css("font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5B6675")}>Hvad drejer det sig om? (valgfrit)</label>
<textarea id="n-besked" name="besked" rows="2" className="n-field" style={css("font-size: 20px; padding: 10px 0; color: #0F1E33; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="n-btn" style={css("align-self: flex-start; display: inline-flex; align-items: center; gap: 14px; background: #0F1E33; color: #ffffff; border: 0; font-size: 18px; font-weight: 600; padding: 18px 28px; min-height: 60px; cursor: pointer")}>Send besked
<svg className="n-arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</button>
<p style={css("margin: 0; font-size: 14px; color: #5B6675")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("padding-top: 40px; border-top: 2px solid #3F6E1C")}>
<h3 style={css("margin: 0 0 12px; font-size: 32px; font-weight: 800; letter-spacing: -0.03em")}>Tak for din besked</h3>
<p style={css("margin: 0 0 24px; font-size: 18px; color: #4A5565")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="n-btn" style={css("background: transparent; border: 1px solid #0F1E33; color: #0F1E33; font-size: 16px; font-weight: 600; padding: 12px 22px; min-height: 48px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</section>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("max-width: 1360px; margin: 0 auto; padding: 64px 28px 112px; display: flex; flex-wrap: wrap; gap: 40px")}>
<div style={css("flex: 1 1 300px; min-width: 0")}><a href="#top" onClick={v.nav.top} className="n-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: #0F1E33; text-decoration: none; padding: 6px 0")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a></div>
<article style={css("flex: 2 1 600px; min-width: 0; max-width: 760px; font-size: 18px; color: #2E3A4A")}>
<h1 style={css("margin: 0 0 10px; font-size: clamp(42px, 5.4vw, 76px); line-height: 1; font-weight: 800; letter-spacing: -0.045em; color: #0F1E33")}>Privatlivspolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 15px; color: #5B6675")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 36px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 36px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 36px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 36px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 36px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 36px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 600")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("max-width: 1360px; margin: 0 auto; padding: 64px 28px 112px; display: flex; flex-wrap: wrap; gap: 40px")}>
<div style={css("flex: 1 1 300px; min-width: 0")}><a href="#top" onClick={v.nav.top} className="n-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: #0F1E33; text-decoration: none; padding: 6px 0")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a></div>
<article style={css("flex: 2 1 600px; min-width: 0; max-width: 760px; font-size: 18px; color: #2E3A4A")}>
<h1 style={css("margin: 0 0 10px; font-size: clamp(42px, 5.4vw, 76px); line-height: 1; font-weight: 800; letter-spacing: -0.045em; color: #0F1E33")}>Cookiepolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 15px; color: #5B6675")}>Senest opdateret: oktober 2026</p>
<p style={css("margin: 0 0 40px; padding: 24px 0; border-top: 2px solid #3F6E1C; border-bottom: 1px solid #E3E6EA; font-size: 22px; line-height: 1.4; font-weight: 600; letter-spacing: -0.01em; color: #0F1E33")}>Kort fortalt: Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 36px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 36px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 36px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0F1E33")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</article>
</main>
</>)}

{/* FOOTER */}
<footer style={css("background: #0F1E33; color: #AEB9C7; overflow: hidden")}>
<div style={css("max-width: 1360px; margin: 0 auto; padding: 56px 28px 0; display: flex; flex-wrap: wrap; gap: 20px 40px; justify-content: space-between; font-size: 15px")}>
<span>IT &amp; hjemmeservice · Kerteminde og omegn · CVR 46656814</span>
<span style={css("display: flex; flex-wrap: wrap; gap: 8px 28px")}>
<a href="tel:+4522216814" className="n-ul" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>22 21 68 14</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="n-ul" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>kontakt@hverdagshjaelpogit.dk</a>
<a href="#top" onClick={v.showPrivacy} className="n-ul" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} className="n-ul" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>Cookiepolitik</a>
</span>
</div>
<p aria-hidden="true" style={css(`margin: 40px 0 0; padding: 0 20px 0.12em; font-size: ${v.wordmarkSize}; font-weight: 800; letter-spacing: -0.05em; line-height: 1.05; color: #ffffff; white-space: nowrap; text-align: center`)}>Sørens hverdagshjælp</p>
<div style={css("height: 24px; background: #3F6E1C; margin-top: 12px")}></div>
</footer>

{v.isCompact && (<>
<div style={css("height: 76px; background: #3F6E1C")}></div>
<a href="tel:+4522216814" style={css("position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; display: flex; align-items: center; justify-content: center; gap: 10px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 18px; min-height: 64px; border-top: 1px solid rgba(255,255,255,0.2)")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring til Søren · 22 21 68 14
</a>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 4 – Nordisk minimal';
export default Component;
