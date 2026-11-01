// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap';
const PAGE_CSS = `body{margin:0;background:#ffffff}
html{scroll-behavior:smooth}
a{color:#15171B}a:hover{color:#B8860B}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #F5C842;outline-offset:3px}
.k-btn{transition:transform .2s ease,background-color .2s ease,box-shadow .2s ease}
.k-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(245,200,66,0.35)}
.k-card{transition:transform .25s ease,box-shadow .25s ease}
.k-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(21,23,27,0.18)}
.k-nav{transition:color .15s ease}
.k-nav:hover{color:#F5C842 !important}
.k-row{transition:padding-left .2s ease}
.k-row:hover{padding-left:8px}
.k-field{transition:border-color .2s ease}
.k-field:hover{border-color:#8A8F98 !important}
.k-field:focus{border-color:#F5C842 !important;outline:none}
@keyframes k-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.k-track{animation:k-left 32s linear infinite}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.k-track{animation:none}.k-btn,.k-card,.k-row{transition:none}.k-btn:hover,.k-card:hover{transform:none}}`;

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
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    const ticker = [];
    for (let r = 0; r < 2; r++) words.forEach((x) => ticker.push(x));
    const tiles = [
      { isPc: true, bg: '#F5C842', ink: '#15171B' },
      { isWifi: true, bg: '#23262B', ink: '#F5C842' },
      { isPhone: true, bg: '#1E3A64', ink: '#ffffff' },
      { isTool: true, bg: '#23262B', ink: '#F5C842' },
      { isLamp: true, bg: '#3F6E1C', ink: '#ffffff' },
      { isBag: true, bg: '#F5C842', ink: '#15171B' }
    ];
    const groups = [
      { label: 'IT-hjælp', price: '350 kr.', items: ['PC og ny computer', 'Wifi og router', 'Printer, mail og opdateringer', 'iPhone og iPad', 'MitID, apps og MobilePay'] },
      { label: 'Hjemmeservice', price: '500 kr.', items: ['Samling af møbler', 'Ophæng af hylder, lamper og gardiner', 'Tv på væggen', 'Indkøb af dagligvarer'] }
    ];
    const steps = [
      { n: '01', title: 'Ring eller skriv', text: 'Fortæl kort, hvad du har brug for hjælp til.' },
      { n: '02', title: 'Vi aftaler en tid', text: 'Vi finder en tid, der passer, og du får prisen at vide.' },
      { n: '03', title: 'Jeg klarer det', text: 'Jeg kommer forbi, løser opgaven og viser gerne, hvordan det virker.' }
    ];
    const faqRaw = [
      { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
      { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
      { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
      { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
      { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' }
    ];
    const iconBase = 'flex: 0 0 auto; width: 34px; height: 34px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: transform .25s ease, background-color .25s ease; ';
    const faqs = faqRaw.map((f, i) => {
      const open = s.openFaq === i;
      return Object.assign({}, f, {
        open, expanded: open ? 'true' : 'false',
        border: open ? '5px solid #F5C842' : '5px solid #ffffff',
        iconStyle: iconBase + (open ? 'background: #F5C842; color: #15171B; transform: rotate(45deg);' : 'background: #15171B; color: #ffffff;'),
        toggle: () => this.setState({ openFaq: open ? -1 : i })
      });
    });
    const nav = {};
    ['top', 'ydelser', 'priser', 'hvorfor', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isHome: s.view === 'home',
      isSub: s.view !== 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      showMobileBar: !isDesktop,
      heroPad: isPhone ? '48px 0 16px' : '96px 0 112px',
      photoH: isDesktop ? '600px' : (isPhone ? '400px' : '480px'),
      ticker, tiles, groups, steps, faqs, nav,
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
<div style={css("font-family: 'Montserrat', system-ui, sans-serif; color: #15171B; background: #ffffff; font-size: 17px; line-height: 1.65")}>

{v.isHome && (<>
<header style={css("position: sticky; top: 0; z-index: 30; background: rgba(21,23,27,0.96); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.08)")}>
<div style={css("max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #ffffff; min-height: 44px")}>
<span style={css("width: 44px; height: 44px; border-radius: 10px; background: #ffffff; display: flex; align-items: center; justify-content: center")}><img src="/img/mark.png" alt="" style={css("height: 32px; width: auto; display: block")} /></span>
<span style={css("font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: 0.01em")}>Sørens hverdagshjælp</span>
</a>
{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 30px; font-size: 15px; font-weight: 500")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="k-nav" style={css("text-decoration: none; color: #E6E8EB; padding: 8px 0")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} className="k-nav" style={css("text-decoration: none; color: #E6E8EB; padding: 8px 0")}>Priser</a>
<a href="#hvorfor" onClick={v.nav.hvorfor} className="k-nav" style={css("text-decoration: none; color: #E6E8EB; padding: 8px 0")}>Om mig</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} className="k-nav" style={css("text-decoration: none; color: #E6E8EB; padding: 8px 0")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} className="k-btn" style={css("display: inline-flex; align-items: center; background: #F5C842; color: #15171B; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 18px; border-radius: 6px; min-height: 44px; box-sizing: border-box")}>Bliv ringet op</a>
</nav>
</>)}
{v.isCompact && (<>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("height: 46px; padding: 0 16px; border-radius: 6px; border: 0; background: #F5C842; color: #15171B; font-weight: 700; font-size: 15px; cursor: pointer")}>{v.menuLabel}</button>
</>)}
</div>
{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("padding: 4px 24px 20px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; color: #ffffff")}>Ydelser</a>
<a href="#priser" onClick={v.nav.priser} style={css("padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; color: #ffffff")}>Priser</a>
<a href="#hvorfor" onClick={v.nav.hvorfor} style={css("padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; color: #ffffff")}>Om mig</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; color: #ffffff")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 12px 0; text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; color: #F5C842")}>Kontakt</a>
</nav>
</>)}
</header>
</>)}
{v.isHome && (<>
{/* HERO MED MENU */}
<section id="top" style={css("position: relative; background: #15171B; color: #ffffff; overflow: hidden")}>
<svg aria-hidden="true" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<g fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
<path d="M-40 120 C 240 60, 520 180, 820 110 S 1300 40, 1500 120" strokeOpacity="0.06"/>
<path d="M-40 170 C 240 110, 520 230, 820 160 S 1300 90, 1500 170" strokeOpacity="0.05"/>
<path d="M-40 220 C 240 160, 520 280, 820 210 S 1300 140, 1500 220" strokeOpacity="0.045"/>
<path d="M-40 270 C 240 210, 520 330, 820 260 S 1300 190, 1500 270" strokeOpacity="0.04"/>
<path d="M-40 320 C 240 260, 520 380, 820 310 S 1300 240, 1500 320" strokeOpacity="0.035"/>
<path d="M-40 370 C 240 310, 520 430, 820 360 S 1300 290, 1500 370" strokeOpacity="0.03"/>
<path d="M-40 420 C 240 360, 520 480, 820 410 S 1300 340, 1500 420" strokeOpacity="0.025"/>
</g>
<path d="M-40 470 C 240 410, 520 530, 820 460 S 1300 390, 1500 470" fill="none" stroke="#F5C842" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round"/>
<circle cx="1080" cy="420" r="300" fill="#1E3A64" opacity="0.55"/>
<circle cx="1080" cy="420" r="300" fill="none" stroke="#F5C842" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round"/>
<path d="M700 640 C 880 570, 1100 620, 1440 520 L1440 760 L700 760 Z" fill="#3F6E1C" opacity="0.85"/>
<path d="M700 664 C 890 596, 1110 646, 1440 548" stroke="#F5C842" strokeWidth="6" fill="none" strokeLinecap="round"/>
</svg>



<div style={css("position: relative; max-width: 1240px; margin: 0 auto; padding: 0 24px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 24px")}>
<div style={css(`flex: 1.15 1 520px; min-width: 0; padding: ${v.heroPad}`)}>
<p style={css("margin: 0 0 20px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #C9CDD3")}><span style={css("width: 28px; height: 3px; background: #F5C842")}></span>Kerteminde og omegn</p>
<h1 style={css("margin: 0 0 24px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(40px, 5.2vw, 72px); line-height: 1.05; font-weight: 700; letter-spacing: 0.005em; text-transform: uppercase; color: #F5C842")}>IT-hjælp og hjemmeservice til private og erhverv</h1>
<p style={css("margin: 0 0 36px; font-size: 18px; line-height: 1.65; color: #C9CDD3; max-width: 32em")}>Jeg kommer hjem til dig og hjælper med computer, wifi, telefon, møbelsamling, ophæng og indkøb. Fast timepris, direkte kontakt og tid til at forklare.</p>
<div style={css("display: flex; flex-wrap: wrap; gap: 12px")}>
<a href="tel:+4522216814" className="k-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #F5C842; color: #15171B; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.04em; text-transform: uppercase; padding: 17px 26px; border-radius: 6px; min-height: 56px; box-sizing: border-box")}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring 22 21 68 14</a>
<a href="#priser" onClick={v.nav.priser} className="k-btn" style={css("display: inline-flex; align-items: center; background: transparent; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.04em; text-transform: uppercase; padding: 16px 24px; border-radius: 6px; border: 1.5px solid rgba(255,255,255,0.4); min-height: 56px; box-sizing: border-box")}>Se priser</a>
</div>
</div>
<div style={css(`flex: 1 1 400px; min-width: 0; position: relative; height: ${v.photoH}; align-self: flex-end`)}>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-44%); height: 100%; width: auto; display: block")} />
</div>
</div>
</section>

