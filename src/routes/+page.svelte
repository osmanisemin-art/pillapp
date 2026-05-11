<script>
  import { goto } from '$app/navigation';
  import { zuruecksetzen, darkMode } from '$lib/stores/medikamente.js';
  import { showToast } from '$lib/stores/toast.js';

  function handleZuruecksetzen() {
    zuruecksetzen();
    showToast('Demo zurückgesetzt ✓');
  }

  function toggleDark() {
    darkMode.update(v => !v);
  }
</script>

<main class="container">
  <header class="header">
    <h1 class="app-title">💊 PillenApp</h1>
    <p class="app-subtitle">Medikamenten-Koordination für pflegende Angehörige</p>
    <button class="dark-toggle" onclick={toggleDark} aria-label="Dark Mode umschalten">
      {$darkMode ? '☀️ Hell' : '🌙 Dunkel'}
    </button>
  </header>

  <section class="cards">
    <button
      class="card card-senior"
      onclick={() => goto('/senior/erinnerung')}
      aria-label="Senior:innen-Ansicht öffnen"
    >
      <span class="card-icon">👵</span>
      <div class="card-content">
        <h2 class="card-title">Senior:innen-Ansicht</h2>
        <p class="card-desc">Tablet-Ansicht für die Medikamenten-Bestätigung</p>
      </div>
      <span class="card-arrow" aria-hidden="true">→</span>
    </button>

    <button
      class="card card-angehoerige"
      onclick={() => goto('/angehoerige/dashboard')}
      aria-label="Angehörigen-Ansicht öffnen"
    >
      <span class="card-icon">👨‍👩‍👧</span>
      <div class="card-content">
        <h2 class="card-title">Angehörigen-Ansicht</h2>
        <p class="card-desc">Handy-Dashboard für pflegende Angehörige</p>
      </div>
      <span class="card-arrow" aria-hidden="true">→</span>
    </button>
  </section>

  <button class="reset-btn" onclick={handleZuruecksetzen} aria-label="Demo zurücksetzen">
    Demo zurücksetzen
  </button>
</main>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    gap: 32px;
    max-width: 500px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .app-title {
    font-size: 36px;
    font-weight: 700;
  }

  .app-subtitle {
    font-size: 16px;
    color: var(--color-text-secondary);
    max-width: 300px;
    text-align: center;
  }

  .dark-toggle {
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    background: var(--color-gray-light);
    color: var(--color-text);
    font-size: 14px;
    font-weight: 500;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px 20px;
    border-radius: var(--radius-lg);
    text-align: left;
    width: 100%;
    transition: transform 0.1s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .card:active {
    transform: translateY(0);
  }

  .card-senior {
    background: var(--color-success-light);
  }

  .card-angehoerige {
    background: var(--color-primary-light);
  }

  .card-icon {
    font-size: 40px;
    flex-shrink: 0;
  }

  .card-content {
    flex: 1;
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--color-text);
  }

  .card-desc {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .card-arrow {
    font-size: 24px;
    color: var(--color-text-secondary);
  }

  .reset-btn {
    font-size: 14px;
    color: var(--color-gray);
    padding: 8px 16px;
    border: 1px solid var(--color-gray-light);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
  }

  .reset-btn:hover {
    background: var(--color-gray-light);
  }
</style>
