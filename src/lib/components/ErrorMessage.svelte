<script lang="ts">
	import { validationErrors } from '$lib/stores/cheatsheet';
</script>

{#if $validationErrors.length > 0}
	<div class="error-message">
		<h4>⚠️ Validation Errors:</h4>
		<ul>
			{#each $validationErrors as error}
				<li>
					{#if error.path}
						<strong>{error.path}:</strong>
					{/if}
					{error.message}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.error-message {
		background: #fee;
		color: #c33;
		padding: 12px;
		border-radius: 6px;
		margin-top: 15px;
		font-size: 0.9rem;
		border: 1px solid #fcc;
	}

	.error-message h4 {
		margin: 0 0 8px 0;
		font-size: 0.9rem;
	}

	.error-message ul {
		margin: 0;
		padding-left: 20px;
	}

	.error-message li {
		margin-bottom: 4px;
	}
</style>
