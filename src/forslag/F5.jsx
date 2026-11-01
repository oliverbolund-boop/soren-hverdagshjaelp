// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&family=Patrick+Hand+SC&display=swap';
const PAGE_CSS = `body{margin:0;background:#F7F3EC}
html{scroll-behavior:smooth}
a{color:#1F2A24}a:hover{color:#3F6E1C}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #D9A93A;outline-offset:3px}
.l-btn{transition:transform .2s ease,background-color .2s ease,box-shadow .2s ease}
.l-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(31,42,36,0.16)}
.l-link{text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:4px;transition:text-underline-offset .2s ease,color .2s ease}
.l-link:hover{text-underline-offset:7px}
.l-arrow{display:inline-block;transition:transform .2s ease}
.l-link:hover .l-arrow{transform:translateX(4px)}
.l-svc{transition:transform .3s ease}
.l-svc:hover{transform:translateY(-6px)}
.l-field{transition:border-color .2s ease,box-shadow .2s ease}
.l-field:hover{border-color:#A9A08F !important}
.l-field:focus{border-color:#3F6E1C !important;box-shadow:0 0 0 4px rgba(63,110,28,0.14);outline:none}
@keyframes l-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.l-track{animation:l-left 44s linear infinite}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.l-track{animation:none}.l-btn,.l-link,.l-arrow,.l-svc{transition:none}.l-btn:hover,.l-svc:hover{transform:none}}`;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, openFaq: 0, sent: false, view: 'home' };
    this.onResize = () => this.setState({ w: window.innerWidth });
  }
  componentDidMount() { window.addEventListener('resize', this.onResize); }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); }
  goTo(id, e) {
    if (this.state.view !== 'home') {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ view: 'home', menu: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
      }, 30);
    } else {
      this.setState({ menu: false });
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
    const stepCols = isPhone ? 1 : 3;
    const steps = [
      { n: '1', title: 'Ring eller skriv', text: 'Fortæl kort, hvad du har brug for hjælp til.' },
      { n: '2', title: 'Vi aftaler en tid', text: 'Vi finder en tid, der passer dig, og du får prisen at vide.' },
      { n: '3', title: 'Jeg klarer det', text: 'Jeg kommer forbi, løser opgaven og viser gerne, hvordan det virker.' }
    ].map((x, i) => Object.assign({}, x, { showLine: !isPhone && i < 2 }));
    const prices = [
      { label: 'IT-hjælp', price: '350 kr.', color: '#1E3A64', desc: 'Computer, wifi, printer, iPhone og iPad' },
      { label: 'Hjemmeservice', price: '500 kr.', color: '#3F6E1C', desc: 'Møbelsamling, ophæng og indkøb' }
    ];
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    const ticker = [];
    for (let r = 0; r < 2; r++) words.forEach((x) => ticker.push(x));
    const faqRaw = [
      { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
      { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
      { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
      { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
      { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' }
    ];
    const iconBase = 'flex: 0 0 auto; width: 34px; height: 34px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform .25s ease, background-color .25s ease; ';
    const faqs = faqRaw.map((f, i) => {
      const open = s.openFaq === i;
      return Object.assign({}, f, {
        open, expanded: open ? 'true' : 'false',
        iconStyle: iconBase + (open ? 'background: #D9A93A; color: #1F2A24; transform: rotate(45deg);' : 'background: #EFE8DB; color: #1F2A24;'),
        toggle: () => this.setState({ openFaq: open ? -1 : i })
      });
    });
    const nav = {};
    ['top', 'ydelser', 'priser', 'omraade', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isWide: !isPhone,
      isHome: s.view === 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      heroPad: isPhone ? '48px 24px 56px' : (isDesktop ? '72px 56px 72px max(24px, calc((100vw - 1240px) / 2 + 24px))' : '64px 40px'),
      photoMin: isDesktop ? '640px' : (isPhone ? '440px' : '520px'),
      localMin: isPhone ? '300px' : '440px',
      localPad: isPhone ? '48px 24px' : '72px 56px',
      svcMin: isPhone ? '200px' : '190px',
      pricePad: isPhone ? '36px 22px' : '56px 64px',
      ctaPad: isPhone ? '64px 24px' : '88px 24px',
      stepCols, steps, prices, ticker, faqs, nav,
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
<div style={css("font-family: 'Nunito Sans', system-ui, sans-serif; color: #1F2A24; background: #F7F3EC; font-size: 18px; line-height: 1.6")}>

{/* MENU */}
<header style={css("position: sticky; top: 0; z-index: 30; background: rgba(247,243,236,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #E6DED0")}>
<div style={css("max-width: 1240px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #1F2A24; min-height: 44px")}>
<img src="/img/mark.png" alt="" style={css("height: 44px; width: auto; display: block")} />
<span style={css("display: flex; flex-direction: column; line-height: 1.05")}><span style={css("font-family: 'DM Serif Display', serif; font-size: 22px; color: #3F6E1C")}>Sørens hverdagshjælp</span><span style={css("font-family: 'Patrick Hand SC', cursive; font-size: 14px; letter-spacing: 0.12em; color: #1E3A64")}>IT &amp; hjemmeservice</span></span>
</a>
{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 28px; font-size: 15px; font-weight: 600")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("text-decoration: none; color: #1F2A24; padding: 8px 0")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} style={css("text-decoration: none; color: #1F2A24; padding: 8px 0")}>Priser</a>
<a href="#omraade" onClick={v.nav.omraade} style={css("text-decoration: none; color: #1F2A24; padding: 8px 0")}>Område</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("text-decoration: none; color: #1F2A24; padding: 8px 0")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("text-decoration: none; color: #1F2A24; padding: 8px 0")}>Kontakt</a>
</nav>
</>)}
{v.isDesktop && (<>
<a href="tel:+4522216814" className="l-btn" style={css("display: inline-flex; align-items: center; gap: 8px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 12px 20px; border-radius: 10px; min-height: 46px; box-sizing: border-box")}>Ring 22 21 68 14</a>
</>)}
{v.isCompact && (<>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("height: 46px; padding: 0 18px; border-radius: 10px; border: 1.5px solid #1F2A24; background: transparent; color: #1F2A24; font-weight: 700; font-size: 16px; cursor: pointer")}>{v.menuLabel}</button>
</>)}
</div>
{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("padding: 4px 24px 20px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 12px 0; border-bottom: 1px solid #E6DED0; text-decoration: none; font-family: 'DM Serif Display', serif; font-size: 26px; color: #1F2A24")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} style={css("padding: 12px 0; border-bottom: 1px solid #E6DED0; text-decoration: none; font-family: 'DM Serif Display', serif; font-size: 26px; color: #1F2A24")}>Priser</a>
<a href="#omraade" onClick={v.nav.omraade} style={css("padding: 12px 0; border-bottom: 1px solid #E6DED0; text-decoration: none; font-family: 'DM Serif Display', serif; font-size: 26px; color: #1F2A24")}>Område</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 12px 0; border-bottom: 1px solid #E6DED0; text-decoration: none; font-family: 'DM Serif Display', serif; font-size: 26px; color: #1F2A24")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 12px 0; text-decoration: none; font-family: 'DM Serif Display', serif; font-size: 26px; color: #3F6E1C")}>Kontakt</a>
</nav>
</>)}
</header>

{v.isHome && (<>

{/* HERO */}
<section id="top" style={css("display: flex; flex-wrap: wrap")}>
<div style={css(`flex: 1 1 520px; min-width: 0; padding: ${v.heroPad}; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center`)}>
<h1 style={css("margin: 0 0 24px; font-family: 'DM Serif Display', serif; font-size: clamp(46px, 5.6vw, 78px); line-height: 1.02; font-weight: 400; letter-spacing: -0.015em; color: #1F2A24")}>Hverdagens små ting.<br />Klaret med ro.</h1>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin-bottom: 28px")}></span>
<p style={css("margin: 0 0 36px; font-size: 19px; line-height: 1.6; color: #4C5650; max-width: 30em")}>Jeg hjælper folk i Kerteminde og omegn med computer, wifi og telefon, og med de praktiske opgaver i hjemmet. Jeg kommer hjem til dig og tager mig god tid.</p>
<div style={css("display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px")}>
<a href="tel:+4522216814" className="l-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 17px; padding: 16px 26px; border-radius: 10px; min-height: 56px; box-sizing: border-box")}>Ring 22 21 68 14</a>
<a href="#ydelser" onClick={v.nav.ydelser} className="l-link" style={css("font-weight: 700; font-size: 17px; color: #1E3A64")}>Se hvad jeg hjælper med <span className="l-arrow" aria-hidden="true">→</span></a>
</div>
<div style={css("margin-top: 48px; display: flex; align-items: center; gap: 16px")}>
<svg aria-hidden="true" width="34" height="48" viewBox="0 0 34 48" fill="none" stroke="#3F6E1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 46V8"/><path d="M17 16c-6-1-10-5-11-11 6 1 10 5 11 11z"/><path d="M17 24c6-1 10-5 11-11-6 1-10 5-11 11z"/><path d="M17 33c-6-1-10-5-11-11 6 1 10 5 11 11z"/></svg>
<p style={css("margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 22px; line-height: 1.2; color: #1F2A24; transform: rotate(-2deg)")}>Lokal hjælp.<br />Ingen dumme spørgsmål.</p>
</div>
</div>
<div style={css(`flex: 1 1 480px; min-width: 0; position: relative; min-height: ${v.photoMin}; background: #3F6E1C; overflow: hidden`)}>
<svg aria-hidden="true" viewBox="0 0 600 700" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<circle cx="470" cy="150" r="70" fill="#D9A93A" opacity="0.9"/>
<path d="M0 520 C 170 450, 380 500, 600 390 L600 700 L0 700 Z" fill="#1E3A64"/>
<path d="M0 548 C 180 478, 390 528, 600 420" stroke="#F7F3EC" strokeWidth="8" fill="none" strokeLinecap="round"/>
</svg>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-52%); height: 90%; width: auto; display: block")} />
{v.isWide && (<>
<div aria-hidden="true" style={css("position: absolute; right: 28px; top: 34%; font-family: 'Patrick Hand SC', cursive; font-size: 24px; line-height: 1.25; letter-spacing: 0.04em; color: #F7F3EC; transform: rotate(-4deg); text-align: left")}>God hjælp<br />til små og<br />store ting<br />i hverdagen.<svg width="56" height="10" viewBox="0 0 56 10" style={css("display: block; margin-top: 10px")}><path d="M2 6 C 18 2, 36 9, 54 4" stroke="#F7F3EC" strokeWidth="2" fill="none" strokeLinecap="round"/></svg></div>
</>)}
</div>
</section>

{/* LØBEBÅND */}
<div aria-hidden="true" style={css("overflow: hidden; background: #D9A93A; padding: 14px 0")}>
<div className="l-track" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 24px; padding-right: 24px; font-family: 'DM Serif Display', serif; font-size: 24px; color: #1F2A24; white-space: nowrap")}>{t}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F2A24" strokeWidth="2" strokeLinecap="round"><path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18"/></svg></span>
</React.Fragment>))}
</div>
</div>

