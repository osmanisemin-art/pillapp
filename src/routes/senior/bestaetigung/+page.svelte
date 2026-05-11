<script>
  import { goto } from '$app/navigation';
  import BackLink from '$lib/components/BackLink.svelte';
  import { naechsteEinnahme, bestaetigen } from '$lib/stores/medikamente.js';
  import { showToast } from '$lib/stores/toast.js';

  let bestaetigt = $state(false);

  function handleBestaetigen() {
    const naechste = $naechsteEinnahme;
    if (naechste && !bestaetigt) {
      bestaetigt = true;
      bestaetigen(naechste.id);
      showToast('Einnahme bestätigt ✓');
      goto('/senior/erfolg');
    }
  }
</script>

<main class="page">
  <BackLink />

  <div class="content">
    {#if $naechsteEinnahme}
      <p class="label">Ihre {$naechsteEinnahme.name}-Pillen:</p>
      <p class="dosis">{$naechsteEinnahme.dosis}</p>

      <button
        class="confirm-btn"
        onclick={handleBestaetigen}
        disabled={bestaetigt}
        aria-label={`Einnahme ${$naechsteEinnahme.name} als genommen markieren`}
      >
        <span class="checkmark" aria-hidden="true">✓</span>
        <span class="btn-text">GENOMMEN</span>
      </button>

      <p class="hint" aria-live="polite">
        Tippen Sie nach der Einnahme auf den grünen Kreis
      </p>
    {:else}
      <p class="label">Alle Pillen für heute erledigt! 🎉</p>
      <button class="back-home" onclick={() => goto('/')}>Zur Startseite</button>
    {/if}
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 32px 32px;
    position: relative;
    background: var(--color-bg);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    max-width: 768px;
    width: 100%;
    text-align: center;
  }

  .label {
    font-size: 24px;
    color: var(--color-text);
  }

  .dosis {
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text);
  }

  .confirm-btn {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: var(--color-success);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.15s, opacity 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 32px rgba(29, 158, 117, 0.3);
  }

  .confirm-btn:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 40px rgba(29, 158, 117, 0.4);
  }

  .confirm-btn:active {
    transform: scale(0.96);
  }

  .confirm-btn:disabled {
    opacity: 0.6;
  }

  .checkmark {
    font-size: 80px;
    line-height: 1;
    font-weight: 700;
  }

  .btn-text {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .hint {
    font-size: 18px;
    color: var(--color-gray);
    max-width: 360px;
  }

  .back-home {
    padding: 16px 32px;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 24px;
  }
</style>
