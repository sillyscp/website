<script lang="ts">
    import Form from "./Form.svelte";
    import type { PageData } from "./$types";

    const closed = false;

    export let data: PageData;
</script>

<div class="flex items-center justify-center my-10">
    <div class="space-y-4 xl:w-[44rem] lg:w-[34rem] md:w-56 sm:w-24 w-16 rounded-lg border-2 border-slate-600 p-2 lg:p-10">
        {#if closed}
            <p class="font-bold text-red-600">Applications are currently closed</p>
        {/if}
        <Form data={data.form} {closed} />
    </div>
</div>