{/* SORT BÅND */}
<div aria-hidden="true" style={css("background: #000000; overflow: hidden; padding: 26px 0; border-top: 1px solid #23262B")}>
<div className="k-track" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(22px, 2.4vw, 30px); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; white-space: nowrap")}>{t}<svg width="16" height="16" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="#F5C842"/></svg></span>
</React.Fragment>))}
</div>
</div>

{/* KORT FORTALT / PRISER */}
<section id="priser" style={css("background: #F3F0E6; padding: 96px 24px")}>
<div style={css("max-width: 1240px; margin: 0 auto")}>
<h2 style={css("margin: 0 0 12px; text-align: center; font-family: 'Chakra Petch', sans-serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; font-weight: 700; letter-spacing: 0.01em")}>Priser og kontakt</h2>
<p style={css("margin: 0 auto 48px; text-align: center; max-width: 34em; font-size: 17px; color: #4E535B")}>Du kender prisen, inden jeg går i gang. Privatpriser er inkl. moms, og for erhverv lægges moms oveni.</p>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px")}>

<div className="k-card" style={css("position: relative; overflow: hidden; background: #15171B; color: #ffffff; border-radius: 10px; padding: 30px 28px; min-height: 250px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 20px")}>
<svg aria-hidden="true" viewBox="0 0 200 200" style={css("position: absolute; right: -30px; bottom: -30px; width: 200px; height: 200px")} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"><rect x="20" y="30" width="160" height="110" rx="10"/><path d="M70 170h60M100 140v30"/></svg>
<p style={css("position: relative; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C9CDD3")}>IT-hjælp</p>
<div style={css("position: relative")}>
<p style={css("margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 52px; font-weight: 700; line-height: 1; text-transform: uppercase")}>350 kr.</p>
<p style={css("margin: 6px 0 0; font-family: 'Chakra Petch', sans-serif; font-size: 26px; font-weight: 700; text-transform: uppercase; color: #F5C842")}>pr. time</p>
</div>
<p style={css("position: relative; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #C9CDD3")}>Computer · wifi · iPhone · iPad</p>
</div>

