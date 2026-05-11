<script>
  import { goto } from '$app/navigation';

  let { activeTab = 'heute' } = $props();
</script>

<nav class="tab-bar" aria-label="Navigation">
  <button
    class="tab"
    class:active={activeTab === 'heute'}
    onclick={() => goto('/angehoerige/dashboard')}
    aria-label="Heute – Tagesstatus"
    aria-current={activeTab === 'heute' ? 'page' : undefined}
  >
    <span class="tab-icon">📊</span>
    <span class="tab-label">Heute</span>
  </button>

  <button
    class="tab"
    class:active={activeTab === 'woche'}
    onclick={() => goto('/angehoerige/woche')}
    aria-label="Woche – Wochenübersicht"
    aria-current={activeTab === 'woche' ? 'page' : undefined}
  >
    <span class="tab-icon">📅</span>
    <span class="tab-label">Woche</span>
  </button>

  <button
    class="tab"
    class:active={activeTab === 'einstellungen'}
    onclick={() => goto('/angehoerige/einstellungen')}
    aria-label="Einstellungen"
    aria-current={activeTab === 'einstellungen' ? 'page' : undefined}
  >
    <span class="tab-icon">⚙️</span>
    <span class="tab-label">Einstellungen</span>
  </button>
</nav>

<style>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: var(--color-bg);
    border-top: 1px solid var(--color-gray-light);
    z-index: 100;
    max-width: 375px;
    margin: 0 auto;
  }

  .tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 8px;
    gap: 2px;
    color: var(--color-gray);
    font-size: 12px;
    border-bottom: 3px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .tab.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }

  .tab-icon {
    font-size: 20px;
  }

  .tab-label {
    font-size: 11px;
  }
</style>
