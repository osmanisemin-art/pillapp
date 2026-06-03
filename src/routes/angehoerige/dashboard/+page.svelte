<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import BottomTabBar from '$lib/components/BottomTabBar.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import PushNotification from '$lib/components/PushNotification.svelte';
  import MedikamentListe from '$lib/components/MedikamentListe.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import {
    einnahmen,
    person,
    eskalationStart,
    manuelMarkieren,
    undoBestaetigen,
    lastBestaetigt
  } from '$lib/stores/medikamente.js';
  import { showToast } from '$lib/stores/toast.js';
  import { browser } from '$app/environment';

  let showPush = $state(false);
  let anrufToast = $state(false);

  onMount(() => {
    if (browser) {
      const seen = sessionStorage.getItem('push_seen');
      if (!seen) {
        showPush = true;
        sessionStorage.setItem('push_seen', '1');
      }
    }
  });

  function handleAnruf() {
    showToast('Anruf wird simuliert… 📞');
  }

  function handleManuel(id) {
    manuelMarkieren(id);
    showToast('Einnahme manuell bestätigt ✓');
  }

  function handleUndo() {
    const lb = $lastBestaetigt;
    if (lb) {
      undoBestaetigen(lb.id);
      showToast('Bestätigung rückgängig gemacht');
    }
  }

  function getEskalationLabel() {
    const start = $eskalationStart;
    if (!start) return null;
    const min = Math.floor((Date.now() - start) / 60000);
    if (min >= 90) return `⚠️ Nicht bestätigt seit ${min} Min.`;
    return null;
  }

  let eskalationLabel = $derived(getEskalationLabel());
</script>

{#if showPush}
  <PushNotification onclose={() => showPush = false} />
{/if}

<main class="page">
  <BackLink />

  <div class="content">
    <header class="header">
      <h1 class="name">{$person.name}</h1>
      <p class="subtitle">Status heute</p>
      {#if eskalationLabel}
        <div class="eskalation-badge" role="alert" aria-live="assertive">
          <span>{eskalationLabel}</span>
          <button class="eskalation-anruf" onclick={handleAnruf} aria-label="Jetzt anrufen">
            📞 Jetzt anrufen
          </button>
        </div>
      {/if}
    </header>

    <section class="timeline-section" aria-label="Medikamenten-Timeline">
      <MedikamentListe einnahmen={$einnahmen} mode="angehoerige" />
    </section>

    <section class="manual-section" aria-label="Manuelle Aktionen">
      <h2 class="section-title">Manuelle Bestätigung</h2>
      {#each $einnahmen.filter(e => e.status === 'offen') as e (e.id)}
        <button
          class="manual-btn"
          onclick={() => handleManuel(e.id)}
          aria-label={`${e.name} manuell als genommen markieren`}
        >
          ✓ {e.name} manuell bestätigen
        </button>
      {/each}

      {#if $lastBestaetigt}
        <button
          class="undo-btn"
          onclick={handleUndo}
          aria-label="Letzte Bestätigung rückgängig machen"
        >
          ↩ Undo (letzte Bestätigung)
        </button>
      {/if}
    </section>

    <section class="actions">
      <button
        class="action-btn primary"
        onclick={handleAnruf}
        aria-label="Mama anrufen (Simulation)"
      >
        📞 {$person.name} anrufen
      </button>
      <button
        class="action-btn secondary"
        onclick={() => goto('/angehoerige/woche')}
        aria-label="Zur Wochenübersicht"
      >
        Woche ansehen
      </button>
    </section>
  </div>

  <BottomTabBar activeTab="heute" />
</main>

<style>
  .page {
    min-height: 100vh;
    max-width: 375px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: var(--color-bg);
    padding-bottom: 70px;
    position: relative;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 64px 16px 16px;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .name {
    font-size: 28px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 16px;
    color: var(--color-gray);
  }

  .eskalation-badge {
    margin-top: 8px;
    background: var(--color-danger-light);
    color: var(--color-danger);
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .eskalation-anruf {
    padding: 4px 10px;
    background: var(--color-danger);
    color: white;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .timeline-section {
    background: var(--color-gray-light);
    border-radius: var(--radius-md);
    padding: 16px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-gray);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .manual-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .manual-btn {
    padding: 12px 16px;
    background: var(--color-success-light);
    color: var(--color-success);
    border-radius: var(--radius-sm);
    font-size: 15px;
    font-weight: 500;
    text-align: left;
    width: 100%;
  }

  .undo-btn {
    padding: 10px 16px;
    background: var(--color-warning-light);
    color: var(--color-warning);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    width: 100%;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .action-btn {
    width: 100%;
    padding: 14px;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
  }

  .action-btn.primary {
    background: var(--color-primary);
    color: white;
  }

  .action-btn.secondary {
    background: var(--color-gray-light);
    color: var(--color-text);
  }
</style>
