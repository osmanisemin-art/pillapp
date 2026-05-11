<script>
  import { toastStore } from '$lib/stores/toast.js';
</script>

{#if $toastStore}
  <div class="toast" role="status" aria-live="polite">
    {$toastStore}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    font-size: 14px;
    z-index: 500;
    max-width: 90vw;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.25s ease-out;
  }
</style>