{/* YDELSER */}
<section id="ydelser" style={css("padding: 96px 24px 88px")}>
<div style={css("max-width: 1240px; margin: 0 auto")}>
<div style={css("text-align: center; max-width: 720px; margin: 0 auto 64px")}>
<h2 style={css("margin: 0 0 16px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400; color: #1F2A24")}>Hjælp til det, der driller i hverdagen.</h2>
<p style={css("margin: 0; font-size: 18px; color: #4C5650")}>Du behøver ikke vide, hvad problemet hedder. Fortæl mig, hvad der driller, så finder vi ud af det sammen.</p>
</div>
<div style={css(`display: grid; grid-template-columns: repeat(auto-fit, minmax(${v.svcMin}, 1fr)); gap: 48px 28px`)}>

<div className="l-svc" style={css("text-align: center")}>
<svg aria-hidden="true" width="132" height="110" viewBox="0 0 132 110" fill="none" stroke="#1F2A24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("display: block; margin: 0 auto 20px")}><path d="M8 102h116" stroke="#A9A08F"/><rect x="22" y="14" width="88" height="60" rx="5" fill="#EAF0F7"/><rect x="30" y="22" width="72" height="44" rx="2" fill="#ffffff"/><path d="M54 74l-6 18h36l-6-18"/><path d="M40 92h52"/><path d="M48 40c10-9 26-9 36 0" stroke="#1E3A64"/><path d="M55 47c6-5 16-5 22 0" stroke="#1E3A64"/><circle cx="66" cy="54" r="2.2" fill="#1E3A64" stroke="none"/></svg>
<h3 style={css("margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #1F2A24")}>PC &amp; wifi</h3>
<p style={css("margin: 0 auto; max-width: 15em; font-size: 16px; color: #4C5650")}>Langsom computer, printer, mail eller wifi, der falder ud i stuen.</p>
</div>