<div className="k-card" style={css("position: relative; overflow: hidden; background: #15171B; color: #ffffff; border-radius: 10px; padding: 30px 28px; min-height: 250px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 20px")}>
<svg aria-hidden="true" viewBox="0 0 200 200" style={css("position: absolute; right: -30px; bottom: -30px; width: 200px; height: 200px")} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"><path d="M120 50a40 40 0 0 0-54 54L20 150l30 30 46-46a40 40 0 0 0 54-54l-25 25-24-6-6-24z"/></svg>
<p style={css("position: relative; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C9CDD3")}>Hjemmeservice</p>
<div style={css("position: relative")}>
<p style={css("margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 52px; font-weight: 700; line-height: 1; text-transform: uppercase")}>500 kr.</p>
<p style={css("margin: 6px 0 0; font-family: 'Chakra Petch', sans-serif; font-size: 26px; font-weight: 700; text-transform: uppercase; color: #F5C842")}>pr. time</p>
</div>
<p style={css("position: relative; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #C9CDD3")}>Møbler · ophæng · indkøb</p>
</div>

<div className="k-card" style={css("position: relative; overflow: hidden; background: #15171B; color: #ffffff; border-radius: 10px; padding: 30px 28px; min-height: 250px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 20px")}>
<svg aria-hidden="true" viewBox="0 0 200 200" style={css("position: absolute; right: -30px; bottom: -30px; width: 200px; height: 200px")} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"><path d="M180 140v26a18 18 0 0 1-20 18A178 178 0 0 1 16 40 18 18 0 0 1 34 20h26a18 18 0 0 1 18 15c1 8 4 16 6 24a18 18 0 0 1-4 19L68 90a144 144 0 0 0 54 54l12-12a18 18 0 0 1 19-4c8 2 16 5 24 6a18 18 0 0 1 15 18z"/></svg>
<p style={css("position: relative; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C9CDD3")}>Ring eller sms</p>
<div style={css("position: relative")}>
<p style={css("margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 44px; font-weight: 700; line-height: 1; letter-spacing: 0.01em")}>22 21 68 14</p>
<p style={css("margin: 6px 0 0; font-family: 'Chakra Petch', sans-serif; font-size: 26px; font-weight: 700; text-transform: uppercase; color: #F5C842")}>Direkte til Søren</p>
</div>
<a href="tel:+4522216814" className="k-btn" style={css("position: relative; align-self: flex-start; display: inline-flex; align-items: center; background: #F5C842; color: #15171B; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 18px; border-radius: 6px; min-height: 44px; box-sizing: border-box")}>Ring nu</a>
</div>

