<script>
  let { onclose } = $props();
</script>

<div
  class="overlay"
  onclick={onclose}
  role="dialog"
  aria-modal="true"
  aria-label="Push-Benachrichtigung"
>
  <div
    class="banner"
    onclick={(e) => e.stopPropagation()}
    role="alert"
  >
    <div class="banner-header">
      <span class="app-icon" aria-hidden="true">✓</span>
      <span class="app-name">PillenApp</span>
      <button class="close-btn" onclick={onclose} aria-label="Benachrichtigung schliessen">✕</button>
    </div>
    <p class="banner-message">Mama hat ihre Pillen genommen ✓</p>
    <p class="banner-time">vor 2 Minuten</p>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .banner {
    background: var(--color-bg);
    margin-top: 60px;
    width: calc(100% - 32px);
    max-width: 343px;
    border-radius: var(--radius-md);
    padding: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideDown 0.3s ease-out;
  }

  .banner-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .app-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-success);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    flex-shrink: 0;
  }

  .app-name {
    font-weight: 700;
    font-size: 14px;
    flex: 1;
  }

  .close-btn {
    color: var(--color-gray);
    font-size: 16px;
    padding: 4px;
  }

  .banner-message {
    font-size: 15px;
    color: var(--color-text);
    margin-bottom: 4px;
  }

  .banner-time {
    font-size: 12px;
    color: var(--color-gray);
  }
</style>
