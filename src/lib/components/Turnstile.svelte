<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { mode } from "mode-watcher";
    let { ...props } = $props()
</script>

<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} theme={$mode} {...props} />