</div>
<p style={css("margin: 28px 0 0; text-align: center; font-size: 15px; color: #4E535B")}>Kørsel uden for området efter aftale. Betal med MobilePay, kontant eller faktura.</p>
</div>
</section>

{/* HVORFOR */}
<section id="hvorfor" style={css("padding: 96px 24px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 48px; align-items: center")}>
<div style={css("flex: 1 1 360px; min-width: 0")}>
<p style={css("margin: 0 0 14px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5300")}><span style={css("width: 28px; height: 3px; background: #F5C842")}></span>Om mig</p>
<h2 style={css("margin: 0 0 20px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; font-weight: 700")}>Hvorfor vælge mig?</h2>
<p style={css("margin: 0; font-size: 17px; color: #4E535B; max-width: 30em")}>Hej, jeg hedder Søren. Jeg hjælper med de ting i hverdagen, der er lettere, når man er to om dem. Jeg forklarer gerne undervejs, så du selv kan næste gang.</p>
</div>
<div style={css("flex: 1.3 1 520px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px")}>
<div className="k-card" style={css("background: #F3F0E6; border-radius: 10px; padding: 28px 24px; text-align: center")}><span style={css("width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 12px; background: #15171B; color: #F5C842; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><p style={css("margin: 0 0 4px; font-size: 18px; font-weight: 700")}>Lokal</p><p style={css("margin: 0; font-size: 15px; color: #4E535B")}>Kerteminde og omegn</p></div>
<div className="k-card" style={css("background: #F3F0E6; border-radius: 10px; padding: 28px 24px; text-align: center")}><span style={css("width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 12px; background: #15171B; color: #F5C842; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span><p style={css("margin: 0 0 4px; font-size: 18px; font-weight: 700")}>Fast timepris</p><p style={css("margin: 0; font-size: 15px; color: #4E535B")}>Ingen overraskelser</p></div>
<div className="k-card" style={css("background: #F3F0E6; border-radius: 10px; padding: 28px 24px; text-align: center")}><span style={css("width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 12px; background: #15171B; color: #F5C842; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><p style={css("margin: 0 0 4px; font-size: 18px; font-weight: 700")}>Ingen dumme spørgsmål</p><p style={css("margin: 0; font-size: 15px; color: #4E535B")}>Forklaret uden fagord</p></div>
<div className="k-card" style={css("background: #F3F0E6; border-radius: 10px; padding: 28px 24px; text-align: center")}><span style={css("width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 12px; background: #15171B; color: #F5C842; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg></span><p style={css("margin: 0 0 4px; font-size: 18px; font-weight: 700")}>Hjemme hos dig</p><p style={css("margin: 0; font-size: 15px; color: #4E535B")}>Privat og erhverv</p></div>
</div>
</div>
</section>

{/* YDELSER */}
<section id="ydelser" style={css("background: #F3F0E6; padding: 96px 24px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 48px; align-items: stretch")}>
<div style={css("flex: 1 1 420px; min-width: 0; background: #15171B; border-radius: 10px; padding: 36px; box-sizing: border-box; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-content: center; min-height: 380px; position: relative; overflow: hidden")}>
{v.tiles.map((ti, i_) => (<React.Fragment key={i_}>
<div style={css(`aspect-ratio: 1 / 1; border-radius: 10px; background: ${ti.bg}; color: ${ti.ink}; display: flex; align-items: center; justify-content: center`)}>
{ti.isPc && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></>)}
{ti.isWifi && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a14 14 0 0 1 20 0"/><circle cx="12" cy="19.5" r="1"/></svg></>)}
{ti.isPhone && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg></>)}
{ti.isTool && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg></>)}
{ti.isLamp && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M6 14a6 6 0 0 1 12 0z"/><path d="M10 18a2 2 0 0 0 4 0"/></svg></>)}
{ti.isBag && (<><svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></>)}
</div>
</React.Fragment>))}
</div>
<div style={css("flex: 1 1 460px; min-width: 0")}>
<p style={css("margin: 0 0 14px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5300")}><span style={css("width: 28px; height: 3px; background: #F5C842")}></span>Ydelser</p>
<h2 style={css("margin: 0 0 8px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; font-weight: 700")}>Det hjælper jeg med</h2>
<p style={css("margin: 0 0 28px; font-size: 17px; color: #4E535B")}>Du behøver ikke vide, hvad problemet hedder.</p>
{v.groups.map((g, i_) => (<React.Fragment key={i_}>
<div style={css("margin-bottom: 24px")}>
<p style={css("margin: 0 0 4px; display: flex; justify-content: space-between; gap: 12px; padding-bottom: 8px; border-bottom: 2px solid #15171B; font-family: 'Chakra Petch', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase")}><span>{g.label}</span><span>{g.price} / time</span></p>
<ul style={css("list-style: none; margin: 0; padding: 0")}>
{g.items.map((it, i_) => (<React.Fragment key={i_}>
<li className="k-row" style={css("display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid #DCD6C6; font-size: 16px; font-weight: 600")}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C99A0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={css("flex: 0 0 auto")}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>{it}</li>
</React.Fragment>))}
</ul>
</div>
</React.Fragment>))}
<p style={css("margin: 8px 0 0; font-size: 16px; color: #4E535B")}>Noget helt andet? Spørg bare. Kan jeg klare det, siger jeg ja.</p>
</div>
</div>
</section>

{/* TRIN */}
<section style={css("padding: 96px 24px")}>
<div style={css("max-width: 1240px; margin: 0 auto")}>
<h2 style={css("margin: 0 0 48px; text-align: center; font-family: 'Chakra Petch', sans-serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; font-weight: 700")}>Sådan foregår det</h2>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px")}>
{v.steps.map((st, i_) => (<React.Fragment key={i_}>
<div className="k-card" style={css("background: #15171B; color: #ffffff; border-radius: 10px; padding: 30px 28px; border-top: 5px solid #F5C842")}>
<p style={css("margin: 0 0 14px; font-family: 'Chakra Petch', sans-serif; font-size: 48px; font-weight: 700; line-height: 1; color: #F5C842")}>{st.n}</p>
<h3 style={css("margin: 0 0 8px; font-family: 'Chakra Petch', sans-serif; font-size: 24px; font-weight: 700; text-transform: uppercase")}>{st.title}</h3>
<p style={css("margin: 0; font-size: 16px; color: #C9CDD3")}>{st.text}</p>
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* SPØRGSMÅL */}
<section id="spoergsmaal" style={css("background: #F3F0E6; padding: 96px 24px")}>
<div style={css("max-width: 900px; margin: 0 auto")}>
<h2 style={css("margin: 0 0 36px; text-align: center; font-family: 'Chakra Petch', sans-serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; font-weight: 700")}>Spørgsmål og svar</h2>
<div style={css("display: flex; flex-direction: column; gap: 10px")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css(`background: #ffffff; border-radius: 10px; border-left: ${f.border}`)}>
<h3 style={css("margin: 0")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} style={css("width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; background: transparent; border: 0; padding: 20px 22px; font-size: 18px; font-weight: 700; color: #15171B; cursor: pointer; min-height: 66px")}>
<span>{f.q}</span>
<span style={css(f.iconStyle)}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 60px 20px 22px; font-size: 16px; color: #4E535B")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</section>

{/* KONTAKT */}
<section id="kontakt" style={css("background: #15171B; color: #ffffff; padding: 96px 24px; position: relative; overflow: hidden")}>
<svg aria-hidden="true" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}><g fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"><path d="M-40 380 C 300 300, 700 460, 1060 370 S 1380 300, 1500 340" strokeOpacity="0.06"/><path d="M-40 430 C 300 350, 700 510, 1060 420 S 1380 350, 1500 390" strokeOpacity="0.05"/><path d="M-40 480 C 300 400, 700 560, 1060 470 S 1380 400, 1500 440" strokeOpacity="0.04"/><path d="M-40 530 C 300 450, 700 610, 1060 520 S 1380 450, 1500 490" strokeOpacity="0.03"/></g><path d="M-40 580 C 300 500, 700 660, 1060 570 S 1380 500, 1500 540" fill="none" stroke="#F5C842" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round"/></svg>
<div style={css("position: relative; max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 48px")}>
<div style={css("flex: 1 1 420px; min-width: 0")}>
<p style={css("margin: 0 0 14px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #C9CDD3")}><span style={css("width: 28px; height: 3px; background: #F5C842")}></span>Kontakt</p>
<h2 style={css("margin: 0 0 20px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(36px, 4.4vw, 60px); line-height: 1.04; font-weight: 700; text-transform: uppercase; color: #F5C842")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0 0 32px; font-size: 17px; color: #C9CDD3; max-width: 28em")}>Ring eller send en sms, så finder vi en tid, der passer. Tager jeg ikke telefonen, ringer jeg tilbage.</p>
<a href="tel:+4522216814" className="k-btn" style={css("display: inline-flex; align-items: center; gap: 12px; background: #F5C842; color: #15171B; text-decoration: none; font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: clamp(28px, 3.4vw, 40px); padding: 16px 26px; border-radius: 6px; min-height: 64px; box-sizing: border-box")}>22 21 68 14</a>
<p style={css("margin: 20px 0 0; font-size: 17px")}><a href="mailto:kontakt@hverdagshjaelpogit.dk" style={css("color: #ffffff; font-weight: 600; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a></p>
</div>
<div style={css("flex: 1 1 420px; min-width: 0; background: #ffffff; color: #15171B; border-radius: 10px; padding: 30px; box-sizing: border-box; border-top: 5px solid #F5C842")}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 16px")}>
<h3 style={css("margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 26px; font-weight: 700; text-transform: uppercase")}>Bliv ringet op</h3>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px")}>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="k-navn" style={css("font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase")}>Navn</label>
<input id="k-navn" name="navn" type="text" autoComplete="name" className="k-field" style={css("font-size: 17px; padding: 12px 14px; border-radius: 6px; border: 1.5px solid #CFD3D9; background: #F7F7F5; min-height: 52px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="k-tlf" style={css("font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase")}>Telefon</label>
<input id="k-tlf" name="tlf" type="tel" autoComplete="tel" className="k-field" style={css("font-size: 17px; padding: 12px 14px; border-radius: 6px; border: 1.5px solid #CFD3D9; background: #F7F7F5; min-height: 52px; box-sizing: border-box")} />
</div>
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="k-besked" style={css("font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase")}>Besked (valgfrit)</label>
<textarea id="k-besked" name="besked" rows="3" className="k-field" style={css("font-size: 17px; padding: 12px 14px; border-radius: 6px; border: 1.5px solid #CFD3D9; background: #F7F7F5; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="k-btn" style={css("align-self: flex-start; background: #15171B; color: #F5C842; border: 0; border-radius: 6px; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 16px 26px; min-height: 54px; cursor: pointer")}>Send besked</button>
<p style={css("margin: 0; font-size: 13px; color: #5B6068")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 700")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 12px; align-items: flex-start; padding: 16px 0")}>
<h3 style={css("margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 30px; font-weight: 700; text-transform: uppercase")}>Tak for din besked</h3>
<p style={css("margin: 0; font-size: 17px; color: #4E535B")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="k-btn" style={css("background: transparent; border: 1.5px solid #15171B; color: #15171B; border-radius: 6px; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 12px 20px; min-height: 48px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</section>
</>)}

{/* UNDERSIDER: ENKEL MENU */}
{v.isSub && (<>
<header style={css("background: #15171B; border-bottom: 1px solid #23262B")}>
<div style={css("max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #ffffff; min-height: 44px")}>
<span style={css("width: 44px; height: 44px; border-radius: 10px; background: #ffffff; display: flex; align-items: center; justify-content: center")}><img src="/img/mark.png" alt="" style={css("height: 32px; width: auto")} /></span>
<span style={css("font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 20px")}>Sørens hverdagshjælp</span>
</a>
<a href="#top" onClick={v.nav.top} className="k-btn" style={css("display: inline-flex; align-items: center; background: #F5C842; color: #15171B; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 18px; border-radius: 6px; min-height: 44px; box-sizing: border-box")}>Til forsiden</a>
</div>
</header>
</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 780px; margin: 0 auto; font-size: 17px; color: #33373D")}>
<h1 style={css("margin: 0 0 10px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(40px, 5vw, 64px); line-height: 1.02; font-weight: 700; text-transform: uppercase; color: #15171B")}>Privatlivspolitik</h1>
<span aria-hidden="true" style={css("display: block; width: 64px; height: 5px; background: #F5C842; margin: 14px 0")}></span>
<p style={css("margin: 0 0 40px; font-size: 15px; color: #5B6068")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 32px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 32px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 32px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 32px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 32px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 32px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 700")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 780px; margin: 0 auto; font-size: 17px; color: #33373D")}>
<h1 style={css("margin: 0 0 10px; font-family: 'Chakra Petch', sans-serif; font-size: clamp(40px, 5vw, 64px); line-height: 1.02; font-weight: 700; text-transform: uppercase; color: #15171B")}>Cookiepolitik</h1>
<span aria-hidden="true" style={css("display: block; width: 64px; height: 5px; background: #F5C842; margin: 14px 0")}></span>
<p style={css("margin: 0 0 40px; font-size: 15px; color: #5B6068")}>Senest opdateret: oktober 2026</p>
<p style={css("margin: 0 0 40px; background: #F3F0E6; border-left: 5px solid #F5C842; border-radius: 6px; padding: 20px 22px; color: #15171B")}><strong>Kort fortalt:</strong> Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 32px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 32px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 32px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 8px; font-size: 21px; font-weight: 700; color: #15171B")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 700")}>privatlivspolitikken</a>.</p>
</article>
</main>
</>)}

{/* FOOTER */}
<footer style={css("background: #000000; color: #A9AEB6; padding: 40px 24px 32px; border-top: 4px solid #F5C842")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 20px 40px; justify-content: space-between; align-items: center; font-size: 15px")}>
<span style={css("display: flex; align-items: center; gap: 12px")}><span style={css("width: 40px; height: 40px; border-radius: 8px; background: #ffffff; display: flex; align-items: center; justify-content: center")}><img src="/img/mark.png" alt="" style={css("height: 28px; width: auto")} /></span><span><strong style={css("font-family: 'Chakra Petch', sans-serif; color: #ffffff; font-size: 17px")}>Sørens hverdagshjælp</strong><br />Kerteminde og omegn · CVR 46656814</span></span>
<span style={css("display: flex; flex-wrap: wrap; gap: 8px 24px")}>
<a href="tel:+4522216814" className="k-nav" style={css("color: #ffffff; text-decoration: none; font-weight: 600; padding: 4px 0")}>22 21 68 14</a>
<a href="#top" onClick={v.showPrivacy} className="k-nav" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} className="k-nav" style={css("color: #ffffff; text-decoration: none; padding: 4px 0")}>Cookiepolitik</a>
</span>
</div>
</footer>

{v.showMobileBar && (<>
<div style={css("height: 80px; background: #000000")}></div>
<a href="tel:+4522216814" style={css("position: fixed; left: 14px; right: 14px; bottom: 14px; z-index: 30; display: flex; align-items: center; justify-content: center; gap: 10px; background: #F5C842; color: #15171B; text-decoration: none; font-weight: 700; font-size: 17px; letter-spacing: 0.04em; text-transform: uppercase; border-radius: 8px; min-height: 58px; box-shadow: 0 10px 26px rgba(0,0,0,0.35)")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring 22 21 68 14
</a>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 6 – Kraftig og tydelig';
export default Component;
