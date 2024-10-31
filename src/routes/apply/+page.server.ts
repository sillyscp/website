import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { applySchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import {PRIVATE_APPLICATION_WEBHOOK} from "$env/static/private";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(applySchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
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
        formData.append("payload_json", JSON.stringify({ content: `New application from <@${form.data.id}> ${form.data.tag} (${form.data.id})` }));

        await event.fetch(PRIVATE_APPLICATION_WEBHOOK, {
            method: "POST",
            body: formData,
        })

        return {
            form,
        };
    },
};