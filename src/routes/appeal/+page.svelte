<script lang="ts">
    import type { PageData, ActionData } from "./$types";
    import ModeSwitcher from "$lib/components/ModeSwitcher.svelte";
    import SvelteSeo from "svelte-seo";
    import Form from './Form.svelte';
    import * as Alert from '$lib/components/ui/alert';

    let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<ModeSwitcher />

<SvelteSeo
        title="Silly SCP | Appeal your ban"
        description="Appeal your ban on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies."
        openGraph={{
        title: "Silly SCP | Appeal your ban",
        description: "Appeal your ban on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies.",
        url: "https://sillyscp.gay/appeal",
        type: "website",
        site_name: "Silly SCP",
    }}
/>

<div class="flex items-center justify-center m-10">
    <div class="space-y-4 xl:w-[60rem] lg:w-[55rem] md:w-[768px] w-full rounded-lg border-2 border-slate-600 sm:p-10 p-4 mt-16 lg:mt-0">
        <h1 class="text-4xl font-bold">We have now phased out this version of appeals, please head to <a class="text-blue-500" href="https://appeal.gg/sillyscp">appeals.gg/sillyscp</a> to appeal.</h1>
    </div>
</div>