<div className="l-svc" style={css("text-align: center")}>
<svg aria-hidden="true" width="132" height="110" viewBox="0 0 132 110" fill="none" stroke="#1F2A24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("display: block; margin: 0 auto 20px")}><path d="M8 102h116" stroke="#A9A08F"/><rect x="30" y="18" width="46" height="80" rx="8" fill="#ffffff"/><path d="M47 25h12"/><rect x="36" y="32" width="34" height="50" rx="2" fill="#EAF0F7"/><circle cx="53" cy="90" r="3"/><rect x="72" y="40" width="44" height="58" rx="6" fill="#ffffff"/><rect x="78" y="47" width="32" height="40" rx="2" fill="#EEF4E7"/><path d="M45 52l6 6 10-12" stroke="#3F6E1C"/></svg>
<h3 style={css("margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #1F2A24")}>iPhone &amp; iPad</h3>
<p style={css("margin: 0 auto; max-width: 15em; font-size: 16px; color: #4C5650")}>Opsætning, MitID, apps, billeder og videoopkald med familien.</p>
</div>

<div className="l-svc" style={css("text-align: center")}>
<svg aria-hidden="true" width="132" height="110" viewBox="0 0 132 110" fill="none" stroke="#1F2A24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("display: block; margin: 0 auto 20px")}><path d="M8 102h116" stroke="#A9A08F"/><rect x="18" y="62" width="44" height="40" fill="#E9DFC9"/><path d="M18 62l8-10h44l-8 10"/><path d="M70 52v40" /><path d="M30 76h20" stroke="#A9A08F"/><rect x="74" y="22" width="40" height="80" fill="#ffffff"/><path d="M74 48h40M74 74h40"/><circle cx="104" cy="35" r="1.8" fill="#1F2A24" stroke="none"/><circle cx="104" cy="61" r="1.8" fill="#1F2A24" stroke="none"/><circle cx="104" cy="87" r="1.8" fill="#1F2A24" stroke="none"/><path d="M50 30l12-12 6 6-12 12z" fill="#D9A93A"/><path d="M50 30l-8 8" /></svg>
<h3 style={css("margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #1F2A24")}>Samling af møbler</h3>
<p style={css("margin: 0 auto; max-width: 15em; font-size: 16px; color: #4C5650")}>Fra papkasse til færdig reol, seng eller kommode, stillet på plads.</p>
</div>

