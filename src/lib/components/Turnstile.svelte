<script lang="ts">
    import { Turnstile } from 'svelte-turnstile';
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { mode } from "mode-watcher";
    let { oncallback, ...props }: {
        oncallback: (data: { token: string }) => void;
    } = $props()
</script>

<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} theme={$mode} {...props} on:callback={(d) => oncallback(d)} />