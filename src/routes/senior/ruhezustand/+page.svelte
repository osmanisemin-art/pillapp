<script>
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import MedikamentListe from '$lib/components/MedikamentListe.svelte';
  import { einnahmen, person, naechsteEinnahme } from '$lib/stores/medikamente.js';

  let uhrzeit = $state('');
  let interval;

  function updateUhrzeit() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    uhrzeit = `${h}:${m}`;
  }

  onMount(() => {
    updateUhrzeit();
    interval = setInterval(updateUhrzeit, 10000);
  });

  onDestroy(() => clearInterval(interval));

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Guten Morgen 🌅';
    if (h < 17) return 'Guten Tag ☀️';
    return 'Guten Abend 🌙';
  }
</script>

<main class="page">
  <BackLink />

  <div class="content">
    <h1 class="title">Heute</h1>

    <div class="status-box" aria-label="Medikamenten-Status">
      <MedikamentListe einnahmen={$einnahmen} mode="senior" />
    </div>

    <div class="greeting-box" aria-hidden="true">
      <p class="greeting">{getGreeting()}</p>
      <p class="person-name">{$person.name}, {$person.alter} Jahre</p>
    </div>

    <p class="uhrzeit" aria-label={`Aktuelle Zeit: ${uhrzeit}`}>{uhrzeit}</p>

    {#if $naechsteEinnahme}
      <button
        class="next-btn"
        onclick={() => goto('/senior/erinnerung')}
        aria-label={`Zur nächsten Einnahme: ${$naechsteEinnahme.name} um ${$naechsteEinnahme.zeit}`}
      >
        Zur nächsten Einnahme →
      </button>
    {:else}
      <p class="all-done" role="status" aria-live="polite">
        ✓ Alle Einnahmen erledigt!
      </p>
    {/if}
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 80px 32px 32px;
    position: relative;
    background: var(--color-bg);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 768px;
    width: 100%;
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    color: var(--color-text);
  }

  .status-box {
    background: var(--color-gray-light);
    border-radius: var(--radius-md);
    padding: 24px;
  }

  .greeting-box {
    background: var(--color-success-light);
    border-radius: var(--radius-md);
    padding: 24px 32px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
  }

  .greeting {
    font-size: 32px;
    font-weight: 600;
    color: var(--color-success);
  }

  .person-name {
    font-size: 20px;
    color: var(--color-text-secondary);
  }

  .uhrzeit {
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text);
    font-variant-numeric: tabular-nums;
  }

  .next-btn {
    padding: 20px 32px;
    background: var(--color-primary);
    color: white;
    font-size: 28px;
    font-weight: 600;
    border-radius: var(--radius-md);
    width: 100%;
    transition: opacity 0.2s, transform 0.1s;
  }

  .next-btn:hover {
    opacity: 0.9;
  }

  .next-btn:active {
    transform: scale(0.98);
  }

  .all-done {
    font-size: 28px;
    color: var(--color-success);
    font-weight: 600;
    text-align: center;
    padding: 20px;
    background: var(--color-success-light);
    border-radius: var(--radius-md);
  }
</style>
