<script>
  let { status = 'offen' } = $props();

  const config = {
    genommen: { label: '✓ genommen', bg: 'var(--color-success-light)', color: 'var(--color-success)' },
    offen: { label: 'offen', bg: 'var(--color-gray-light)', color: 'var(--color-gray)' },
    verpasst: { label: 'verpasst', bg: 'var(--color-danger-light)', color: 'var(--color-danger)' }
  };

  let cfg = $derived(config[status] ?? config.offen);
</script>

<span
  class="badge"
  style="background:{cfg.bg}; color:{cfg.color}"
  role="status"
  aria-label={`Status: ${cfg.label}`}
>
  {cfg.label}
</span>

<style>
  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
</style>
