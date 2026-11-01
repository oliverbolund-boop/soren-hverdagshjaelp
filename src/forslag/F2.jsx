// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Figtree:wght@400;500;600;700&display=swap';
const PAGE_CSS = `body{margin:0;background:#ffffff}
html{scroll-behavior:smooth}
a{color:#10233F}a:hover{color:#3F6E1C}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #E9A23B;outline-offset:3px}
.o-btn{transition:transform .2s ease,background-color .2s ease,color .2s ease}
.o-btn:hover{transform:translateY(-2px)}
.o-arrow{transition:transform .25s ease}
.o-btn:hover .o-arrow,.o-row:hover .o-arrow{transform:translateX(6px)}
.o-row{transition:background-color .25s ease}
.o-row:hover{background:#F3F7EE}
.o-ul{background-image:linear-gradient(currentColor,currentColor);background-size:0% 2px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .25s ease}
.o-ul:hover{background-size:100% 2px}
.o-field{border:0;border-bottom:2px solid rgba(255,255,255,0.28);background:transparent;color:#ffffff;transition:border-color .2s ease}
.o-field:hover{border-bottom-color:rgba(255,255,255,0.55)}
.o-field:focus{border-bottom-color:#C6E97A;outline:none}
.o-field::placeholder{color:rgba(255,255,255,0.45)}
@keyframes o-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes o-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes o-spin{to{transform:rotate(360deg)}}
.o-left{animation:o-left 40s linear infinite}
.o-right{animation:o-right 48s linear infinite}
.o-slow{animation:o-left 70s linear infinite}
.o-spin{animation:o-spin 18s linear infinite;transform-origin:50% 50%}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.o-left,.o-right,.o-slow,.o-spin{animation:none}.o-btn,.o-arrow,.o-row,.o-ul{transition:none}.o-btn:hover{transform:none}}`;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, openFaq: 0, picked: {}, sent: false, view: 'home' };
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
    const groups = [
      {
        label: 'IT-hjælp', price: '350 kr.', color: '#1E3A64', hasNote: false, note: '',
        items: [
          { n: '01', title: 'PC & wifi', text: 'Når computeren er langsom, printeren ikke vil, eller wifi’en falder ud i stuen.', examples: 'Ny computer · Wifi og router · Printer, mail og opdateringer' },
          { n: '02', title: 'iPhone & iPad', text: 'Jeg hjælper dig godt i gang med telefonen eller tabletten og får styr på det, der driller.', examples: 'Billeder · MitID, apps og MobilePay · Videoopkald med familien' }
        ]
      },
      {
        label: 'Hjemmeservice', price: '500 kr.', color: '#3F6E1C', hasNote: true, note: 'kørsel uden for området efter aftale',
        items: [
          { n: '03', title: 'Samling af møbler', text: 'Reolen, sengen eller kommoden fra papkassen, samlet og stillet på plads.', examples: 'Flatpack-møbler · Havemøbler · Emballagen fjernet' },
          { n: '04', title: 'Indkøb af dagligvarer', text: 'Har du svært ved at komme ud, handler jeg ind for dig og bærer varerne ind.', examples: 'Fast ugentlig tur · Enkelte indkøb · Afhentning af pakker' },
          { n: '05', title: 'Ophæng af hylder og lamper', text: 'Det, der skal op at hænge, hænger jeg lige og solidt op.', examples: 'Hylder og billeder · Lamper og gardiner · Tv på væggen' }
        ]
      }
    ];
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    const ticker = [];
    for (let r = 0; r < 2; r++) words.forEach((x) => ticker.push(x));
    const nameTicker = [];
    for (let r = 0; r < 6; r++) nameTicker.push(r % 2 === 0 ? 'Sørens hverdagshjælp' : 'IT & hjemmeservice');
    const iconBase = 'flex: 0 0 auto; transition: transform .25s ease; ';
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
        open, expanded: open ? 'true' : 'false',
        iconStyle: iconBase + (open ? 'transform: rotate(45deg);' : ''),
        toggle: () => this.setState({ openFaq: open ? -1 : i })
      });
    });
    const chipLabels = ['PC & wifi', 'iPhone & iPad', 'Møbler', 'Indkøb', 'Ophæng', 'Andet'];
    const chipBase = 'font-size: 15px; font-weight: 600; padding: 10px 18px; border-radius: 999px; min-height: 44px; cursor: pointer; ';
    const chips = chipLabels.map((label) => {
      const on = !!s.picked[label];
      return {
        label,
        pressed: on ? 'true' : 'false',
        style: chipBase + (on ? 'background: #C6E97A; color: #10233F; border: 2px solid #C6E97A;' : 'background: transparent; color: #ffffff; border: 2px solid rgba(255,255,255,0.3);'),
        pick: () => this.setState({ picked: Object.assign({}, s.picked, { [label]: !on }) })
      };
    });
    const nav = {};
    ['top', 'ydelser', 'om', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isHome: s.view === 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      heroH: isDesktop ? '600px' : (isPhone ? '440px' : '520px'),
      badgeLeft: isPhone ? '0px' : '4%',
      badgeTop: isPhone ? '24px' : '60px',
      bandsH: isPhone ? '150px' : '180px',
      rowCols: isDesktop ? '64px minmax(0, 1fr) minmax(0, 1.25fr) 40px' : (isPhone ? '40px minmax(0, 1fr)' : '56px minmax(0, 1fr) minmax(0, 1.2fr)'),
      descCol: isPhone ? '2' : 'auto',
      groups, ticker, nameTicker, faqs, chips, nav,
      showPrivacy: (e) => this.openPage('privatliv', e),
      showCookies: (e) => this.openPage('cookies', e),
      showMobileMenu: !isDesktop && s.menu,
      menuExpanded: s.menu ? 'true' : 'false',
      menuLabel: s.menu ? 'Luk' : 'Menu',
      toggleMenu: () => this.setState({ menu: !s.menu }),
      sent: s.sent,
      notSent: !s.sent,
      submit: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ sent: true }); },
      reset: () => this.setState({ sent: false, picked: {} })
    };
  }
}

