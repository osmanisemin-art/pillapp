<script>
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import { naechsteEinnahme, eskalationStart, startEskalation } from '$lib/stores/medikamente.js';

  let elapsed = $state(0);
  let stufe = $state(0);
  let interval;

  function berechneStufe(ms) {
    if (!ms) return 0;
    const min = (Date.now() - ms) / 60000;
    if (min >= 90) return 3;
    if (min >= 60) return 2;
    if (min >= 30) return 1;
    return 0;
  }

  onMount(() => {
    startEskalation();
    interval = setInterval(() => {
      const start = $eskalationStart;
      if (start) {
        elapsed = Math.floor((Date.now() - start) / 60000);
        stufe = berechneStufe(start);
      }
    }, 10000);
  });

  onDestroy(() => clearInterval(interval));
</script>

<main
  class="page"
  class:stufe1={stufe >= 1}
  class:stufe2={stufe >= 2}
  aria-live="polite"
>
  <BackLink />

  <div class="content">
    <span
      class="clock-icon"
      class:pulsing={stufe >= 1}
      aria-hidden="true"
    >⏰</span>

    {#if $naechsteEinnahme}
      <h1 class="title" class:big={stufe >= 1}>
        Zeit für die<br/>{$naechsteEinnahme.name}-Pillen
      </h1>
      <p class="dosis">{$naechsteEinnahme.dosis}</p>
    {:else}
      <h1 class="title">Alle Pillen für heute erledigt! 🎉</h1>
    {/if}

    {#if elapsed > 0}
      <p class="elapsed" class:warning={stufe >= 3}>
        {#if stufe >= 3}
          ⚠️ Nicht bestätigt seit {elapsed} Min.
        {:else}
          Erinnerung aktiv seit {elapsed} Min.
        {/if}
      </p>
    {/if}

    {#if $naechsteEinnahme}
      <button
        class="open-btn"
        onclick={() => goto('/senior/bestaetigung')}
        aria-label={`Einnahme ${$naechsteEinnahme.name} bestätigen`}
      >
        Pillen nehmen
      </button>
    {:else}
      <button
        class="open-btn secondary"
        onclick={() => goto('/')}
        aria-label="Zur Startseite"
      >
        Zur Startseite
      </button>
    {/if}
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    background: var(--color-warning-light);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 32px 32px;
    position: relative;
    transition: background 0.5s;
  }

  .page.stufe2 {
    background: #FFE4C4;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 768px;
    width: 100%;
    text-align: center;
  }

  .clock-icon {
    font-size: 100px;
    display: block;
    line-height: 1;
  }

  .clock-icon.pulsing {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .title {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text);
    transition: font-size 0.3s;
  }

  .title.big {
    font-size: 48px;
  }

  .dosis {
    font-size: 28px;
    color: var(--color-text-secondary);
  }

  .elapsed {
    font-size: 20px;
    color: var(--color-warning);
    font-weight: 500;
  }

  .elapsed.warning {
    color: var(--color-danger);
    font-weight: 700;
    font-size: 22px;
  }

  .open-btn {
    width: 350px;
    max-width: 100%;
    height: 80px;
    background: var(--color-success);
    color: white;
    font-size: 32px;
    font-weight: 700;
    border-radius: var(--radius-md);
    transition: opacity 0.2s, transform 0.1s;
  }

  .open-btn:hover {
    opacity: 0.9;
  }

  .open-btn:active {
    transform: scale(0.97);
  }

  .open-btn.secondary {
    background: var(--color-primary);
  }
</style>