<div className="l-svc" style={css("text-align: center")}>
<svg aria-hidden="true" width="132" height="110" viewBox="0 0 132 110" fill="none" stroke="#1F2A24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("display: block; margin: 0 auto 20px")}><path d="M8 102h116" stroke="#A9A08F"/><path d="M20 58h56"/><path d="M26 58v8M70 58v8"/><rect x="28" y="40" width="10" height="18" fill="#EAF0F7"/><rect x="40" y="36" width="8" height="22" fill="#EEF4E7"/><rect x="50" y="42" width="12" height="16" fill="#E9DFC9"/><path d="M96 8v26"/><path d="M80 52a16 16 0 0 1 32 0z" fill="#3F6E1C" stroke="#1F2A24"/><path d="M92 58a4 4 0 0 0 8 0"/><path d="M86 66l-4 6M96 68v7M106 66l4 6" stroke="#D9A93A"/></svg>
<h3 style={css("margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #1F2A24")}>Ophæng</h3>
<p style={css("margin: 0 auto; max-width: 15em; font-size: 16px; color: #4C5650")}>Hylder, lamper, gardiner og tv på væggen, lige og solidt.</p>
</div>

<div className="l-svc" style={css("text-align: center")}>
<svg aria-hidden="true" width="132" height="110" viewBox="0 0 132 110" fill="none" stroke="#1F2A24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("display: block; margin: 0 auto 20px")}><path d="M8 102h116" stroke="#A9A08F"/><path d="M34 44h64l-6 58H40z" fill="#E9DFC9"/><path d="M50 44V34a16 16 0 0 1 32 0v10"/><path d="M52 44c-2-14 6-22 10-24" stroke="#3F6E1C"/><path d="M60 22c4 2 6 6 4 10-4-1-6-5-4-10z" fill="#3F6E1C" stroke="#3F6E1C"/><rect x="66" y="26" width="12" height="18" rx="2" fill="#ffffff"/><path d="M50 70h32" stroke="#A9A08F"/></svg>
<h3 style={css("margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #1F2A24")}>Indkøb</h3>
<p style={css("margin: 0 auto; max-width: 15em; font-size: 16px; color: #4C5650")}>Jeg handler ind for dig og bærer varerne ind, gerne som fast tur.</p>
</div>

</div>
</div>
</section>

{/* LOKAL */}
<section style={css("display: flex; flex-wrap: wrap")}>
<div style={css(`flex: 1 1 480px; min-width: 0; position: relative; min-height: ${v.localMin}; background: #DCE8EC; overflow: hidden`)}>
<svg aria-hidden="true" viewBox="0 0 600 440" preserveAspectRatio="xMidYMax slice" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<circle cx="470" cy="110" r="44" fill="#D9A93A"/>
<path d="M0 230 C 120 210, 220 220, 330 205 C 430 192, 520 205, 600 196 L600 440 L0 440 Z" fill="#9DB58A"/>
<path d="M0 262 L600 252 L600 440 L0 440 Z" fill="#6E97AE"/>
<path d="M0 290 C 100 284, 200 296, 300 288 S 500 282, 600 290" stroke="#DCE8EC" strokeWidth="3" fill="none" opacity="0.7"/>
<path d="M60 320 C 160 314, 260 326, 360 318" stroke="#DCE8EC" strokeWidth="3" fill="none" opacity="0.5"/>
<g stroke="#1F2A24" strokeWidth="2.4" strokeLinejoin="round">
<path d="M70 252v-46l26-22 26 22v46z" fill="#F7F3EC"/><path d="M66 208l30-26 30 26" fill="none"/><rect x="86" y="222" width="18" height="30" fill="#1E3A64"/>
<path d="M130 252v-34l20-16 20 16v34z" fill="#D9A93A"/><rect x="143" y="228" width="14" height="14" fill="#F7F3EC"/>
<path d="M178 252v-52l30-24 30 24v52z" fill="#3F6E1C"/><rect x="196" y="214" width="12" height="12" fill="#F7F3EC"/><rect x="214" y="214" width="12" height="12" fill="#F7F3EC"/>
<path d="M246 252v-30l18-14 18 14v30z" fill="#F7F3EC"/>
</g>
<g stroke="#1F2A24" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
<path d="M410 340 L 530 340 L 512 362 L 428 362 Z" fill="#F7F3EC"/>
<path d="M468 336 V 226"/>
<path d="M472 232 L 520 330 L 472 330 Z" fill="#ffffff"/>
<path d="M464 244 L 424 330 L 464 330 Z" fill="#EAF0F7"/>
</g>
<path d="M380 372 C 420 366, 500 378, 560 370" stroke="#DCE8EC" strokeWidth="3" fill="none" opacity="0.8"/>
</svg>
<p aria-hidden="true" style={css("position: absolute; left: 28px; top: 24px; margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 24px; line-height: 1.2; color: #1F2A24; transform: rotate(-5deg)")}>Havnebyen.<br />Hverdagen.<br />Hjælpen.</p>
</div>
<div style={css(`flex: 1 1 480px; min-width: 0; background: #22401B; color: #F7F3EC; padding: ${v.localPad}; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center`)}>
<h2 style={css("margin: 0 0 20px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400; color: #ffffff")}>Lokal i Kerteminde.<br />Tæt på dig.</h2>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin-bottom: 26px")}></span>
<p style={css("margin: 0 0 36px; font-size: 18px; color: #D9E3D2; max-width: 30em")}>Jeg kører rundt i Kerteminde og omegn og hjælper både private og små virksomheder. Jeg kender byen, og jeg ved, at det betyder noget, at det er en, man kan ringe direkte til.</p>
<div style={css("display: flex; align-items: center; gap: 16px")}>
<svg aria-hidden="true" width="80" height="36" viewBox="0 0 80 36" fill="none" stroke="#F7F3EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 26c10-6 18-6 28 0s18 6 28 0 14-4 20-2"/><path d="M40 20V4"/><path d="M42 6l12 12H42z"/></svg>
<p style={css("margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 21px; line-height: 1.2; letter-spacing: 0.04em; color: #F7F3EC")}>Lokal hjælp.<br />Kort vej.</p>
</div>
</div>
</section>