Component.prototype.render = function () {
  const v = this.renderVals();
  return (
<>
<link rel="stylesheet" href={FONTS} />
<style>{PAGE_CSS}</style>
<div style={css("font-family: 'Figtree', system-ui, sans-serif; color: #10233F; background: #ffffff; font-size: 18px; line-height: 1.6; overflow-x: hidden")}>

{/* MENU */}
<header style={css("position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px)")}>
<div style={css("max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #10233F; min-height: 44px")}>
<img src="/img/mark.png" alt="" style={css("height: 40px; width: auto; display: block")} />
<span style={css("font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -0.02em")}>Sørens hverdagshjælp</span>
</a>
{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 32px")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="o-ul" style={css("text-decoration: none; font-weight: 600; font-size: 16px; color: #10233F; padding: 10px 0")}>Ydelser</a>
<a href="#om" onClick={v.nav.om} className="o-ul" style={css("text-decoration: none; font-weight: 600; font-size: 16px; color: #10233F; padding: 10px 0")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} className="o-ul" style={css("text-decoration: none; font-weight: 600; font-size: 16px; color: #10233F; padding: 10px 0")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} className="o-btn" style={css("display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700; font-size: 16px; color: #ffffff; background: #3F6E1C; padding: 12px 22px; border-radius: 999px; min-height: 46px; box-sizing: border-box")}>Kontakt mig</a>
</nav>
</>)}
{v.isCompact && (<>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 18px; border-radius: 999px; border: 2px solid #10233F; background: transparent; color: #10233F; font-weight: 700; font-size: 16px; cursor: pointer")}>{v.menuLabel}</button>
</>)}
</div>
{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("padding: 8px 24px 28px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 12px 0; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 34px; letter-spacing: -0.03em; color: #10233F")}>Ydelser</a>
<a href="#om" onClick={v.nav.om} style={css("padding: 12px 0; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 34px; letter-spacing: -0.03em; color: #10233F")}>Om Søren</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 12px 0; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 34px; letter-spacing: -0.03em; color: #10233F")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 12px 0; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 34px; letter-spacing: -0.03em; color: #3F6E1C")}>Kontakt</a>
</nav>
</>)}
</header>

