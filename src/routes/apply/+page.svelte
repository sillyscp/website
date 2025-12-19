<script lang="ts">
    import DiscordForm from "./DiscordForm.svelte";
    import SCPForm from "./SCPForm.svelte";
    import type { PageData, ActionData } from "./$types";
    import ModeSwitcher from "$lib/components/ModeSwitcher.svelte";
    import SvelteSeo from "svelte-seo";
    import * as Tabs from '$lib/components/ui/tabs';

    let { data, form }: { data: PageData, form: ActionData } = $props();
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
        <p class="text-2xl">Welcome to the Silly SCP applications page.</p>
        <p class="text-lg">From the below tabs, choose your preferred role to apply for and fill in the form. Once submitted,
            we will begin to process your application. If SCP staff you will be DMed about an interview ASAP.</p>
        <Tabs.Root>
            <Tabs.Trigger value="scp">SCP:SL</Tabs.Trigger>
            <Tabs.Trigger value="discord">Discord</Tabs.Trigger>
            <Tabs.Content value="scp">
                <SCPForm data={data.scpForm} />
            </Tabs.Content>
            <Tabs.Content value="discord">
                <DiscordForm data={data.form} />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>
