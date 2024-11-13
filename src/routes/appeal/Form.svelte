<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input/index.js";
    import { schema, type Schema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<Schema>>;

    const form = superForm(data, {
        validators: zodClient(schema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="?/scp">
    <Form.Field {form} name="tag">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Discord Tag</Form.Label>
                <Input {...props} bind:value={$formData.tag} required />
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
                <Input {...props} bind:value={$formData.id} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Example: 618689346828238848. To get it, right click your name in Discord and click "Copy ID" or go to <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID" class="text-blue-500">this article</a>.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="reason">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Why did you get banned?</Form.Label>
                <Input {...props} bind:value={$formData.reason} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="unban_reason">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Why should we unban you?</Form.Label>
                <Input {...props} bind:value={$formData.unban_reason} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="extra">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Any other info we might need to know?</Form.Label>
                <Input {...props} bind:value={$formData.extra} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>