<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/senior/erinnerung', { replaceState: true });
  });
</script>
