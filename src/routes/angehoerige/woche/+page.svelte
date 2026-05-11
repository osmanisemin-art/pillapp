<script>
  import BackLink from '$lib/components/BackLink.svelte';
  import BottomTabBar from '$lib/components/BottomTabBar.svelte';
  import { wochenHistorie, person } from '$lib/stores/medikamente.js';

  const tage = [
    { key: 'mo', label: 'Mo' },
    { key: 'di', label: 'Di' },
    { key: 'mi', label: 'Mi' },
    { key: 'do', label: 'Do' },
    { key: 'fr', label: 'Fr' },
    { key: 'sa', label: 'Sa' },
    { key: 'so', label: 'So' }
  ];

  let erledigt = $derived(
    Object.values($wochenHistorie).filter(v => v === 'erledigt').length
  );
</script>

<main class="page">
  <BackLink />

  <div class="content">
    <header class="header">
      <h1 class="title">{$person.name} — diese Woche</h1>
    </header>

    <section class="woche" aria-label="Wochenübersicht">
      {#each tage as tag (tag.key)}
        {@const status = $wochenHistorie[tag.key]}
        <div class="tag-col">
          <span class="tag-label">{tag.label}</span>
          <div
            class="tag-icon"
            class:done={status === 'erledigt'}
            class:heute={status === 'heute'}
            class:verpasst={status === 'verpasst'}
            role="img"
            aria-label={`${tag.label}: ${status}`}
          >
            {#if status === 'erledigt'}
              <span class="check" aria-hidden="true">✓</span>
            {:else if status === 'heute'}
              <span class="dot-heute" aria-hidden="true"></span>
            {:else if status === 'verpasst'}
              <span class="x-mark" aria-hidden="true">✕</span>
            {/if}
          </div>
        </div>
      {/each}
    </section>

    <div class="statistik" aria-live="polite" role="status">
      <span class="stat-label">Diese Woche:</span>
      <span class="stat-value">{erledigt}/7 Tage erledigt</span>
    </div>

    <div class="progress-bar" aria-hidden="true">
      <div class="progress-fill" style="width: {(erledigt / 7) * 100}%"></div>
    </div>
  </div>

  <BottomTabBar activeTab="woche" />
</main>

<style>
  .page {
    min-height: 100vh;
    max-width: 375px;
    margin: 0 auto;
    background: var(--color-bg);
    padding-bottom: 70px;
    position: relative;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 64px 16px 16px;
  }

  .title {
    font-size: 22px;
    font-weight: 700;
  }

  .woche {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 4px;
  }

  .tag-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .tag-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .tag-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid var(--color-gray-light);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    position: relative;
  }

  .tag-icon.done {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  .tag-icon.verpasst {
    background: var(--color-danger);
    border-color: var(--color-danger);
  }

  .tag-icon.heute {
    border-color: var(--color-warning);
    animation: pulseDot 1.5s ease-in-out infinite;
  }

  .check {
    color: white;
    font-size: 16px;
    font-weight: 700;
  }

  .x-mark {
    color: white;
    font-size: 14px;
    font-weight: 700;
  }

  .dot-heute {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-warning);
  }

  .statistik {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
  }

  .stat-label {
    color: var(--color-text-secondary);
  }

  .stat-value {
    font-weight: 700;
    color: var(--color-success);
    font-size: 18px;
  }

  .progress-bar {
    height: 8px;
    background: var(--color-gray-light);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--color-success);
    border-radius: 4px;
    transition: width 0.5s ease;
  }
</style>