{/* TRIN */}
<section style={css("padding: 96px 24px 88px")}>
<div style={css("max-width: 1100px; margin: 0 auto; text-align: center")}>
<h2 style={css("margin: 0 0 12px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400")}>Sådan foregår det.</h2>
<p style={css("margin: 0 0 56px; font-size: 18px; color: #4C5650")}>Ingen ventetid i telefonkøer. Bare en ligetil aftale fra start til slut.</p>
<ol style={css(`list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(${v.stepCols}, minmax(0, 1fr)); gap: 40px 24px; position: relative`)}>
{v.steps.map((st, i_) => (<React.Fragment key={i_}>
<li style={css("position: relative; display: flex; flex-direction: column; align-items: center; gap: 12px")}>
{st.showLine && (<><svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" style={css("position: absolute; top: 18px; left: calc(50% + 46px); width: calc(100% - 68px); height: 20px")}><path d="M2 14 Q 100 -6, 198 14" stroke="#D9A93A" strokeWidth="2.4" strokeDasharray="6 7" fill="none" strokeLinecap="round"/></svg></>)}
<span style={css("width: 60px; height: 60px; border-radius: 999px; background: #D9A93A; color: #1F2A24; display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 28px")}>{st.n}</span>
<h3 style={css("margin: 4px 0 0; font-size: 20px; font-weight: 800")}>{st.title}</h3>
<p style={css("margin: 0; max-width: 16em; font-size: 16px; color: #4C5650")}>{st.text}</p>
</li>
</React.Fragment>))}
</ol>
</div>
</section>

{/* PRISER */}
<section id="priser" style={css("padding: 0 24px 96px")}>
<div style={css(`max-width: 900px; margin: 0 auto; background: #ffffff; border: 1px solid #E6DED0; border-radius: 20px; padding: ${v.pricePad}; box-sizing: border-box`)}>
<div style={css("text-align: center; margin-bottom: 40px")}>
<h2 style={css("margin: 0 0 12px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400")}>Priser</h2>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin: 0 auto")}></span>
</div>
{v.prices.map((p, i_) => (<React.Fragment key={i_}>
<div style={css("padding: 22px 0; border-bottom: 1px solid #EFE8DB")}>
<div style={css("display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px")}>
<span style={css(`font-family: 'DM Serif Display', serif; font-size: clamp(24px, 2.6vw, 32px); white-space: nowrap; color: ${p.color}`)}>{p.label}</span>
<span aria-hidden="true" style={css("flex: 1 1 auto; border-bottom: 2.5px dotted #C9BFAC; transform: translateY(-6px); min-width: 24px")}></span>
<span style={css("font-family: 'DM Serif Display', serif; font-size: clamp(30px, 3.4vw, 44px); white-space: nowrap; color: #1F2A24")}>{p.price}</span>
<span style={css("font-size: 16px; font-weight: 700; color: #4C5650; white-space: nowrap")}>/ time</span>
</div>
<p style={css("margin: 4px 0 0; font-size: 15px; color: #6A726C")}>{p.desc}</p>
</div>
</React.Fragment>))}
<p style={css("margin: 28px 0 0; text-align: center; font-size: 16px; color: #4C5650")}>Privatpriser er inkl. moms. Erhverv: + moms. Kørsel uden for området efter aftale.<br />Betal med MobilePay, kontant eller faktura.</p>
</div>
</section>

{/* OMRÅDE */}
<section id="omraade" style={css("padding: 0 24px 96px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 48px")}>
<div style={css("flex: 1 1 380px; min-width: 0")}>
<h2 style={css("margin: 0 0 16px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400")}>Her kommer jeg ud</h2>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin-bottom: 24px")}></span>
<p style={css("margin: 0 0 24px; font-size: 18px; color: #4C5650; max-width: 28em")}>Jeg hjælper i Kerteminde og omegn. Bor du lidt længere væk, kører jeg også gerne ud efter aftale. Ring bare og spørg.</p>
<a href="#kontakt" onClick={v.nav.kontakt} className="l-link" style={css("font-weight: 700; font-size: 17px; color: #3F6E1C")}>Spørg om dit område <span className="l-arrow" aria-hidden="true">→</span></a>
</div>
<div style={css("flex: 1.2 1 460px; min-width: 0; position: relative")}>
<svg role="img" aria-label="Tegnet kort over Kerteminde og omegn med Kerteminde i midten og Munkebo, Langeskov, Odense og Hindsholm omkring" viewBox="0 0 560 400" style={css("display: block; width: 100%; height: auto")}>
<rect x="0" y="0" width="560" height="400" rx="20" fill="#E3EDF0"/>
<path d="M0 60 C 80 70, 150 50, 210 80 C 250 100, 270 70, 300 40 C 330 10, 360 20, 380 0 L 0 0 Z" fill="#E3EDF0"/>
<path d="M0 90 C 70 100, 140 85, 200 110 C 240 128, 262 100, 290 70 C 318 40, 348 46, 362 20 C 380 40, 372 80, 352 110 C 336 136, 360 160, 392 170 C 430 182, 452 214, 440 252 C 430 288, 452 320, 470 400 L 0 400 Z" fill="#F2EBDD" stroke="#A9A08F" strokeWidth="2"/>
<path d="M362 20 C 392 6, 420 18, 424 46 C 428 74, 408 96, 384 110" fill="none" stroke="#A9A08F" strokeWidth="2" strokeDasharray="4 5"/>
<path d="M215 175 C 250 160, 300 168, 330 190 C 350 205, 368 232, 360 262 C 350 300, 300 316, 262 304 C 224 292, 196 262, 196 228 C 196 202, 200 186, 215 175 Z" fill="#F0DCA8" opacity="0.85"/>
<g fontFamily="Patrick Hand SC, cursive" fontSize="17" fill="#1F2A24" letterSpacing="1">
<text x="372" y="40">Hindsholm</text>
<text x="70" y="250">Odense</text>
<text x="210" y="252">Munkebo</text>
<text x="250" y="352">Langeskov</text>
<text x="470" y="200" fill="#1E3A64">Storebælt</text>
</g>
<path d="M296 214 l4.4 9 9.9 1.4 -7.2 7 1.7 9.8 -8.8 -4.6 -8.8 4.6 1.7 -9.8 -7.2 -7 9.9 -1.4 z" fill="#1F2A24"/>
<text x="318" y="230" fontFamily="Nunito Sans, sans-serif" fontWeight="800" fontSize="18" fill="#1F2A24">KERTEMINDE</text>
<circle cx="110" cy="270" r="4" fill="#1F2A24"/><circle cx="228" cy="268" r="4" fill="#1F2A24"/><circle cx="268" cy="338" r="4" fill="#1F2A24"/>
<g stroke="#22401B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M500 330l-14 24h28z"/><path d="M500 314l-12 22h24z"/><path d="M500 354v10"/><path d="M528 340l-11 20h22z"/><path d="M528 326l-9 17h18z"/><path d="M528 360v8"/></g>
</svg>
{v.isWide && (<>
<p aria-hidden="true" style={css("position: absolute; right: 8px; top: -32px; margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 22px; line-height: 1.2; color: #1F2A24; transform: rotate(4deg)")}>Samme kyst.<br />Samme naboer.</p>
</>)}
</div>
</div>
</section>

{/* SPØRGSMÅL */}
<section id="spoergsmaal" style={css("padding: 0 24px 96px")}>
<div style={css("max-width: 860px; margin: 0 auto")}>
<div style={css("text-align: center; margin-bottom: 40px")}>
<h2 style={css("margin: 0 0 12px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; font-weight: 400")}>Godt at vide</h2>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin: 0 auto")}></span>
</div>
<div style={css("border-top: 1px solid #E6DED0")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css("border-bottom: 1px solid #E6DED0")}>
<h3 style={css("margin: 0")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} style={css("width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; background: transparent; border: 0; padding: 22px 0; font-size: 19px; font-weight: 800; color: #1F2A24; cursor: pointer; min-height: 68px")}>
<span>{f.q}</span>
<span style={css(f.iconStyle)}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 56px 22px 0; font-size: 17px; color: #4C5650")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* KONTAKT */}
<section id="kontakt" style={css(`background: #1E3A64; color: #ffffff; padding: ${v.ctaPad}`)}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 48px; align-items: center")}>
<div style={css("flex: 1 1 460px; min-width: 0; display: flex; flex-wrap: wrap; gap: 28px 36px; align-items: center")}>
<svg aria-hidden="true" width="190" height="130" viewBox="0 0 190 130" fill="none" stroke="#F7F3EC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 124h182"/><path d="M50 124V66l40-32 40 32v58"/><path d="M42 72l48-40 48 40"/><rect x="80" y="90" width="20" height="34"/><rect x="60" y="78" width="14" height="14"/><rect x="106" y="78" width="14" height="14"/><path d="M114 44V26h10v26"/><circle cx="26" cy="74" r="18"/><path d="M26 92v32"/><circle cx="160" cy="68" r="22"/><path d="M160 90v34"/><path d="M152 76l8 8 8-8" /></svg>
<div style={css("flex: 1 1 260px; min-width: 0")}>
<h2 style={css("margin: 0 0 12px; font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 50px); line-height: 1.08; font-weight: 400; color: #ffffff")}>Lad os klare det, der driller.</h2>
<p style={css("margin: 0 0 24px; font-size: 18px; color: #D3DDEB")}>Stort eller småt. Ring eller send en sms, så finder vi en tid.</p>
<a href="tel:+4522216814" className="l-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #F7F3EC; color: #1E3A64; text-decoration: none; font-weight: 800; font-size: 20px; padding: 16px 26px; border-radius: 10px; min-height: 58px; box-sizing: border-box")}>Ring 22 21 68 14</a>
<p style={css("margin: 18px 0 0; font-size: 17px")}><a href="mailto:kontakt@hverdagshjaelpogit.dk" className="l-link" style={css("color: #ffffff; font-weight: 700; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a></p>
</div>
</div>
<div style={css("flex: 1 1 400px; min-width: 0; background: #F7F3EC; color: #1F2A24; border-radius: 18px; padding: 28px; box-sizing: border-box")}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 16px")}>
<h3 style={css("margin: 0; font-family: 'DM Serif Display', serif; font-size: 28px; font-weight: 400")}>Bliv ringet op</h3>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px")}>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="l-navn" style={css("font-size: 16px; font-weight: 700")}>Navn</label>
<input id="l-navn" name="navn" type="text" autoComplete="name" className="l-field" style={css("font-size: 18px; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #D8CFBE; background: #ffffff; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="l-tlf" style={css("font-size: 16px; font-weight: 700")}>Telefon</label>
<input id="l-tlf" name="tlf" type="tel" autoComplete="tel" className="l-field" style={css("font-size: 18px; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #D8CFBE; background: #ffffff; min-height: 52px; box-sizing: border-box")} />
</div>
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="l-besked" style={css("font-size: 16px; font-weight: 700")}>Hvad drejer det sig om? <span style={css("font-weight: 400; color: #6A726C")}>(valgfrit)</span></label>
<textarea id="l-besked" name="besked" rows="3" className="l-field" style={css("font-size: 18px; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #D8CFBE; background: #ffffff; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="l-btn" style={css("align-self: flex-start; background: #3F6E1C; color: #ffffff; border: 0; border-radius: 10px; font-size: 17px; font-weight: 800; padding: 15px 26px; min-height: 54px; cursor: pointer")}>Send besked</button>
<p style={css("margin: 0; font-size: 14px; color: #6A726C")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 700")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 12px; align-items: flex-start; padding: 16px 0")}>
<p style={css("margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 28px; color: #3F6E1C")}>Tak for det!</p>
<h3 style={css("margin: 0; font-family: 'DM Serif Display', serif; font-size: 30px; font-weight: 400")}>Din besked er sendt</h3>
<p style={css("margin: 0; font-size: 17px; color: #4C5650")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="l-btn" style={css("background: transparent; border: 1.5px solid #1F2A24; color: #1F2A24; border-radius: 10px; font-size: 16px; font-weight: 700; padding: 12px 20px; min-height: 48px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</section>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #36403A")}>
<a href="#top" onClick={v.nav.top} className="l-link" style={css("display: inline-block; font-weight: 700; font-size: 16px; color: #1E3A64; margin-bottom: 28px")}><span aria-hidden="true">←</span> Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 8px; font-family: 'DM Serif Display', serif; font-size: clamp(42px, 5.4vw, 68px); line-height: 1.02; font-weight: 400; color: #1F2A24")}>Privatlivspolitik</h1>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin: 16px 0 16px")}></span>
<p style={css("margin: 0 0 44px; font-size: 15px; color: #6A726C")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 32px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 32px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 32px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 32px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 32px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 32px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 700")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #36403A")}>
<a href="#top" onClick={v.nav.top} className="l-link" style={css("display: inline-block; font-weight: 700; font-size: 16px; color: #1E3A64; margin-bottom: 28px")}><span aria-hidden="true">←</span> Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 8px; font-family: 'DM Serif Display', serif; font-size: clamp(42px, 5.4vw, 68px); line-height: 1.02; font-weight: 400; color: #1F2A24")}>Cookiepolitik</h1>
<span aria-hidden="true" style={css("display: block; width: 72px; height: 6px; border-radius: 3px; background: #D9A93A; margin: 16px 0 16px")}></span>
<p style={css("margin: 0 0 44px; font-size: 15px; color: #6A726C")}>Senest opdateret: oktober 2026</p>
<p style={css("margin: 0 0 40px; background: #ffffff; border: 1px solid #E6DED0; border-radius: 16px; padding: 22px 24px; color: #1F2A24")}><strong>Kort fortalt:</strong> Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 32px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 32px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 32px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #1F2A24")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 700")}>privatlivspolitikken</a>.</p>
</article>
</main>
</>)}

{/* FOOTER */}
<footer style={css("background: #22401B; color: #D9E3D2; overflow: hidden")}>
<div style={css("max-width: 1240px; margin: 0 auto; padding: 56px 24px 32px; display: flex; flex-wrap: wrap; gap: 40px 64px; align-items: flex-start; justify-content: space-between")}>
<div style={css("display: flex; align-items: center; gap: 14px")}>
<span style={css("width: 72px; height: 72px; border-radius: 999px; background: #F7F3EC; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><img src="/img/mark.png" alt="" style={css("height: 48px; width: auto")} /></span>
<span style={css("line-height: 1.2")}><span style={css("display: block; font-family: 'DM Serif Display', serif; font-size: 26px; color: #ffffff")}>Sørens hverdagshjælp</span><span style={css("font-family: 'Patrick Hand SC', cursive; font-size: 16px; letter-spacing: 0.1em")}>IT &amp; hjemmeservice</span></span>
</div>
<nav aria-label="Sidefod" style={css("display: flex; flex-direction: column; gap: 6px; font-size: 16px")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("color: #ffffff; text-decoration: none; padding: 2px 0")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} style={css("color: #ffffff; text-decoration: none; padding: 2px 0")}>Priser</a>
<a href="#omraade" onClick={v.nav.omraade} style={css("color: #ffffff; text-decoration: none; padding: 2px 0")}>Område</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("color: #ffffff; text-decoration: none; padding: 2px 0")}>Kontakt</a>
</nav>
<div style={css("display: flex; align-items: center; gap: 16px")}>
<svg aria-hidden="true" width="34" height="48" viewBox="0 0 34 48" fill="none" stroke="#F7F3EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 46V8"/><path d="M17 16c-6-1-10-5-11-11 6 1 10 5 11 11z"/><path d="M17 24c6-1 10-5 11-11-6 1-10 5-11 11z"/><path d="M17 33c-6-1-10-5-11-11 6 1 10 5 11 11z"/></svg>
<p style={css("margin: 0; font-family: 'Patrick Hand SC', cursive; font-size: 22px; line-height: 1.2; letter-spacing: 0.04em; color: #F7F3EC")}>Kerteminde-hjælp.<br />Hverdag gjort lettere.</p>
</div>
</div>
<svg aria-hidden="true" viewBox="0 0 1440 160" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 120px")}>
<circle cx="1040" cy="70" r="34" fill="#D9A93A"/>
<path d="M0 110 C 180 60, 360 90, 520 70 C 700 48, 860 96, 1040 80 C 1200 66, 1320 84, 1440 74 L1440 160 L0 160 Z" fill="#2F5225"/>
<path d="M0 130 C 240 106, 480 126, 720 112 C 960 98, 1200 124, 1440 108 L1440 160 L0 160 Z" fill="#1E3A64"/>
<path d="M0 140 C 240 124, 480 140, 720 130 S 1200 138, 1440 128" stroke="#6E97AE" strokeWidth="2" fill="none" opacity="0.6"/>
<g fill="#16301A"><path d="M300 112 v-28 l14 -12 14 12 v28 z"/><path d="M332 112 v-20 l10 -8 10 8 v20 z"/><path d="M356 112 v-34 l16 -14 16 14 v34 z"/><path d="M394 112 v-22 l10 -8 10 8 v22 z"/><path d="M430 112 v-48 h6 v48 z"/></g>
</svg>
<div style={css("background: #16301A; padding: 16px 24px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 8px 28px; justify-content: space-between; font-size: 14px; color: #B9C8B0")}>
<span>© 2026 Sørens hverdagshjælp · Kerteminde · CVR 46656814</span>
<span style={css("display: flex; flex-wrap: wrap; gap: 6px 20px")}>
<a href="#top" onClick={v.showPrivacy} style={css("color: #ffffff")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} style={css("color: #ffffff")}>Cookiepolitik</a>
</span>
</div>
</div>
</footer>

{v.isCompact && (<>
<div style={css("height: 84px; background: #16301A")}></div>
<a href="tel:+4522216814" style={css("position: fixed; left: 14px; right: 14px; bottom: 14px; z-index: 30; display: flex; align-items: center; justify-content: center; gap: 10px; background: #3F6E1C; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 18px; border-radius: 12px; min-height: 58px; box-shadow: 0 10px 26px rgba(31,42,36,0.3)")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring til Søren · 22 21 68 14
</a>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 5 – Lun og lokal';
export default Component;
