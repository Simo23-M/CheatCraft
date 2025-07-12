<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { jsonContent } from '$lib/stores/cheatsheet';

  let editorContainer: HTMLDivElement;
  let editor: any = null;
  let monaco: any = null;

  onMount(() => {
    if (!browser) return;

    let unsubscribe: () => void;

    (async () => {
      try {
        // Dynamic import only in browser
        monaco = await import('monaco-editor');
        
        // Configure Monaco for web workers (optional but recommended)
        if (typeof window !== 'undefined') {
          (window as any).MonacoEnvironment = {
            getWorkerUrl: function (moduleId: string, label: string) {
              if (label === 'json') {
                return '/node_modules/monaco-editor/esm/vs/language/json/json.worker.js';
              }
              if (label === 'css' || label === 'scss' || label === 'less') {
                return '/node_modules/monaco-editor/esm/vs/language/css/css.worker.js';
              }
              if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return '/node_modules/monaco-editor/esm/vs/language/html/html.worker.js';
              }
              if (label === 'typescript' || label === 'javascript') {
                return '/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js';
              }
              return '/node_modules/monaco-editor/esm/vs/editor/editor.worker.js';
            }
          };
        }

        editor = monaco.editor.create(editorContainer, {
          value: $jsonContent,
          language: 'json',
          theme: 'vs-light',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 13,
          wordWrap: 'on',
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true
        });

        // Listen for content changes
        editor.onDidChangeModelContent(() => {
          jsonContent.set(editor.getValue());
        });

        // Subscribe to store changes
        unsubscribe = jsonContent.subscribe((content) => {
          if (editor && editor.getValue() !== content) {
            editor.setValue(content);
          }
        });
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  onDestroy(() => {
    if (editor) {
      editor.dispose();
    }
  });
</script>

{#if browser}
  <div bind:this={editorContainer} class="editor"></div>
{:else}
  <div class="editor-placeholder">
    <div class="loading">Loading editor...</div>
  </div>
{/if}

<style>
  .editor {
    height: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }

  .editor-placeholder {
    height: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
  }

  .loading {
    color: #666;
    font-style: italic;
  }
</style>