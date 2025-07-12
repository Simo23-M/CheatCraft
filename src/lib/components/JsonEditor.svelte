<script lang="ts">
  import { onMount } from 'svelte';
  import { jsonContent } from '$lib/stores/cheatsheet';

  let textareaElement: HTMLTextAreaElement;
  let localValue: string = $jsonContent;

  onMount(() => {
    // Auto-resize textarea
    const autoResize = () => {
      if (textareaElement) {
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    };

    textareaElement.addEventListener('input', autoResize);
    autoResize();

    return () => {
      textareaElement?.removeEventListener('input', autoResize);
    };
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    localValue = target.value;
    jsonContent.set(localValue);
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(localValue);
      const formatted = JSON.stringify(parsed, null, 2);
      localValue = formatted;
      jsonContent.set(formatted);
      if (textareaElement) {
        textareaElement.value = formatted;
        // Trigger resize
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    } catch (error) {
      alert('Invalid JSON - cannot format');
    }
  };

  // Subscribe to store changes
  $: if (textareaElement && $jsonContent !== localValue) {
    localValue = $jsonContent;
    textareaElement.value = localValue;
    // Auto-resize after update
    setTimeout(() => {
      if (textareaElement) {
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    }, 0);
  }
</script>

<div class="editor-container">
  <div class="editor-header">
    <button class="format-btn" on:click={formatJSON}>
      ✨ Format JSON
    </button>
  </div>
  <textarea
    bind:this={textareaElement}
    class="json-textarea"
    value={localValue}
    on:input={handleInput}
    placeholder="Enter your JSON here..."
    spellcheck="false"
  ></textarea>
</div>

<style>
  .editor-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }

  .editor-header {
    background: #f8f9fa;
    padding: 8px 12px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
  }

  .format-btn {
    background: var(--primary-color, #667eea);
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .format-btn:hover {
    opacity: 0.8;
  }

  .json-textarea {
    width: 100%;
    min-height: 300px;
    border: none;
    padding: 15px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.5;
    background: white;
    color: #333;
    resize: none;
    outline: none;
    overflow-y: auto;
  }

  .json-textarea:focus {
    background: #fafafa;
  }
</style>