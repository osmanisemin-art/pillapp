<script>
  import StatusBadge from './StatusBadge.svelte';

  let { einnahmen = [], mode = 'senior' } = $props();
</script>

{#if mode === 'senior'}
  <ul class="senior-liste" aria-label="Medikamenten-Status heute">
    {#each einnahmen as e (e.id)}
      <li class="senior-item">
        <span
          class="kreis"
          class:done={e.status === 'genommen'}
          aria-hidden="true"
        >
          {#if e.status === 'genommen'}✓{/if}
        </span>
        <span class="senior-text" class:done={e.status === 'genommen'}>
          {e.name}
          {#if e.status === 'genommen'}
            <span class="zeit">{e.bestaetigt_um} — erledigt</span>
          {:else}
            <span class="zeit">{e.zeit}</span>
          {/if}
        </span>
      </li>
    {/each}
  </ul>
{:else}
  <ul class="angehoerige-liste" aria-label="Timeline Medikamente heute">
    {#each einnahmen as e (e.id)}
      <li class="timeline-item">
        <span
          class="dot"
          class:done={e.status === 'genommen'}
          aria-hidden="true"
        ></span>
        <span class="timeline-content">
          <span class="timeline-zeit">{e.zeit}</span>
          <span class="timeline-name">{e.name}</span>
        </span>
        <StatusBadge status={e.status} />
      </li>
    {/each}
  </ul>
{/if}

<style>
  /* Senior */
  .senior-liste {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .senior-item {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .kreis {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid var(--color-gray-light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-bg);
    flex-shrink: 0;
    background: transparent;
  }

  .kreis.done {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  .senior-text {
    font-size: 24px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    color: var(--color-text-secondary);
  }

  .senior-text.done {
    color: var(--color-success);
    font-weight: 600;
  }

  .zeit {
    font-size: 18px;
    color: var(--color-gray);
    font-weight: normal;
  }

  /* Angehörige */
  .angehoerige-liste {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .timeline-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-gray-light);
    flex-shrink: 0;
  }

  .dot.done {
    background: var(--color-success);
  }

  .timeline-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .timeline-zeit {
    font-size: 12px;
    color: var(--color-gray);
  }

  .timeline-name {
    font-size: 16px;
    font-weight: 500;
  }
</style>
