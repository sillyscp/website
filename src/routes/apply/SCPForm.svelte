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

    export let data: SuperValidated<Infer<ScpSchema>>;
    export let closed: boolean | string;

    const form = superForm(data, {
        validators: zodClient(scpSchema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="?/scp">
    <Form.Field {form} name="tag">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Discord Tag</Form.Label>
                <Input {...props} bind:value={$formData.tag} />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Your Discord tag, not your username.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="id">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Discord ID</Form.Label>
                <Input {...props} bind:value={$formData.id} />
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
                <Input type="number" {...props} bind:value={$formData.age} />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="timezone">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>What is your timezone?</Form.Label>
                <Input {...props} bind:value={$formData.timezone} />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    {#if closed !== true && closed !== '2'}
        <Form.Button>Submit</Form.Button>
    {/if}
</form>