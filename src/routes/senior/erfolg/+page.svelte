<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { einnahmen, person, naechsteEinnahme } from '$lib/stores/medikamente.js';

  onMount(() => {
    const t = setTimeout(() => goto('/senior/ruhezustand'), 3000);
    return () => clearTimeout(t);
  });
</script>

<main
  class="page"
  onclick={() => goto('/senior/ruhezustand')}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && goto('/senior/ruhezustand')}
  aria-label="Tippen zum Weiterfahren zum Ruhezustand"
>
  <div class="content">
    <div class="success-circle" aria-hidden="true">✓</div>

    <h1 class="title">Super!</h1>

    <p class="subtitle">
      Heute {$person.name} erledigt.
    </p>

    <p class="notified" aria-live="polite">
      ✓ Deine Angehörige wurde benachrichtigt.
    </p>

    {#if $naechsteEinnahme}
      <p class="next-info">
        Nächste Einnahme: {$naechsteEinnahme.zeit} ({$naechsteEinnahme.name})
      </p>
    {:else}
      <p class="next-info all-done">
        Alle Einnahmen für heute erledigt! 🎉
      </p>
    {/if}

    <p class="tap-hint">Tippen zum Weiterfahren…</p>
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    background: #F0FBF5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
    max-width: 768px;
  }

  .success-circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: var(--color-success);
    color: white;
    font-size: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    box-shadow: 0 8px 32px rgba(29, 158, 117, 0.3);
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    color: var(--color-success);
  }

  .subtitle {
    font-size: 24px;
    color: var(--color-text);
  }

  .next-info {
    font-size: 18px;
    color: var(--color-gray);
  }

  .all-done {
    color: var(--color-success);
    font-weight: 600;
  }

  .notified {
    font-size: 18px;
    color: var(--color-success);
    font-weight: 500;
  }

  .tap-hint {
    font-size: 16px;
    color: var(--color-gray-light);
    margin-top: 16px;
  }
</style>
