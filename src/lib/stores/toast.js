import { writable } from 'svelte/store';

export const toastStore = writable(null);

export function showToast(message, duration = 3000) {
  toastStore.set(message);
  setTimeout(() => toastStore.set(null), duration);
}
