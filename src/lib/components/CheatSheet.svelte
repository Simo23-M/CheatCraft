<script lang="ts">
	import type { CheatSheetData } from '$lib/types';

	export let data: CheatSheetData;
</script>

<div class="cheatsheet">
	<div class="cheatsheet-header">
		<h1 class="cheatsheet-title">{data.icon || '📝'} {data.title}</h1>
		{#if data.description}
			<p class="cheatsheet-description">{data.description}</p>
		{/if}
	</div>

	<div class="categories">
		{#each data.categories as category}
			<div class="category">
				<h2 class="category-title">
					<span class="category-icon">{category.icon || '📋'}</span>
					{category.title}
				</h2>

				{#if category.commands}
					{#each category.commands as command}
						<div class="command-item">
							<span class="command-desc">{command.description}</span>
							<span class="command-code">{command.command}</span>
						</div>
					{/each}
				{/if}

				{#if category.tip}
					<div class="tip-box">
						<h3 class="tip-title">💡 {category.tip.title}</h3>
						<p>{category.tip.content}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.cheatsheet {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.6;
		color: #333;
	}

	.cheatsheet-header {
		text-align: center;
		margin-bottom: 40px;
		padding: 40px 0;
		background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
		backdrop-filter: blur(20px);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.cheatsheet-title {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		margin-bottom: 10px;
	}

	.cheatsheet-description {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 300;
	}

	.categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 30px;
		margin-bottom: 40px;
	}

	.category {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 20px;
		padding: 30px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
	}

	.category:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	}

	.category-title {
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 20px;
		color: #2c3e50;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.category-icon {
		font-size: 1.5rem;
	}

	.command-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 12px;
		margin: 10px 0;
		transition: all 0.3s ease;
		border-left: 4px solid transparent;
	}

	.command-item:hover {
		background: rgba(255, 255, 255, 0.9);
		border-left-color: var(--primary-color, #667eea);
		transform: translateX(5px);
	}

	.command-desc {
		flex: 1;
		font-weight: 500;
		color: #2c3e50;
	}

	.command-code {
		background: #2d3748;
		color: #e2e8f0;
		padding: 8px 12px;
		border-radius: 8px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.tip-box {
		background: var(--primary-gradient, linear-gradient(135deg, #667eea, #764ba2));
		color: white;
		padding: 20px;
		border-radius: 15px;
		margin: 15px 0;
		box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
	}

	.tip-title {
		font-size: 1.2rem;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	@media (max-width: 768px) {
		.cheatsheet-title {
			font-size: 2rem;
		}

		.categories {
			grid-template-columns: 1fr;
		}

		.command-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}
	}
</style>
