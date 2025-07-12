<script lang="ts">
    import CheatSheet from './CheatSheet.svelte';
    import ExportDropdown from './ExportDropdown.svelte';
    import { cheatsheetData, isValid } from '$lib/stores/cheatsheet';
  </script>
  
  <div class="preview-panel">
    <div class="preview-header">
      <h2>Live Preview</h2>
      <ExportDropdown />
    </div>
    <div class="preview-content">
      <div class="cheatsheet-preview">
        {#if $isValid && $cheatsheetData}
          <CheatSheet data={$cheatsheetData} />
        {:else}
          <div class="loading">
            {#if !$isValid}
              ❌ Please fix validation errors to see preview
            {:else}
              📝 Loading preview...
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .preview-panel {
      background: white;
      overflow-y: auto;
      position: relative;
    }
  
    .preview-header {
      position: sticky;
      top: 0;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
  
    .preview-content {
      padding: 20px;
      height: calc(100vh - 80px);
      overflow-y: auto;
    }
  
    .cheatsheet-preview {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
      font-size: 1.1rem;
    }
  </style>