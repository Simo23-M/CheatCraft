<script lang="ts">
  import { currentTemplate, loadTemplate } from '$lib/stores/cheatsheet';
  import { templates } from '$lib/utils/templates';

  const selectTemplate = (templateId: string) => {
    console.log('Template button clicked:', templateId);
    try {
      loadTemplate(templateId);
      console.log('Template loaded successfully:', templateId);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };
</script>

<div class="template-grid">
  {#each Object.entries(templates) as [templateId, template]}
    <button
      class="template-btn"
      class:active={$currentTemplate === templateId}
      on:click={() => selectTemplate(templateId)}
    >
      {template.icon} {template.name}
    </button>
  {/each}
</div>

<style>
  .template-grid {
    display: grid;
    gap: 10px;
    margin-bottom: 15px;
  }

  .template-btn {
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    font-size: 0.9rem;
  }

  .template-btn:hover {
    border-color: var(--primary-color, #667eea);
    background: #f8f9ff;
  }

  .template-btn.active {
    border-color: var(--primary-color, #667eea);
    background: var(--primary-color, #667eea);
    color: white;
  }
</style>