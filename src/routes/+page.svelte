<script lang="ts">
    import SvelteSeo from "svelte-seo";
    import {Button} from "$lib/components/ui/button";
</script>

<SvelteSeo
    title="Silly SCP | Home"
    description="The most friendly SCP: Secret Laboratory community to all LGBTQ+ members and allies."
    openGraph={{
        title: "Silly SCP | Home",
        description: "The most friendly SCP: Secret Laboratory community to all LGBTQ+ members and allies.",
        url: "https://sillyscp.gay",
        type: "website",
        site_name: "Silly SCP",
    }}
/>

<div class="flex items-center justify-center h-screen bg-black text-white">
    <div class="space-y-4">
        <img src="/favicon.png" class="w-72 h-72 mx-auto" alt="Logo" />
        <h1 class="text-6xl font-bold text-center"><span class="text-[#5BCFFA]">S</span><span class="text-[#F5ABB9]">i</span><span>l</span><span class="text-[#F5ABB9]">l</span><span class="text-[#5BCFFA]">y</span> SCP</h1>
        <div class="flex gap-4 items-center justify-center !mt-10">
            <Button onclick={() => navigator.clipboard.writeText("play.sillyscp.gay:7777")} class="bg-[#5BCFFA] text-black">Copy server IP</Button>
            <Button href="/discord" class="bg-[#F5ABB9] text-black">Join our Discord</Button>
            <Button href="/apply" variant="secondary" class="text-black bg-white hover:bg-secondary/80">Apply for staff</Button>
        </div>
    </div>
</div>