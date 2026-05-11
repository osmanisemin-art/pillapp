<script>
  import '../app.css';
  import Toast from '$lib/components/Toast.svelte';
  import { darkMode } from '$lib/stores/medikamente.js';
  import { browser } from '$app/environment';

  $effect(() => {
    if (browser) {
      document.documentElement.classList.toggle('dark', $darkMode);
    }
  });
</script>

<slot />
<Toast />