{v.isHome && (<>

{/* HERO */}
<section id="top" style={css("position: relative; padding: 40px 24px 0")}>
<div style={css("max-width: 1280px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 24px 40px")}>
<div style={css("flex: 1.25 1 560px; min-width: 0; padding: 24px 0 40px")}>
<p style={css("margin: 0 0 24px; font-weight: 600; font-size: 16px; color: #3F6E1C")}>IT &amp; hjemmeservice · Kerteminde og omegn</p>
<h1 style={css("margin: 0 0 32px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(50px, 7.2vw, 108px); line-height: 0.95; font-weight: 800; letter-spacing: -0.045em; color: #10233F")}>Den hjælp, du altid står og <span style={css("position: relative; display: inline-block; color: #3F6E1C")}>mangler.<svg aria-hidden="true" viewBox="0 0 300 30" preserveAspectRatio="none" style={css("position: absolute; left: 0; right: 0; bottom: -0.12em; width: 100%; height: 0.24em")}><path d="M4 20 C 70 6, 150 4, 296 14" stroke="#1E3A64" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M30 26 C 110 16, 190 14, 270 22" stroke="#1E3A64" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/></svg></span></h1>
<p style={css("margin: 0 0 40px; font-size: 20px; line-height: 1.55; color: #45526A; max-width: 30em")}>Jeg kommer hjem til dig og hjælper med computer, wifi og telefon, og med de praktiske ting i hjemmet. I et roligt tempo og med tid til at forklare.</p>
<div style={css("display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px")}>
<a href="tel:+4522216814" className="o-btn" style={css("display: inline-flex; align-items: center; gap: 12px; background: #10233F; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 18px; padding: 18px 28px; border-radius: 999px; min-height: 58px; box-sizing: border-box")}>Ring 22 21 68 14
<svg className="o-arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
<a href="#ydelser" onClick={v.nav.ydelser} className="o-ul" style={css("font-weight: 700; font-size: 18px; color: #10233F; text-decoration: none; padding: 8px 0")}>Se hvad jeg kan hjælpe med</a>
</div>
</div>

<div style={css(`flex: 1 1 400px; min-width: 0; position: relative; height: ${v.heroH}`)}>
<svg aria-hidden="true" viewBox="0 0 500 500" style={css("position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 112%; max-width: 620px; height: auto")}>
<path d="M421,318Q392,386,330,425Q268,464,196,444Q124,424,84,360Q44,296,62,222Q80,148,142,100Q204,52,282,62Q360,72,405,141Q450,210,421,318Z" fill="#3F6E1C"/>
<path d="M30,330 C 120,250 320,260 480,170" stroke="#1E3A64" strokeWidth="16" fill="none" strokeLinecap="round"/>
<path d="M44,352 C 130,280 330,290 470,206" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round"/>
</svg>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-44%); height: 100%; width: auto; display: block")} />
<a href="tel:+4522216814" aria-label="Ring til Søren på 22 21 68 14" className="o-btn" style={css(`position: absolute; left: ${v.badgeLeft}; top: ${v.badgeTop}; width: 136px; height: 136px; border-radius: 999px; background: #C6E97A; color: #10233F; display: flex; align-items: center; justify-content: center; text-decoration: none; box-shadow: 0 16px 40px rgba(16,35,63,0.22)`)}>
<svg className="o-spin" aria-hidden="true" viewBox="0 0 136 136" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<defs><path id="o-circle" d="M68,68 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"/></defs>
<text style={css("font-family: 'Figtree', sans-serif; font-size: 12.5px; font-weight: 700; letter-spacing: 2.6px")} fill="#10233F"><textPath href="#o-circle">RING ELLER SMS · 22 21 68 14 · </textPath></text>
</svg>
<svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
</a>
</div>
</div>
</section>

{/* KRYDSENDE LØBEBÅND */}
<div aria-hidden="true" style={css(`position: relative; height: ${v.bandsH}; overflow: hidden; margin-top: -12px`)}>
<div style={css("position: absolute; left: -5%; right: -5%; top: 34px; transform: rotate(2.2deg); background: #3F6E1C; padding: 16px 0; overflow: hidden")}>
<div className="o-right" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 26px; padding-right: 26px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(20px, 2.2vw, 28px); font-weight: 700; letter-spacing: -0.02em; color: #DDEBC9; white-space: nowrap")}>{t}<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.6L12 17.2l-6.2 4.6 2.4-7.6L2 9.6h7.6z" fill="#C6E97A"/></svg></span>
</React.Fragment>))}
</div>
</div>
<div style={css("position: absolute; left: -5%; right: -5%; top: 40px; transform: rotate(-2.4deg); background: #10233F; padding: 20px 0; overflow: hidden; box-shadow: 0 12px 30px rgba(16,35,63,0.25)")}>
<div className="o-left" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 30px; padding-right: 30px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 3vw, 40px); font-weight: 800; letter-spacing: -0.03em; color: #ffffff; white-space: nowrap")}>{t}<span style={css("width: 12px; height: 12px; border-radius: 999px; background: #C6E97A; display: inline-block")}></span></span>
</React.Fragment>))}
</div>
</div>
</div>

