<script lang="ts">
    import DiscordForm from "./DiscordForm.svelte";
    import type { PageData, ActionData } from "./$types";
    import ModeSwitcher from "$lib/components/ModeSwitcher.svelte";
    import * as Select from '$lib/components/ui/select';
    import * as Alert from '$lib/components/ui/alert';
    import SvelteSeo from "svelte-seo";
    import SCPForm from "./SCPForm.svelte";
    import {Label} from "$lib/components/ui/label";

    const closed: boolean | string = true;

    let { data, form }: { data: PageData, form: ActionData } = $props();

    let selected: '1' | '2' = $state("2");
</script>

<ModeSwitcher />

<SvelteSeo
        title="Silly SCP | Apply for staff"
        description="Apply for staff on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies."
        openGraph={{
        title: "Silly SCP | Apply for staff",
        description: "Apply for staff on the most friendliest SCP: Secret Laboratory community to all LGBTQ+ members and allies.",
        url: "https://sillyscp.gay/apply",
        type: "website",
        site_name: "Silly SCP",
    }}
/>

<div class="flex items-center justify-center m-10">
    <div class="space-y-4 xl:w-[60rem] lg:w-[55rem] md:w-[768px] w-full rounded-lg border-2 border-slate-600 sm:p-10 p-4 mt-16 lg:mt-0">
        {#if (typeof closed === 'boolean' && closed) || (typeof closed === 'string' && ((selected === '1' && closed === '1') || (selected === '2' && closed === '2')))}
            <Alert.Root variant="destructive" class="mb-2">
                <Alert.Title>Closed</Alert.Title>
                <Alert.Description>{typeof closed === 'boolean' ? "Applications are currently closed" : "This application is currently closed"}, please join our Discord to get info on when they reopen</Alert.Description>
            </Alert.Root>
        {/if}
        {#if form?.form.valid}
            <Alert.Root class="mb-2">
                <Alert.Title>Success</Alert.Title>
                <Alert.Description>Your application has been sent off to the relevant people.</Alert.Description>
            </Alert.Root>
        {/if}
        {#if form?.form.errors._errors?.length}
            <Alert.Root variant="destructive" class="mb-2">
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{form.form.message}</Alert.Description>
            </Alert.Root>
        {/if}
        <Label for="type">Type</Label>
        <Select.Root type="single" bind:value={selected} required>
            <Select.Trigger id="type">{selected === "1" ? "Discord Staff" : "SCP:SL Staff"}</Select.Trigger>
            <Select.Content>
                <Select.Item value="2">SCP</Select.Item>
                <Select.Item value="1">Discord</Select.Item>
            </Select.Content>
        </Select.Root>
        {#if selected === '1'}
            <DiscordForm data={data.form} {closed} />
        {:else}
            <SCPForm data={data.scpForm} {closed} />
        {/if}
    </div>
</div>
