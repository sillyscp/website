<script lang="ts">
    import Form from "./Form.svelte";
    import type { PageData } from "./$types";

    const closed = false;

    export let data: PageData;
</script>

<div class="flex items-center justify-center m-10">
    <div class="space-y-4 xl:w-[44rem] lg:w-[34rem] w-full rounded-lg border-2 border-slate-600 p-2 sm:p-10 p-4">
        {#if closed}
            <p class="font-bold text-red-600">Applications are currently closed</p>
        {/if}
        <Form data={data.form} {closed} />
    </div>
</div>