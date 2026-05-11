import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { defaultEinnahmen, defaultWochenHistorie, defaultPerson } from '$lib/data/dummy.js';

function load(key, fallback) {
  if (!browser) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key, store) {
  if (browser) {
    store.subscribe(value => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    });
  }
  return store;
}

export const einnahmen = persist(
  'pillenapp_einnahmen',
  writable(load('pillenapp_einnahmen', defaultEinnahmen))
);

export const wochenHistorie = persist(
  'pillenapp_woche',
  writable(load('pillenapp_woche', defaultWochenHistorie))
);

export const person = writable(defaultPerson);

export const eskalationStart = persist(
  'pillenapp_eskalation',
  writable(load('pillenapp_eskalation', null))
);

export const lastBestaetigt = writable(null);
export const darkMode = persist(
  'pillenapp_dark',
  writable(load('pillenapp_dark', false))
);

export const naechsteEinnahme = derived(einnahmen, $e =>
  $e.find(e => e.status === 'offen') ?? null
);

export function bestaetigen(id) {
  const now = new Date();
  const zeit = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  einnahmen.update(liste =>
    liste.map(e => e.id === id ? { ...e, status: 'genommen', bestaetigt_um: zeit } : e)
  );

  lastBestaetigt.set({ id, zeit });
  eskalationStart.set(null);

  setTimeout(() => lastBestaetigt.set(null), 30000);
}

export function undoBestaetigen(id) {
  einnahmen.update(liste =>
    liste.map(e => e.id === id ? { ...e, status: 'offen', bestaetigt_um: null } : e)
  );
  lastBestaetigt.set(null);
}

export function manuelMarkieren(id) {
  bestaetigen(id);
}

export function zuruecksetzen() {
  einnahmen.set(defaultEinnahmen.map(e => ({ ...e, status: 'offen', bestaetigt_um: null })));
  eskalationStart.set(null);
  lastBestaetigt.set(null);
}

export function startEskalation() {
  const current = get(eskalationStart);
  if (!current) {
    eskalationStart.set(Date.now());
  }
}

export function getEskalationsstufe() {
  const start = get(eskalationStart);
  if (!start) return 0;
  const minutes = (Date.now() - start) / 60000;
  if (minutes >= 90) return 3;
  if (minutes >= 60) return 2;
  if (minutes >= 30) return 1;
  return 0;
}

export function getElapsedMinutes() {
  const start = get(eskalationStart);
  if (!start) return 0;
  return Math.floor((Date.now() - start) / 60000);
}

export function einnahmeHinzufuegen(einnahme) {
  einnahmen.update(liste => {
    const maxId = liste.reduce((max, e) => Math.max(max, e.id), 0);
    return [...liste, { ...einnahme, id: maxId + 1, status: 'offen', bestaetigt_um: null }];
  });
}

export function einnahmeBearbeiten(id, updates) {
  einnahmen.update(liste =>
    liste.map(e => e.id === id ? { ...e, ...updates } : e)
  );
}

export function einnahmeLoeschen(id) {
  einnahmen.update(liste => liste.filter(e => e.id !== id));
}
