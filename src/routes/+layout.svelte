<script lang="ts">
    import '../styles/global.css';
    import { onMount } from 'svelte';
    import { autoLoad, autoSave } from '$lib/stores/cheatsheet';
  
    onMount(() => {
      autoLoad();
      autoSave();
    });
  </script>
  
  <main>
    <slot />
  </main>