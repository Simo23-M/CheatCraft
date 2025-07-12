<script lang="ts">
	import { currentTheme } from '$lib/stores/cheatsheet';
	import { themes, applyTheme } from '$lib/utils/themes';
	import type { Theme } from '$lib/types';

	$: applyTheme($currentTheme);

	const selectTheme = (themeId: string) => {
		const theme = themeId as Theme;
		currentTheme.set(theme);
	};
</script>

<div class="theme-selector">
	{#each Object.entries(themes) as [themeId, config]}
		<button
			class="theme-option"
			class:active={$currentTheme === themeId}
			style="background: {config.gradient}"
			on:click={() => selectTheme(themeId)}
		>
		</button>
	{/each}
</div>

<style>
	.theme-selector {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		margin-bottom: 15px;
	}

	.theme-option {
		width: 40px;
		height: 30px;
		border-radius: 6px;
		cursor: pointer;
		border: 2px solid transparent;
		transition: all 0.3s ease;
	}

	.theme-option:hover {
		border-color: #333;
	}

	.theme-option.active {
		border-color: var(--primary-color, #667eea);
		border-width: 3px;
	}
</style>
