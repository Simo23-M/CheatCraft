<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import PreviewPanel from '$lib/components/PreviewPanel.svelte';
</script>

<svelte:head>
  <title>CheatCraft - Create Beautiful Cheat Sheets</title>
  <meta name="description" content="Create beautiful, shareable cheat sheets with JSON" />
</svelte:head>

<div class="app">
  <Sidebar />
  <PreviewPanel />
</div>

<style>
  .app {
    display: grid;
    grid-template-columns: 400px 1fr;
    height: 100vh;
    gap: 0;
  }

  @media (max-width: 768px) {
    .app {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
  }
</style>