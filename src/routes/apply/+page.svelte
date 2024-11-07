<script lang="ts">
    import DiscordForm from "./DiscordForm.svelte";
    import type { PageData } from "./$types";
    import ModeSwitcher from "$lib/components/ModeSwitcher.svelte";
    import * as Select from '$lib/components/ui/select';
    import SvelteSeo from "svelte-seo";
    import SCPForm from "./SCPForm.svelte";

    const closed: boolean | string = false;

    let { data }: { data: PageData } = $props();

    let selected: '1' | '2' = $state("1");
</script>

<ModeSwitcher />

<SvelteSeo
        title="Silly SCP | Apply for staff"
        description="Apply for staff on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies."
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
        {#if (typeof closed === 'boolean' && closed) || (typeof closed === 'string' && ((selected === '1' && closed === '1') || (selected === '2' && closed === '2')))}
            <p class="font-bold text-red-600">Applications are currently closed</p>
        {/if}
        <Select.Root type="single" bind:value={selected}>
            <Select.Trigger />
            <Select.Content>
                <Select.Item value="1">Discord</Select.Item>
                <Select.Item value="2">SCP</Select.Item>
            </Select.Content>
        </Select.Root>
        {#if selected === '1'}
            <DiscordForm data={data.form} {closed} />
        {:else}
            <SCPForm data={data.scpForm} {closed} />
        {/if}
    </div>
</div>