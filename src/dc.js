import React from 'react';

// Basisklasse for designforslagene. Logikken fra lærredet (state, renderVals osv.)
// er bevaret uændret og kører som en almindelig React-komponent.
export class DCLogic extends React.Component {}

// Konverterer en CSS-tekst ("display: flex; gap: 8px") til et React style-objekt.
const cache = new Map();
export function css(text) {
  if (!text) return undefined;
  if (cache.has(text)) return cache.get(text);
  const out = {};
  text.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    let key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (prop.startsWith('-webkit-')) key = 'Webkit' + prop.slice(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = val;
  });
  cache.set(text, out);
  return out;
}
