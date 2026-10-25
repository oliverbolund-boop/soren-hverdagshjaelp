// Indhold til siden. Ret tekster og priser her.

export const groups = [
  {
    eyebrowText: 'IT-hjælp', title: 'Computer, wifi og telefon', price: '350 kr.', note: '',
    panelBg: '#142A4A', panelInk: '#ffffff', eyebrow: '#B9D79A', waveFill: '#1E3A64', waveLine: '#3F6E1C',
    tint: '#EAF0F7', ink: '#1E3A64',
    items: [
      { isWifi: true, title: 'PC & wifi', text: 'Når computeren er langsom, printeren ikke vil, eller wifi’en falder ud i stuen.', examples: ['Opsætning af ny computer', 'Wifi og router', 'Printer, mail og opdateringer'] },
      { isPhone: true, title: 'iPhone & iPad', text: 'Jeg hjælper dig godt i gang med telefonen eller tabletten og får styr på det, der driller.', examples: ['Opsætning og flytning af billeder', 'MitID, apps og MobilePay', 'Videoopkald med familien'] },
    ],
  },
  {
    eyebrowText: 'Hjemmeservice', title: 'Praktisk hjælp i hjemmet', price: '500 kr.', note: 'Kørsel uden for området efter aftale',
    panelBg: '#3F6E1C', panelInk: '#ffffff', eyebrow: '#DDEBCF', waveFill: '#2F5715', waveLine: '#1E3A64',
    tint: '#EEF4E7', ink: '#3F6E1C',
    items: [
      { isFurniture: true, title: 'Samling af møbler', text: 'Reolen, sengen eller kommoden fra papkassen, samlet og stillet på plads.', examples: ['Flatpack-møbler', 'Haveborde og -stole', 'Bortskaffelse af emballage'] },
      { isShopping: true, title: 'Indkøb af dagligvarer', text: 'Har du svært ved at komme ud, handler jeg ind for dig og bærer varerne ind.', examples: ['Fast ugentlig tur', 'Enkelte indkøb', 'Afhentning af pakker'] },
      { isLamp: true, title: 'Ophæng af hylder og lamper', text: 'Det, der skal op at hænge, hænger jeg lige og solidt op.', examples: ['Hylder og billeder', 'Lamper og gardiner', 'Tv på væggen'] },
    ],
  },
];

export const faqItems = [
  { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
  { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
  { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
  { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
  { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' },
];

export const chipLabels = ['PC & wifi', 'iPhone & iPad', 'Møbler', 'Indkøb', 'Ophæng', 'Andet'];
