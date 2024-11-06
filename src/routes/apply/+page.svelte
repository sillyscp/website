<script lang="ts">
    import Form from "./Form.svelte";
    import type { PageData } from "./$types";
    import ModeSwitcher from "$lib/components/ModeSwitcher.svelte";
    import * as Alert from '$lib/components/ui/alert';
    import SvelteSeo from "svelte-seo";

    const closed = false;

    let { data }: { data: PageData } = $props();
</script>

<ModeSwitcher />

<SvelteSeo
        title="Silly SCP | Apply for staff"
        description="Apply for Discord staff on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies."
        openGraph={{
        title: "Silly SCP | Apply for staff",
        description: "Apply for Discord staff on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies.",
        url: "https://sillyscp.gay/apply",
        type: "website",
        site_name: "Silly SCP",
    }}
/>

<div class="flex items-center justify-center m-10">
    <div class="space-y-4 xl:w-[60rem] lg:w-[55rem] md:w-[768px] w-full rounded-lg border-2 border-slate-600 sm:p-10 p-4 mt-16 lg:mt-0">
        {#if closed}
            <p class="font-bold text-red-600">Applications are currently closed</p>
        {/if}
        <Alert.Root variant="destructive">
            <Alert.Title>Is this the right application for you?</Alert.Title>
            <Alert.Description>This is for <strong class="font-bold">Discord Staff</strong> only, if you want to apply for SCP:SL staff, check #applications in the Discord server</Alert.Description>
        </Alert.Root>
        <Form data={data.form} {closed} />
    </div>
</div>