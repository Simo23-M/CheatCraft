<script lang="ts">
  import { cheatsheetData, currentTheme } from '$lib/stores/cheatsheet';
  import { exportAsHTML, exportAsJSON, exportAsPDF } from '$lib/utils/export';

  let showDropdown = false;

  const toggleDropdown = () => {
    console.log('Export dropdown toggled');
    showDropdown = !showDropdown;
  };

  const closeDropdown = () => {
    console.log('Export dropdown closed');
    showDropdown = false;
  };

  const handleExport = (type: 'html' | 'json' | 'pdf') => {
    console.log('Export clicked:', type);
    console.log('Cheatsheet data:', $cheatsheetData);
    console.log('Current theme:', $currentTheme);
    
    if (!$cheatsheetData) {
      console.error('No cheatsheet data available');
      alert('No cheatsheet data available for export');
      return;
    }
    
    closeDropdown();
    
    try {
      switch (type) {
        case 'html':
          console.log('Exporting as HTML...');
          exportAsHTML($cheatsheetData, $currentTheme);
          console.log('HTML export completed');
          break;
        case 'json':
          console.log('Exporting as JSON...');
          exportAsJSON($cheatsheetData);
          console.log('JSON export completed');
          break;
        case 'pdf':
          console.log('Exporting as PDF...');
          exportAsPDF($cheatsheetData, $currentTheme);
          console.log('PDF export completed');
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
      if (error instanceof Error) {
        alert(`Export failed: ${error.message}`);
      } else {
        alert('Export failed due to an unknown error');
      }
    }
  };
</script>

<div class="export-dropdown">
  <button 
    class="btn btn-primary" 
    on:click={toggleDropdown}
    disabled={!$cheatsheetData}
  >
    📤 Export ▼
  </button>
  
  {#if showDropdown}
    <div class="dropdown-content">
      <button 
        class="dropdown-item" 
        on:click={() => handleExport('html')}
      >
        📄 Export as HTML
      </button>
      <button 
        class="dropdown-item" 
        on:click={() => handleExport('json')}
      >
        📋 Export as JSON
      </button>
      <button 
        class="dropdown-item" 
        on:click={() => handleExport('pdf')}
      >
        📑 Export as PDF
      </button>
    </div>
  {/if}
</div>

<!-- Close dropdown when clicking outside -->
{#if showDropdown}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="dropdown-overlay" on:click={closeDropdown}></div>
{/if}

<style>
  .export-dropdown {
    position: relative;
    display: inline-block;
  }

  .btn {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: var(--primary-color, #667eea);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dropdown-content {
    position: absolute;
    right: 0;
    top: 100%;
    background: white;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    z-index: 1000;
    overflow: hidden;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: left;
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background: #f8f9fa;
  }

  .dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
</style>