import React from 'react';
import { createRoot } from 'react-dom/client';

// Enkel routing ud fra adressen:
//   /              → det første godkendte design
//   /forslag       → oversigt over de seks nye forslag
//   /forslag/1..6  → det enkelte forslag
const pages = {
  1: () => import('./forslag/F1.jsx'),
  2: () => import('./forslag/F2.jsx'),
  3: () => import('./forslag/F3.jsx'),
  4: () => import('./forslag/F4.jsx'),
  5: () => import('./forslag/F5.jsx'),
  6: () => import('./forslag/F6.jsx'),
};

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const m = path.match(/^\/forslag(?:\/(\d))?$/);

let load;
let title = 'Sørens hverdagshjælp · IT-hjælp og hjemmeservice i Kerteminde';
if (m && m[1] && pages[m[1]]) {
  load = pages[m[1]];
} else if (m) {
  load = () => import('./Overview.jsx');
  title = 'Designforslag til Sørens hverdagshjælp';
} else {
  load = () => import('./Original.jsx');
}

load().then((mod) => {
  const Page = mod.default;
  document.title = Page.title ? `${Page.title} · Sørens hverdagshjælp` : title;
  createRoot(document.getElementById('root')).render(<Page />);
});
