<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import { applySchema, type ApplySchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import Turnstile from "$lib/components/Turnstile.svelte";

    export let data: SuperValidated<Infer<ApplySchema>>;
    export let closed: boolean | string;

    const form = superForm(data, {
        validators: zodClient(applySchema),
    });

    const { form: formData, enhance } = form;

    let pass = false;
</script>

<form method="POST" use:enhance  action="?/discord">
    <Form.Field {form} name="tag">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>Discord Username</Form.Label>
            <Input {...props} bind:value={$formData.tag} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Your Discord username, not your nickname/display name.
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
    <Form.Field {form} name="q1">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>Why do you want to be Discord staff on Silly SCP?</Form.Label>
            <Textarea {...props} bind:value={$formData.q1} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q2">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What motivates you in life?</Form.Label>
            <Textarea {...props} bind:value={$formData.q2} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q3">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What keeps you moving forward and making new decisions?</Form.Label>
            <Textarea {...props} bind:value={$formData.q3} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q4">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What are your intentions as staff?</Form.Label>
            <Textarea {...props} bind:value={$formData.q4} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q5">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What should you do when someone is abusing a loop hole?</Form.Label>
            <Textarea {...props} bind:value={$formData.q5} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q6">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What should you do when someone is disrespecting other members after being told to stop?</Form.Label>
            <Textarea {...props} bind:value={$formData.q6} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q7">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>What should you do if an argument between 2 members is getting heated?</Form.Label>
            <Textarea {...props} bind:value={$formData.q7} required />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="q8">
        <Form.Control>
            {#snippet children({ props })}
            <Form.Label>If you had anything to say to the world, what would it be?</Form.Label>
            <Textarea {...props} bind:value={$formData.q8} required />
            {/snippet}
        </Form.Control>
        <Form.Description>
            Don't overthink this question, just imagine it how you will and ignore the consequences.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Turnstile oncallback={() => pass = true} />
    {#if closed !== true && closed !== '1'}
        <Form.Button disabled={!pass}>Submit</Form.Button>
    {/if}
</form>