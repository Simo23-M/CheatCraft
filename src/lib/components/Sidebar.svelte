<script lang="ts">
	import TemplateSelector from './TemplateSelector.svelte';
	import ThemeSelector from './ThemeSelector.svelte';
	import JsonEditor from './JsonEditor.svelte';
	import ErrorMessage from './ErrorMessage.svelte';
	import { jsonContent, validationErrors } from '$lib/stores/cheatsheet';
	import { validateCheatSheet } from '$lib/utils/validation';
	import { exportAsJSON } from '$lib/utils/export';

	let fileInput: HTMLInputElement;

	const loadJsonFile = () => {
		fileInput.click();
	};

	const handleFileLoad = (event: Event): void => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				try {
					const content = e.target?.result as string;
					const data = JSON.parse(content);
					const errors = validateCheatSheet(data);
					if (errors.length === 0) {
						jsonContent.set(JSON.stringify(data, null, 2));
					} else {
						validationErrors.set(errors);
					}
				} catch (error) {
					validationErrors.set([{ message: 'Invalid JSON file' }]);
				}
			};
			reader.readAsText(file);
		}
	};

	const saveJson = () => {
		try {
			const data = JSON.parse($jsonContent);
			exportAsJSON(data);
		} catch (error) {
			validationErrors.set([{ message: 'Cannot save invalid JSON' }]);
		}
	};
</script>

<div class="sidebar">
	<div class="header">
		<h1>🚀 CheatCraft</h1>
		<p>Create beautiful cheat sheets with JSON</p>
	</div>

	<div class="section">
		<h3>📋 Templates</h3>
		<TemplateSelector />
	</div>

	<div class="section">
		<h3>🎨 Theme</h3>
		<ThemeSelector />
	</div>

	<div class="section">
		<h3>📝 JSON Editor</h3>
		<JsonEditor />
		<div class="btn-grid">
			<button class="btn btn-secondary" on:click={loadJsonFile}> 📂 Load JSON </button>
			<button class="btn btn-primary" on:click={saveJson}> 💾 Save JSON </button>
		</div>
		<ErrorMessage />
	</div>
</div>

<input
	bind:this={fileInput}
	type="file"
	accept=".json"
	style="display: none"
	on:change={handleFileLoad}
/>

<style>
	.sidebar {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.header {
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background: var(--primary-gradient, linear-gradient(135deg, #667eea, #764ba2));
		color: white;
	}

	.header h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 5px;
	}

	.header p {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	.section {
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.section h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 15px;
		color: #2c3e50;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.btn-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 15px;
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

	.btn-primary:hover {
		opacity: 0.9;
	}

	.btn-secondary {
		background: #f8f9fa;
		color: #333;
		border: 1px solid #e0e0e0;
	}

	.btn-secondary:hover {
		background: #e9ecef;
	}
</style>