{/* YDELSER */}
<section id="ydelser" style={css("padding: 72px 24px 96px")}>
<div style={css("max-width: 1280px; margin: 0 auto")}>
<div style={css("display: flex; flex-wrap: wrap; gap: 20px 64px; align-items: flex-end; justify-content: space-between; margin-bottom: 64px")}>
<h2 style={css("margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(40px, 5.6vw, 80px); line-height: 0.98; font-weight: 800; letter-spacing: -0.045em; color: #10233F; max-width: 11em")}>Det kan jeg hjælpe dig med</h2>
<p style={css("margin: 0; font-size: 18px; color: #45526A; max-width: 24em")}>Du behøver ikke vide, hvad problemet hedder. Fortæl mig, hvad der driller, så finder vi ud af det sammen.</p>
</div>

{v.groups.map((g, i_) => (<React.Fragment key={i_}>
<div style={css("margin-bottom: 72px")}>
<div style={css("display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 32px; padding-bottom: 20px; border-bottom: 3px solid #10233F")}>
<h3 style={css(`margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 3.2vw, 42px); font-weight: 800; letter-spacing: -0.035em; color: ${g.color}`)}>{g.label}</h3>
<p style={css("margin: 0; font-size: 17px; color: #45526A")}><span style={css("font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 3.2vw, 42px); font-weight: 800; letter-spacing: -0.035em; color: #10233F")}>{g.price}</span> pr. time · privat inkl. moms, erhverv + moms{g.hasNote && (<> · {g.note}</>)}</p>
</div>
{g.items.map((s, i_) => (<React.Fragment key={i_}>
<div className="o-row" style={css(`display: grid; grid-template-columns: ${v.rowCols}; gap: 8px 32px; align-items: start; padding: 30px 16px; margin: 0 -16px; border-bottom: 1px solid #DCE2D6; border-radius: 4px`)}>
<span style={css(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 20px; font-weight: 700; color: ${g.color}; padding-top: 8px`)}>{s.n}</span>
<h4 style={css("margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(26px, 2.8vw, 38px); line-height: 1.1; font-weight: 700; letter-spacing: -0.03em; color: #10233F")}>{s.title}</h4>
<div style={css(`grid-column: ${v.descCol}`)}>
<p style={css("margin: 0 0 10px; font-size: 18px; color: #45526A")}>{s.text}</p>
<p style={css(`margin: 0; font-size: 15px; font-weight: 600; color: ${g.color}`)}>{s.examples}</p>
</div>
{v.isDesktop && (<><svg className="o-arrow" aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10233F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={css("margin-top: 8px")}><path d="M5 12h14M13 6l6 6-6 6"/></svg></>)}
</div>
</React.Fragment>))}
</div>
</React.Fragment>))}

<p style={css("margin: 0; font-size: 20px; color: #45526A; max-width: 40em")}><strong style={css("color: #10233F")}>Noget helt andet?</strong> Spørg bare. Kan jeg klare det, siger jeg ja. Ellers siger jeg det ærligt. Større opgaver får en samlet pris på forhånd. <a href="#kontakt" onClick={v.nav.kontakt} style={css("font-weight: 700; color: #3F6E1C")}>Spørg mig her</a></p>
</div>
</section>

{/* OM SØREN */}
<section id="om" style={css("position: relative; background: #EEF3E8")}>
<svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 60px; background: #ffffff")}><path d="M0 80 L0 40 C 360 0, 760 70, 1440 20 L1440 80 Z" fill="#EEF3E8"/></svg>
<div style={css("max-width: 1280px; margin: 0 auto; padding: 56px 24px 96px; display: flex; flex-wrap: wrap; gap: 48px 80px; align-items: flex-start")}>
<p style={css("flex: 0 0 auto; margin: 10px 0 0; font-weight: 700; font-size: 16px; color: #3F6E1C")}>Om Søren</p>
<div style={css("flex: 1 1 600px; min-width: 0")}>
<p style={css("margin: 0 0 32px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(30px, 4vw, 56px); line-height: 1.1; font-weight: 700; letter-spacing: -0.035em; color: #10233F")}>“Jeg hjælper med de ting i hverdagen, der er lettere, når man er to om dem. Og der er ingen dumme spørgsmål.”</p>
<p style={css("margin: 0 0 56px; font-size: 18px; font-weight: 600; color: #3F6E1C")}>Søren, Sørens hverdagshjælp</p>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px")}>
<div style={css("border-top: 3px solid #3F6E1C; padding-top: 18px")}><p style={css("margin: 0 0 6px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Roligt tempo</p><p style={css("margin: 0; font-size: 17px; color: #45526A")}>Jeg forklarer undervejs, så du selv kan næste gang.</p></div>
<div style={css("border-top: 3px solid #1E3A64; padding-top: 18px")}><p style={css("margin: 0 0 6px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Fast pris</p><p style={css("margin: 0; font-size: 17px; color: #45526A")}>Du kender prisen, inden jeg går i gang.</p></div>
<div style={css("border-top: 3px solid #3F6E1C; padding-top: 18px")}><p style={css("margin: 0 0 6px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Nem betaling</p><p style={css("margin: 0; font-size: 17px; color: #45526A")}>MobilePay, kontant eller faktura.</p></div>
</div>
</div>
</div>
<svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 60px; background: #ffffff")}><path d="M0 0 L0 40 C 520 90, 980 10, 1440 50 L1440 0 Z" fill="#EEF3E8"/></svg>
</section>

{/* SPØRGSMÅL */}
<section id="spoergsmaal" style={css("padding: 72px 24px 112px")}>
<div style={css("max-width: 1280px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 40px 80px")}>
<div style={css("flex: 1 1 320px; min-width: 0")}>
<h2 style={css("margin: 0 0 20px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(40px, 5vw, 72px); line-height: 0.98; font-weight: 800; letter-spacing: -0.045em")}>Godt at vide</h2>
<p style={css("margin: 0; font-size: 18px; color: #45526A")}>Finder du ikke svaret, så ring på <a href="tel:+4522216814" style={css("font-weight: 700")}>22 21 68 14</a>.</p>
</div>
<div style={css("flex: 1.7 1 520px; min-width: 0; border-top: 3px solid #10233F")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css("border-bottom: 1px solid #DCE2D6")}>
<h3 style={css("margin: 0")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} style={css("width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; text-align: left; background: transparent; border: 0; padding: 26px 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(21px, 2vw, 26px); font-weight: 700; letter-spacing: -0.02em; color: #10233F; cursor: pointer; min-height: 72px")}>
<span>{f.q}</span>
<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3F6E1C" strokeWidth="2.2" strokeLinecap="round" style={css(f.iconStyle)}><path d="M12 5v14M5 12h14"/></svg>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 56px 28px 0; font-size: 18px; color: #45526A")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* KONTAKT */}
<section id="kontakt" style={css("position: relative; background: #10233F; color: #ffffff")}>
<svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 80px; background: #ffffff")}><path d="M0 100 L0 60 C 420 0, 940 110, 1440 30 L1440 100 Z" fill="#10233F"/><path d="M0 54 C 420 -6, 940 104, 1440 24" stroke="#3F6E1C" strokeWidth="8" fill="none"/></svg>
<div style={css("max-width: 1280px; margin: 0 auto; padding: 56px 24px 96px; display: flex; flex-wrap: wrap; gap: 64px 80px")}>
<div style={css("flex: 1.2 1 480px; min-width: 0")}>
<p style={css("margin: 0 0 20px; font-weight: 700; font-size: 16px; color: #C6E97A")}>Kontakt</p>
<h2 style={css("margin: 0 0 24px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(40px, 5vw, 72px); line-height: 0.98; font-weight: 800; letter-spacing: -0.045em; color: #ffffff")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0 0 48px; font-size: 19px; color: #B9C6D8; max-width: 28em")}>Ring eller send en sms, så finder vi en tid, der passer. Tager jeg ikke telefonen, ringer jeg tilbage.</p>
<a href="tel:+4522216814" className="o-ul" style={css("display: inline-block; color: #C6E97A; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(48px, 7vw, 104px); font-weight: 800; letter-spacing: -0.045em; line-height: 1.05")}>22 21 68 14</a>
<p style={css("margin: 24px 0 0; font-size: 18px")}><a href="mailto:kontakt@hverdagshjaelpogit.dk" className="o-ul" style={css("color: #ffffff; text-decoration: none; font-weight: 600; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a></p>
</div>

<div style={css("flex: 1 1 420px; min-width: 0")}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 28px")}>
<h3 style={css("margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.03em")}>Eller bliv ringet op</h3>
<fieldset style={css("border: 0; margin: 0; padding: 0")}>
<legend style={css("font-size: 16px; font-weight: 600; color: #B9C6D8; margin-bottom: 12px; padding: 0")}>Hvad skal du have hjælp til?</legend>
<div style={css("display: flex; flex-wrap: wrap; gap: 8px")}>
{v.chips.map((c, i_) => (<React.Fragment key={i_}>
<button type="button" onClick={c.pick} aria-pressed={c.pressed} className="o-btn" style={css(c.style)}>{c.label}</button>
</React.Fragment>))}
</div>
</fieldset>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="o-navn" style={css("font-size: 16px; font-weight: 600; color: #B9C6D8")}>Navn</label>
<input id="o-navn" name="navn" type="text" autoComplete="name" className="o-field" style={css("font-size: 22px; padding: 10px 0; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="o-tlf" style={css("font-size: 16px; font-weight: 600; color: #B9C6D8")}>Telefon</label>
<input id="o-tlf" name="tlf" type="tel" autoComplete="tel" className="o-field" style={css("font-size: 22px; padding: 10px 0; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="o-besked" style={css("font-size: 16px; font-weight: 600; color: #B9C6D8")}>Besked (valgfrit)</label>
<textarea id="o-besked" name="besked" rows="2" className="o-field" style={css("font-size: 20px; padding: 10px 0; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="o-btn" style={css("align-self: flex-start; display: inline-flex; align-items: center; gap: 12px; background: #C6E97A; color: #10233F; border: 0; border-radius: 999px; font-size: 18px; font-weight: 700; padding: 18px 30px; min-height: 58px; cursor: pointer")}>Send besked
<svg className="o-arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</button>
<p style={css("margin: 0; font-size: 14px; color: #B9C6D8")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("color: #ffffff; font-weight: 600")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 16px; align-items: flex-start; padding-top: 24px")}>
<span style={css("width: 64px; height: 64px; border-radius: 999px; background: #C6E97A; color: #10233F; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
<h3 style={css("margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -0.03em")}>Tak for din besked</h3>
<p style={css("margin: 0; font-size: 18px; color: #B9C6D8")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="o-btn" style={css("background: transparent; border: 2px solid rgba(255,255,255,0.4); color: #ffffff; border-radius: 999px; font-size: 16px; font-weight: 700; padding: 12px 22px; min-height: 48px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</section>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("padding: 48px 24px 112px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #2C3A50")}>
<a href="#top" onClick={v.nav.top} className="o-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; color: #10233F; text-decoration: none; padding: 8px 0; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; font-weight: 800; letter-spacing: -0.045em; color: #10233F")}>Privatlivspolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 16px; color: #45526A")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 36px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 36px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 36px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 36px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 36px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 36px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 700")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("padding: 48px 24px 112px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #2C3A50")}>
<a href="#top" onClick={v.nav.top} className="o-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; color: #10233F; text-decoration: none; padding: 8px 0; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; font-weight: 800; letter-spacing: -0.045em; color: #10233F")}>Cookiepolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 16px; color: #45526A")}>Senest opdateret: oktober 2026</p>
<p style={css("margin: 0 0 40px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; line-height: 1.25; font-weight: 700; letter-spacing: -0.02em; color: #3F6E1C")}>Kort fortalt: Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 36px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 36px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 36px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #10233F")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 700")}>privatlivspolitikken</a>.</p>
</article>
</main>
<svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 80px")}><path d="M0 100 L0 60 C 420 0, 940 110, 1440 30 L1440 100 Z" fill="#10233F"/><path d="M0 54 C 420 -6, 940 104, 1440 24" stroke="#3F6E1C" strokeWidth="8" fill="none"/></svg>
</>)}

{v.isPrivacy && (<>
<svg aria-hidden="true" viewBox="0 0 1440 100" preserveAspectRatio="none" style={css("display: block; width: 100%; height: 80px")}><path d="M0 100 L0 60 C 420 0, 940 110, 1440 30 L1440 100 Z" fill="#10233F"/><path d="M0 54 C 420 -6, 940 104, 1440 24" stroke="#3F6E1C" strokeWidth="8" fill="none"/></svg>
</>)}

{/* FOOTER */}
<footer style={css("background: #10233F; color: #B9C6D8; padding: 24px 0 32px; overflow: hidden")}>
<div aria-hidden="true" style={css("overflow: hidden; border-top: 1px solid #22385A; border-bottom: 1px solid #22385A; padding: 18px 0")}>
<div className="o-slow" style={css("display: flex; width: max-content")}>
{v.nameTicker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(56px, 9vw, 140px); font-weight: 800; letter-spacing: -0.05em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px #3E5A82; white-space: nowrap")}>{t}<span style={css("width: 18px; height: 18px; border-radius: 999px; background: #3F6E1C; display: inline-block")}></span></span>
</React.Fragment>))}
</div>
</div>
<div style={css("max-width: 1280px; margin: 0 auto; padding: 32px 24px 0; display: flex; flex-wrap: wrap; gap: 20px 40px; justify-content: space-between; align-items: center; font-size: 15px")}>
<span>Sørens hverdagshjælp · IT &amp; hjemmeservice · Kerteminde og omegn · CVR 46656814</span>
<span style={css("display: flex; flex-wrap: wrap; gap: 8px 24px")}>
<a href="tel:+4522216814" className="o-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>22 21 68 14</a>
<a href="#top" onClick={v.showPrivacy} className="o-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} className="o-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>Cookiepolitik</a>
</span>
</div>
</footer>

{v.isCompact && (<>
<div style={css("height: 88px; background: #10233F")}></div>
<a href="tel:+4522216814" style={css("position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 30; display: flex; align-items: center; justify-content: center; gap: 10px; background: #C6E97A; color: #10233F; text-decoration: none; font-weight: 700; font-size: 18px; border-radius: 999px; min-height: 58px; box-shadow: 0 12px 30px rgba(16,35,63,0.3)")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring til Søren · 22 21 68 14
</a>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 2 – Organisk';
export default Component;
