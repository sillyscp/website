import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { applySchema, scpSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import {PRIVATE_APPLICATION_WEBHOOK, PRIVATE_APPLICATION_TOKEN} from "$env/static/private";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(applySchema)),
        scpForm: await superValidate(zod(scpSchema)),
    };
};

export const actions: Actions = {
    discord: async (event) => {
        const form = await superValidate(event, zod(applySchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const jsonString = JSON.stringify(form.data, null, 2);

        const jsonBlob = new Blob([jsonString], { type: "application/json" });

        const formData = new FormData();
        formData.append("file1", jsonBlob, `${form.data.tag}s-application.json`);
        formData.append("payload_json", JSON.stringify({ content: `New Discord staff application from <@${form.data.id}> ${form.data.tag} (${form.data.id})` }));

        await event.fetch(PRIVATE_APPLICATION_WEBHOOK, {
            method: "POST",
            body: formData,
        })

        await event.fetch("https://central.sillyscp.gay/application", {
            method: "POST",
            body: JSON.stringify({
                userId: form.data.id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": PRIVATE_APPLICATION_TOKEN
            },
        })

        return {
            form,
        };
    },
    scp: async(event) => {
        const form = await superValidate(event, zod(scpSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const jsonString = JSON.stringify(form.data, null, 2);

        const jsonBlob = new Blob([jsonString], { type: "application/json" });

        const formData = new FormData();
        formData.append("file1", jsonBlob, `${form.data.tag}s-application.json`);
        formData.append("payload_json", JSON.stringify({ content: `New SCP:SL Staff application from <@${form.data.id}> ${form.data.tag} (${form.data.id})` }));

        await event.fetch(PRIVATE_APPLICATION_WEBHOOK, {
            method: "POST",
            body: formData,
        })

        await event.fetch("https://central.sillyscp.gay/application", {
            method: "POST",
            body: JSON.stringify({
                userId: form.data.id
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": PRIVATE_APPLICATION_TOKEN
            },
        })

        return {
            form,
        };
    }
};