<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input/index.js";
    import { scpSchema, type ScpSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import Turnstile from "$lib/components/Turnstile.svelte";

    export let data: SuperValidated<Infer<ScpSchema>>;
    export let closed: boolean | string;

    const form = superForm(data, {
        validators: zodClient(scpSchema),
    });

    const { form: formData, enhance } = form;

    let pass = false;
</script>

<form method="POST" use:enhance action="?/scp">
    <Form.Field {form} name="tag">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Discord Username</Form.Label>
                <Input {...props} bind:value={$formData.tag} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Your Discord username, not your display name/nickname.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="id">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Discord ID</Form.Label>
                <Input {...props} bind:value={$formData.id} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Example: 618689346828238848. To get it, right click your name in Discord and click "Copy ID" or go to <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID" class="text-blue-500">this article</a>.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="age">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Your age</Form.Label>
                <Input type="number" {...props} bind:value={$formData.age} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="timezone">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>What is your timezone?</Form.Label>
                <Input {...props} bind:value={$formData.timezone} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="gameid">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>What is your ID of your account of which you play ingame?</Form.Label>
                <Input {...props} bind:value={$formData.gameid} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            If you play the game on Steam, then it should be Steam64ID appended with @steam, if Discord, then Discord ID with @discord after, and if Northwood then add @northwood.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Turnstile oncallback={() => pass = true} />
    {#if closed !== true && closed !== '2'}
        <Form.Button disabled={!pass}>Submit</Form.Button>
    {/if}
</form>