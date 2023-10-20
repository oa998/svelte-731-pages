<script lang="ts">
	export let contenteditable: boolean = false;
</script>

<p {contenteditable} class={$$props.class} on:input><slot /></p>
