<script>
  import { goto } from '$app/navigation';

  let { href = '/' } = $props();
</script>

<button
  class="back-link"
  onclick={() => goto(href)}
  aria-label="Zurück zur Startseite"
>
  ← Zurück
</button>

<style>
  .back-link {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 14px;
    color: var(--color-gray);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-sm);
    z-index: 10;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--color-text);
  }
</style>
