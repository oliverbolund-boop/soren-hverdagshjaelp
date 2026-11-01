// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap';
const PAGE_CSS = `body{margin:0;background:#0B1A2E}
html{scroll-behavior:smooth}
a{color:#EAF0F7}a:hover{color:#C6E97A}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #E9A23B;outline-offset:3px}
.d-btn{transition:transform .2s ease,background-color .2s ease,color .2s ease,border-color .2s ease}
.d-btn:hover{transform:translateY(-2px)}
.d-arrow{transition:transform .25s ease}
.d-btn:hover .d-arrow{transform:translateX(5px)}
.d-row{transition:color .2s ease}
.d-row:hover{color:#C6E97A !important}
.d-ul{background-image:linear-gradient(currentColor,currentColor);background-size:0% 2px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .25s ease}
.d-ul:hover{background-size:100% 2px}
.d-field{transition:border-color .2s ease,background-color .2s ease}
.d-field:hover{border-color:#3E5A82 !important}
.d-field:focus{border-color:#C6E97A !important;outline:none}
@keyframes d-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.d-track{animation:d-left 36s linear infinite}
.d-slow{animation:d-left 70s linear infinite}
@keyframes d-pulse{0%,100%{box-shadow:0 0 0 0 rgba(198,233,122,0.5)}50%{box-shadow:0 0 0 8px rgba(198,233,122,0)}}
.d-dot{animation:d-pulse 2.4s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.d-track,.d-slow,.d-dot{animation:none}.d-btn,.d-arrow,.d-row,.d-ul{transition:none}.d-btn:hover{transform:none}}`;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, openFaq: 0, openSvc: '01', picked: {}, sent: false, view: 'home', collapsed: false };
    this.onResize = () => this.setState({ w: window.innerWidth });
    this.raf = 0;
    this.reduce = false;
    // Skifter kun tilstand ved en grænse, så selve bevægelsen klares af CSS og ikke hakker
    this.onScroll = () => {
      const y = window.scrollY || 0;
      if (!this.state.collapsed && y > 140) this.setState({ collapsed: true });
      else if (this.state.collapsed && y < 60) this.setState({ collapsed: false });
    };
  }
  componentDidMount() {
    try { this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { this.reduce = false; }
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
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
    // Billedpanelet krymper kun på computer, hvor det står fast i siden
    const gone = isDesktop && s.view === 'home' && s.collapsed;
    const ease = 'cubic-bezier(.65,0,.35,1)';
    const off = this.reduce;
    // Ud: billedet glider op og væk først, derefter lukker kolonnen og indholdet glider ind.
    // Ind: kolonnen åbner først, derefter falder billedet på plads.
    const asideTrans = off ? 'none' : (gone ? 'flex-basis .75s ' + ease + ' .28s, padding .75s ' + ease + ' .28s' : 'flex-basis .7s ' + ease + ', padding .7s ' + ease);
    const innerTrans = off ? 'none' : (gone ? 'transform .55s cubic-bezier(.6,0,.9,.4), opacity .45s ease .1s' : 'transform .7s cubic-bezier(.2,.8,.2,1) .35s, opacity .5s ease .4s');
    const mainTrans = off ? 'none' : (gone ? 'padding .75s ' + ease + ' .28s' : 'padding .7s ' + ease);
    const iconBase = 'flex: 0 0 auto; width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform .25s ease, background-color .25s ease; ';
    const iconOn = 'background: #C6E97A; color: #0B1A2E; transform: rotate(45deg);';
    const iconOff = 'background: transparent; color: #ffffff; border: 1px solid #3E5A82;';
    const rawGroups = [
      {
        label: 'IT-hjælp', price: '350 kr.', headBg: '#ffffff', headInk: '#0B1A2E', hasNote: false, note: '',
        items: [
          { n: '01', title: 'PC & wifi', text: 'Når computeren er langsom, printeren ikke vil, eller wifi’en falder ud i stuen.', examples: ['Ny computer', 'Wifi og router', 'Printer, mail og opdateringer'] },
          { n: '02', title: 'iPhone & iPad', text: 'Jeg hjælper dig godt i gang med telefonen eller tabletten og får styr på det, der driller.', examples: ['Billeder', 'MitID, apps og MobilePay', 'Videoopkald med familien'] }
        ]
      },
      {
        label: 'Hjemmeservice', price: '500 kr.', headBg: '#C6E97A', headInk: '#0B1A2E', hasNote: true, note: 'kørsel uden for området efter aftale',
        items: [
          { n: '03', title: 'Samling af møbler', text: 'Reolen, sengen eller kommoden fra papkassen, samlet og stillet på plads.', examples: ['Flatpack-møbler', 'Havemøbler', 'Emballagen fjernet'] },
          { n: '04', title: 'Indkøb af dagligvarer', text: 'Har du svært ved at komme ud, handler jeg ind for dig og bærer varerne ind.', examples: ['Fast ugentlig tur', 'Enkelte indkøb', 'Afhentning af pakker'] },
          { n: '05', title: 'Ophæng af hylder og lamper', text: 'Det, der skal op at hænge, hænger jeg lige og solidt op.', examples: ['Hylder og billeder', 'Lamper og gardiner', 'Tv på væggen'] }
        ]
      }
    ];
    const groups = rawGroups.map((g) => Object.assign({}, g, {
      items: g.items.map((it) => {
        const open = s.openSvc === it.n;
        return Object.assign({}, it, {
          open, expanded: open ? 'true' : 'false',
          iconStyle: iconBase + (open ? iconOn : iconOff),
          toggle: () => this.setState({ openSvc: open ? '' : it.n })
        });
      })
    }));
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    const ticker = [];
    for (let r = 0; r < 2; r++) words.forEach((x) => ticker.push(x));
    const nameTicker = [];
    for (let r = 0; r < 6; r++) nameTicker.push(r % 2 === 0 ? 'Sørens hverdagshjælp' : 'IT & hjemmeservice');
    const faqRaw = [
      { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
      { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
      { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
      { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
      { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' }
    ];
    const faqIconBase = 'flex: 0 0 auto; width: 36px; height: 36px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform .25s ease, background-color .25s ease; ';
    const faqs = faqRaw.map((f, i) => {
      const open = s.openFaq === i;
      return Object.assign({}, f, {
        open, expanded: open ? 'true' : 'false',
        iconStyle: faqIconBase + (open ? iconOn : iconOff),
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
        style: chipBase + (on ? 'background: #C6E97A; color: #0B1A2E; border: 1px solid #C6E97A;' : 'background: transparent; color: #ffffff; border: 1px solid #3E5A82;'),
        pick: () => this.setState({ picked: Object.assign({}, s.picked, { [label]: !on }) })
      };
    });
    const nav = {};
    ['top', 'ydelser', 'maade', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isHome: s.view === 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      panelPos: isDesktop ? 'sticky' : 'relative',
      // Computer: panelet glider ud og forsvinder, og indholdet udvider sig til fuld bredde
      asideFlex: isDesktop ? (gone ? '0 0 0%' : '0 0 44%') : '1 1 100%',
      asideTrans,
      innerTrans,
      mainTrans,
      mainFlex: isDesktop ? '1 1 0' : '1 1 100%',
      panelPad: isDesktop ? (gone ? '24px 0px 24px 0px' : '24px 12px 24px 24px') : '16px 16px 0',
      panelInnerW: isDesktop ? Math.round(Math.min(s.w, 1400) * 0.44 - 36) + 'px' : 'auto',
      panelH: isDesktop ? '680px' : (isPhone ? '480px' : '560px'),
      panelY: gone ? '-115%' : '0%',
      asideOpacity: gone ? '0' : '1',
      asideVis: gone ? 'hidden' : 'visible',
      visDelay: off ? '0s' : (gone ? '1.05s' : '0s'),
      imgH: '78%',
      headOpacity: '1',
      headShift: '0px',
      mainPad: isDesktop ? (gone ? '64px 48px 0 24px' : '64px 48px 0 56px') : (isPhone ? '48px 20px 0' : '56px 32px 0'),
      priceIt: (e) => { this.setState({ openSvc: '01' }); nav.ydelser(e); },
      priceHome: (e) => { this.setState({ openSvc: '03' }); nav.ydelser(e); },
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
<div style={css("font-family: 'DM Sans', system-ui, sans-serif; color: #EAF0F7; background: #0B1A2E; font-size: 18px; line-height: 1.6")}>

{/* MENU */}
<header style={css("position: sticky; top: 0; z-index: 30; background: rgba(11,26,46,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #1C2F4A")}>
<div style={css("max-width: 1400px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #ffffff; min-height: 44px")}>
<span style={css("width: 44px; height: 44px; border-radius: 999px; background: #ffffff; display: flex; align-items: center; justify-content: center")}><img src="/img/mark.png" alt="" style={css("height: 30px; width: auto; display: block")} /></span>
<span style={css("font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 19px; letter-spacing: -0.02em")}>Sørens hverdagshjælp</span>
</a>
{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 28px")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="d-ul" style={css("text-decoration: none; font-weight: 500; font-size: 16px; color: #C9D5E5; padding: 8px 0")}>Ydelser</a>
<a href="#maade" onClick={v.nav.maade} className="d-ul" style={css("text-decoration: none; font-weight: 500; font-size: 16px; color: #C9D5E5; padding: 8px 0")}>Sådan arbejder jeg</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} className="d-ul" style={css("text-decoration: none; font-weight: 500; font-size: 16px; color: #C9D5E5; padding: 8px 0")}>Spørgsmål</a>
<a href="tel:+4522216814" className="d-btn" style={css("display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700; font-size: 16px; color: #0B1A2E; background: #C6E97A; padding: 12px 20px; border-radius: 999px; min-height: 46px; box-sizing: border-box")}>
<span className="d-dot" style={css("width: 8px; height: 8px; border-radius: 999px; background: #2F5715")}></span>22 21 68 14</a>
</nav>
</>)}
{v.isCompact && (<>
<button type="button" onClick={v.toggleMenu} aria-expanded={v.menuExpanded} aria-label="Menu" style={css("height: 46px; padding: 0 18px; border-radius: 999px; border: 1px solid #3E5A82; background: transparent; color: #ffffff; font-weight: 600; font-size: 16px; cursor: pointer")}>{v.menuLabel}</button>
</>)}
</div>
{v.showMobileMenu && (<>
<nav aria-label="Mobilmenu" style={css("padding: 4px 24px 24px; display: flex; flex-direction: column")}>
<a href="#ydelser" onClick={v.nav.ydelser} style={css("padding: 12px 0; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; letter-spacing: -0.03em; color: #ffffff")}>Ydelser</a>
<a href="#maade" onClick={v.nav.maade} style={css("padding: 12px 0; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; letter-spacing: -0.03em; color: #ffffff")}>Sådan arbejder jeg</a>
<a href="#spoergsmaal" onClick={v.nav.spoergsmaal} style={css("padding: 12px 0; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; letter-spacing: -0.03em; color: #ffffff")}>Spørgsmål</a>
<a href="#kontakt" onClick={v.nav.kontakt} style={css("padding: 12px 0; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; letter-spacing: -0.03em; color: #C6E97A")}>Kontakt</a>
</nav>
</>)}
</header>

{v.isHome && (<>

{/* LØBEBÅND ØVERST */}
<div aria-hidden="true" style={css("overflow: hidden; background: #C6E97A; padding: 12px 0")}>
<div className="d-track" style={css("display: flex; width: max-content")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 22px; padding-right: 22px; font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: #0B1A2E; white-space: nowrap")}>{t}<svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.6L12 17.2l-6.2 4.6 2.4-7.6L2 9.6h7.6z" fill="#2F5715"/></svg></span>
</React.Fragment>))}
</div>
</div>

{/* DELT SKÆRM */}
<div id="top" style={css("max-width: 1400px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: flex-start")}>

{/* VENSTRE: FAST PANEL */}
<aside style={css(`flex: ${v.asideFlex}; min-width: 0; position: ${v.panelPos}; top: 73px; padding: ${v.panelPad}; box-sizing: border-box; overflow: hidden; visibility: ${v.asideVis}; transition: ${v.asideTrans}, visibility 0s linear ${v.visDelay}`)}>
<div style={css(`position: relative; width: ${v.panelInnerW}; height: ${v.panelH}; border-radius: 28px; overflow: hidden; background: #3F6E1C; opacity: ${v.asideOpacity}; transform: translateY(${v.panelY}); transition: ${v.innerTrans}; will-change: transform, opacity`)}>
<svg aria-hidden="true" viewBox="0 0 500 700" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<path d="M0 520 C 150 450, 330 500, 500 400 L500 700 L0 700 Z" fill="#1E3A64"/>
<path d="M0 548 C 160 480, 340 530, 500 432" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
<path d="M0 700 L0 650 C 170 610, 340 640, 500 570 L500 700 Z" fill="#0B1A2E"/>
</svg>
<p style={css(`position: absolute; left: 28px; right: 28px; top: 24px; margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: clamp(34px, 3.6vw, 52px); line-height: 0.98; font-weight: 700; letter-spacing: -0.04em; color: #ffffff; opacity: ${v.headOpacity}; transform: translateY(${v.headShift})`)}>Hej,<br />jeg er Søren.</p>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css(`position: absolute; bottom: 0; left: 50%; transform: translateX(-42%); height: ${v.imgH}; width: auto; display: block`)} />
<a href="tel:+4522216814" className="d-btn" style={css("position: absolute; left: 20px; right: 20px; bottom: 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; background: rgba(11,26,46,0.88); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; text-decoration: none; border-radius: 18px; padding: 14px 18px; min-height: 60px; box-sizing: border-box")}>
<span style={css("display: flex; flex-direction: column; line-height: 1.25")}><span style={css("font-size: 13px; color: #9FB0C6")}>Ring eller sms</span><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em")}>22 21 68 14</span></span>
<span style={css("width: 44px; height: 44px; border-radius: 999px; background: #C6E97A; color: #0B1A2E; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></span>
</a>
</div>
</aside>

{/* HØJRE: INDHOLD */}
<main style={css(`flex: ${v.mainFlex}; min-width: 0; padding: ${v.mainPad}; box-sizing: border-box; transition: ${v.mainTrans}`)}>

<section style={css("padding-bottom: 96px; border-bottom: 1px solid #1C2F4A")}>
<p style={css("margin: 0 0 28px; display: inline-flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #C6E97A")}>
<span className="d-dot" style={css("width: 8px; height: 8px; border-radius: 999px; background: #C6E97A")}></span>
IT &amp; hjemmeservice · Kerteminde og omegn
</p>
<h1 style={css("margin: 0 0 32px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(46px, 6vw, 92px); line-height: 0.96; font-weight: 700; letter-spacing: -0.05em; color: #ffffff")}>Den hjælp, du altid står og <span style={css("color: #C6E97A")}>mangler.</span></h1>
<p style={css("margin: 0 0 44px; font-size: 20px; line-height: 1.55; color: #B4C2D4; max-width: 30em")}>Jeg kommer hjem til dig og hjælper med computer, wifi og telefon, og med de praktiske ting i hjemmet. I et roligt tempo og med tid til at forklare.</p>
<div style={css("display: flex; flex-wrap: wrap; gap: 12px")}>
<a href="#ydelser" onClick={v.nav.ydelser} className="d-btn" style={css("display: inline-flex; align-items: center; gap: 12px; background: #ffffff; color: #0B1A2E; text-decoration: none; font-weight: 700; font-size: 17px; padding: 17px 26px; border-radius: 999px; min-height: 56px; box-sizing: border-box")}>Se ydelser og priser
<svg className="d-arrow" aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
<a href="#kontakt" onClick={v.nav.kontakt} className="d-btn" style={css("display: inline-flex; align-items: center; background: transparent; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 17px; padding: 16px 26px; border-radius: 999px; border: 1px solid #3E5A82; min-height: 56px; box-sizing: border-box")}>Bliv ringet op</a>
</div>
<div style={css("margin-top: 64px")}>
<p style={css("margin: 0 0 14px; font-size: 15px; font-weight: 600; color: #C6E97A")}>Priser</p>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px")}>
<a href="#ydelser" onClick={v.priceIt} className="d-btn" style={css("display: flex; flex-direction: column; gap: 14px; background: #ffffff; color: #0B1A2E; text-decoration: none; border-radius: 24px; padding: 24px 26px")}>
<span style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px")}><span style={css("font-size: 16px; font-weight: 700")}>IT-hjælp</span><span style={css("font-size: 13px; font-weight: 600; color: #1E3A64; background: #EAF0F7; border-radius: 999px; padding: 4px 10px")}>PC · wifi · iPhone</span></span>
<span style={css("display: flex; align-items: baseline; gap: 8px")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: clamp(44px, 4.6vw, 60px); font-weight: 700; letter-spacing: -0.05em; line-height: 1")}>350 kr.</span><span style={css("font-size: 16px; font-weight: 600; color: #45526A")}>/ time</span></span>
<span style={css("font-size: 14px; color: #45526A")}>Privat inkl. moms · erhverv + moms</span>
</a>
<a href="#ydelser" onClick={v.priceHome} className="d-btn" style={css("display: flex; flex-direction: column; gap: 14px; background: #C6E97A; color: #0B1A2E; text-decoration: none; border-radius: 24px; padding: 24px 26px")}>
<span style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px")}><span style={css("font-size: 16px; font-weight: 700")}>Hjemmeservice</span><span style={css("font-size: 13px; font-weight: 600; color: #2F5715; background: rgba(255,255,255,0.55); border-radius: 999px; padding: 4px 10px")}>Møbler · ophæng · indkøb</span></span>
<span style={css("display: flex; align-items: baseline; gap: 8px")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: clamp(44px, 4.6vw, 60px); font-weight: 700; letter-spacing: -0.05em; line-height: 1")}>500 kr.</span><span style={css("font-size: 16px; font-weight: 600; color: #34431F")}>/ time</span></span>
<span style={css("font-size: 14px; color: #34431F")}>Privat inkl. moms · erhverv + moms</span>
</a>
</div>
</div>
</section>

{/* YDELSER */}
<section id="ydelser" style={css("padding: 96px 0; border-bottom: 1px solid #1C2F4A")}>
<p style={css("margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #C6E97A")}>Ydelser</p>
<h2 style={css("margin: 0 0 20px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; font-weight: 700; letter-spacing: -0.045em; color: #ffffff")}>Hvad kan jeg hjælpe med?</h2>
<p style={css("margin: 0 0 56px; font-size: 18px; color: #B4C2D4; max-width: 30em")}>Tryk på en ydelse for at læse mere. Privatpriser er inkl. moms, og for erhverv lægges moms oveni.</p>
{v.groups.map((g, i_) => (<React.Fragment key={i_}>
<div style={css("margin-bottom: 48px")}>
<div style={css(`display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; background: ${g.headBg}; color: ${g.headInk}; border-radius: 22px; padding: 18px 22px; margin-bottom: 4px`)}>
<div>
<h3 style={css("margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.025em")}>{g.label}</h3>
<p style={css("margin: 2px 0 0; font-size: 14px; opacity: 0.85")}>Privat inkl. moms · erhverv + moms{g.hasNote && (<> · {g.note}</>)}</p>
</div>
<span style={css("display: inline-flex; align-items: baseline; gap: 6px")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 40px; font-weight: 700; letter-spacing: -0.045em; line-height: 1")}>{g.price}</span><span style={css("font-size: 15px; font-weight: 600; opacity: 0.85")}>/ time</span></span>
</div>
<div style={css("border-top: 1px solid #22344F")}>
{g.items.map((s, i_) => (<React.Fragment key={i_}>
<div style={css("border-bottom: 1px solid #22344F")}>
<h4 style={css("margin: 0")}>
<button type="button" onClick={s.toggle} aria-expanded={s.expanded} className="d-row" style={css("width: 100%; display: flex; align-items: center; gap: 20px; text-align: left; background: transparent; border: 0; padding: 26px 0; color: #ffffff; cursor: pointer; min-height: 80px")}>
<span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; color: #6F84A1; width: 28px; flex: 0 0 auto")}>{s.n}</span>
<span style={css("flex: 1 1 auto; font-family: 'Space Grotesk', sans-serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.15")}>{s.title}</span>
<span style={css(s.iconStyle)}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
</button>
</h4>
{s.open && (<>
<div style={css("padding: 0 0 28px 48px")}>
<p style={css("margin: 0 0 16px; font-size: 18px; color: #B4C2D4; max-width: 32em")}>{s.text}</p>
<div style={css("display: flex; flex-wrap: wrap; gap: 8px")}>
{s.examples.map((ex, i_) => (<React.Fragment key={i_}><span style={css("font-size: 14px; font-weight: 600; color: #EAF0F7; border: 1px solid #3E5A82; border-radius: 999px; padding: 7px 14px")}>{ex}</span></React.Fragment>))}
</div>
</div>
</>)}
</div>
</React.Fragment>))}
</div>
</div>
</React.Fragment>))}
<p style={css("margin: 0; font-size: 18px; color: #B4C2D4")}><strong style={css("color: #ffffff")}>Noget helt andet?</strong> Spørg bare. Kan jeg klare det, siger jeg ja. Ellers siger jeg det ærligt. <a href="#kontakt" onClick={v.nav.kontakt} style={css("font-weight: 700; color: #C6E97A")}>Spørg mig her</a></p>
</section>

{/* SÅDAN ARBEJDER JEG */}
<section id="maade" style={css("padding: 96px 0; border-bottom: 1px solid #1C2F4A")}>
<p style={css("margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #C6E97A")}>Sådan arbejder jeg</p>
<p style={css("margin: 0 0 56px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(30px, 3.4vw, 48px); line-height: 1.1; font-weight: 600; letter-spacing: -0.035em; color: #ffffff")}>Jeg hjælper med de ting i hverdagen, <span style={css("color: #6F84A1")}>der er lettere, når man er to om dem.</span></p>
<div style={css("display: flex; flex-direction: column; gap: 36px")}>
<div style={css("display: flex; gap: 24px; align-items: flex-start")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 56px; font-weight: 700; letter-spacing: -0.05em; line-height: 0.9; color: #3F6E1C; width: 72px; flex: 0 0 auto")}>01</span><div><p style={css("margin: 0 0 6px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Roligt tempo</p><p style={css("margin: 0; font-size: 17px; color: #B4C2D4")}>Jeg forklarer undervejs, så du selv kan næste gang. Der er ingen dumme spørgsmål.</p></div></div>
<div style={css("display: flex; gap: 24px; align-items: flex-start")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 56px; font-weight: 700; letter-spacing: -0.05em; line-height: 0.9; color: #3F6E1C; width: 72px; flex: 0 0 auto")}>02</span><div><p style={css("margin: 0 0 6px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Fast pris</p><p style={css("margin: 0; font-size: 17px; color: #B4C2D4")}>Du kender prisen, inden jeg går i gang. Større opgaver får en samlet pris på forhånd.</p></div></div>
<div style={css("display: flex; gap: 24px; align-items: flex-start")}><span style={css("font-family: 'Space Grotesk', sans-serif; font-size: 56px; font-weight: 700; letter-spacing: -0.05em; line-height: 0.9; color: #3F6E1C; width: 72px; flex: 0 0 auto")}>03</span><div><p style={css("margin: 0 0 6px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em")}>Nem betaling</p><p style={css("margin: 0; font-size: 17px; color: #B4C2D4")}>Du kan betale med MobilePay, kontant eller på faktura.</p></div></div>
</div>
</section>

{/* SPØRGSMÅL */}
<section id="spoergsmaal" style={css("padding: 96px 0; border-bottom: 1px solid #1C2F4A")}>
<p style={css("margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #C6E97A")}>Spørgsmål</p>
<h2 style={css("margin: 0 0 40px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; font-weight: 700; letter-spacing: -0.045em; color: #ffffff")}>Godt at vide</h2>
<div style={css("display: flex; flex-direction: column; gap: 10px")}>
{v.faqs.map((f, i_) => (<React.Fragment key={i_}>
<div style={css("background: #112440; border: 1px solid #1C2F4A; border-radius: 20px")}>
<h3 style={css("margin: 0")}>
<button type="button" onClick={f.toggle} aria-expanded={f.expanded} className="d-row" style={css("width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; background: transparent; border: 0; padding: 22px 24px; font-size: 19px; font-weight: 600; color: #ffffff; cursor: pointer; min-height: 68px")}>
<span>{f.q}</span>
<span style={css(f.iconStyle)}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
</button>
</h3>
{f.open && (<>
<p style={css("margin: 0; padding: 0 64px 24px 24px; font-size: 17px; color: #B4C2D4")}>{f.a}</p>
</>)}
</div>
</React.Fragment>))}
</div>
</section>

{/* KONTAKT */}
<section id="kontakt" style={css("padding: 96px 0 80px")}>
<p style={css("margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #C6E97A")}>Kontakt</p>
<h2 style={css("margin: 0 0 20px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; font-weight: 700; letter-spacing: -0.045em; color: #ffffff")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0 0 40px; font-size: 18px; color: #B4C2D4; max-width: 30em")}>Ring eller send en sms, så finder vi en tid, der passer. Eller udfyld formularen, så ringer jeg dig op.</p>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 20px")}>
<fieldset style={css("border: 0; margin: 0; padding: 0")}>
<legend style={css("font-size: 16px; font-weight: 600; color: #EAF0F7; margin-bottom: 12px; padding: 0")}>Hvad skal du have hjælp til?</legend>
<div style={css("display: flex; flex-wrap: wrap; gap: 8px")}>
{v.chips.map((c, i_) => (<React.Fragment key={i_}>
<button type="button" onClick={c.pick} aria-pressed={c.pressed} className="d-btn" style={css(c.style)}>{c.label}</button>
</React.Fragment>))}
</div>
</fieldset>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px")}>
<div style={css("display: flex; flex-direction: column; gap: 8px")}>
<label htmlFor="d-navn" style={css("font-size: 16px; font-weight: 600")}>Navn</label>
<input id="d-navn" name="navn" type="text" autoComplete="name" className="d-field" style={css("font-size: 18px; padding: 14px 18px; border-radius: 14px; border: 1px solid #22344F; background: #112440; color: #ffffff; min-height: 54px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 8px")}>
<label htmlFor="d-tlf" style={css("font-size: 16px; font-weight: 600")}>Telefon</label>
<input id="d-tlf" name="tlf" type="tel" autoComplete="tel" className="d-field" style={css("font-size: 18px; padding: 14px 18px; border-radius: 14px; border: 1px solid #22344F; background: #112440; color: #ffffff; min-height: 54px; box-sizing: border-box")} />
</div>
</div>
<div style={css("display: flex; flex-direction: column; gap: 8px")}>
<label htmlFor="d-besked" style={css("font-size: 16px; font-weight: 600")}>Besked <span style={css("font-weight: 400; color: #9FB0C6")}>(valgfrit)</span></label>
<textarea id="d-besked" name="besked" rows="3" className="d-field" style={css("font-size: 18px; padding: 14px 18px; border-radius: 14px; border: 1px solid #22344F; background: #112440; color: #ffffff; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<div style={css("display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px")}>
<button type="submit" className="d-btn" style={css("display: inline-flex; align-items: center; gap: 12px; background: #C6E97A; color: #0B1A2E; border: 0; border-radius: 999px; font-size: 18px; font-weight: 700; padding: 17px 28px; min-height: 56px; cursor: pointer")}>Send besked
<svg className="d-arrow" aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</button>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="d-ul" style={css("color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; overflow-wrap: anywhere")}>eller skriv til kontakt@hverdagshjaelpogit.dk</a>
</div>
<p style={css("margin: 0; font-size: 14px; color: #9FB0C6")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 16px; align-items: flex-start; background: #112440; border: 1px solid #1C2F4A; border-radius: 24px; padding: 32px")}>
<span style={css("width: 60px; height: 60px; border-radius: 999px; background: #C6E97A; color: #0B1A2E; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
<h3 style={css("margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.03em")}>Tak for din besked</h3>
<p style={css("margin: 0; font-size: 18px; color: #B4C2D4")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="d-btn" style={css("background: transparent; border: 1px solid #3E5A82; color: #ffffff; border-radius: 999px; font-size: 16px; font-weight: 600; padding: 12px 22px; min-height: 48px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</section>

</main>
</div>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #C9D5E5")}>
<a href="#top" onClick={v.nav.top} className="d-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: #ffffff; text-decoration: none; padding: 8px 0; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(42px, 6vw, 76px); line-height: 1; font-weight: 700; letter-spacing: -0.05em; color: #ffffff")}>Privatlivspolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 16px; color: #9FB0C6")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 36px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 36px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 36px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 36px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 36px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 36px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 600; color: #C6E97A")}>cookiepolitikken</a>.</p>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("padding: 56px 24px 96px")}>
<article style={css("max-width: 760px; margin: 0 auto; font-size: 18px; color: #C9D5E5")}>
<a href="#top" onClick={v.nav.top} className="d-ul" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: #ffffff; text-decoration: none; padding: 8px 0; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(42px, 6vw, 76px); line-height: 1; font-weight: 700; letter-spacing: -0.05em; color: #ffffff")}>Cookiepolitik</h1>
<p style={css("margin: 0 0 48px; font-size: 16px; color: #9FB0C6")}>Senest opdateret: oktober 2026</p>
<p style={css("margin: 0 0 40px; font-family: 'Space Grotesk', sans-serif; font-size: 26px; line-height: 1.3; font-weight: 600; letter-spacing: -0.02em; color: #C6E97A")}>Kort fortalt: Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 36px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 36px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 36px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 10px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600; color: #C6E97A")}>privatlivspolitikken</a>.</p>
</article>
</main>
</>)}

{/* FOOTER */}
<footer style={css("border-top: 1px solid #1C2F4A; padding: 0 0 32px; overflow: hidden")}>
<div aria-hidden="true" style={css("overflow: hidden; padding: 28px 0")}>
<div className="d-slow" style={css("display: flex; width: max-content")}>
{v.nameTicker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(56px, 9vw, 140px); font-weight: 700; letter-spacing: -0.05em; line-height: 1; color: #13294A; white-space: nowrap")}>{t}<span style={css("width: 18px; height: 18px; border-radius: 999px; background: #3F6E1C; display: inline-block")}></span></span>
</React.Fragment>))}
</div>
</div>
<div style={css("max-width: 1400px; margin: 0 auto; padding: 0 24px; display: flex; flex-wrap: wrap; gap: 16px 40px; justify-content: space-between; align-items: center; font-size: 15px; color: #9FB0C6")}>
<span>Sørens hverdagshjælp · IT &amp; hjemmeservice · Kerteminde og omegn · CVR 46656814</span>
<span style={css("display: flex; flex-wrap: wrap; gap: 8px 24px")}>
<a href="tel:+4522216814" className="d-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>22 21 68 14</a>
<a href="#top" onClick={v.showPrivacy} className="d-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} className="d-ul" style={css("color: #ffffff; text-decoration: none; padding: 6px 0")}>Cookiepolitik</a>
</span>
</div>
</footer>

{v.isCompact && (<>
<div style={css("height: 88px")}></div>
<a href="tel:+4522216814" style={css("position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 30; display: flex; align-items: center; justify-content: center; gap: 10px; background: #C6E97A; color: #0B1A2E; text-decoration: none; font-weight: 700; font-size: 18px; border-radius: 999px; min-height: 58px; box-shadow: 0 12px 30px rgba(0,0,0,0.4)")}>
<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring til Søren · 22 21 68 14
</a>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 3 – Mørk delt skærm';
export default Component;
