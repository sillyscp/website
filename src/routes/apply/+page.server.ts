import type {PageServerLoad, Actions, RequestEvent} from "./$types";
import { superValidate } from "sveltekit-superforms";
import { applySchema, scpSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import { PRIVATE_APPLICATION_WEBHOOK } from "$env/static/private";
import {validateToken} from "$lib/server/utils";
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(applySchema)),
        scpForm: await superValidate(zod(scpSchema)),
    };
};

const action = async (event: RequestEvent, schema: typeof applySchema | typeof scpSchema, type: string) => {
    console.log("action called")
    const formD = await event.request.formData();
    const form = await superValidate(formD, zod(schema));
    if (!form.valid) {
        return fail(400, {
            form,
        });
    }

    console.log("form is valid")

    const jsonString = JSON.stringify(form.data, null, 2);

    const jsonBlob = new Blob([jsonString], { type: "application/json" });

    const formData = new FormData();

    // if(!dev) {
    //     const token = formD.get('cf-turnstile-response')!;
    //
    //     const {success, error} = await validateToken(token);
    //
    //     if (!success) {
    //         return fail(400, {
    //             form: {
    //                 valid: false,
    //                 errors: {
    //                     token: error,
    //                 },
    //             },
    //         });
    //     }
    // }

    formData.append("file1", jsonBlob, `${form.data.tag}s-application.json`);
    formData.append("payload_json", JSON.stringify({ content: `New ${type} Staff application from <@${form.data.id}> ${form.data.tag} (${form.data.id})` }));

    await event.fetch(PRIVATE_APPLICATION_WEBHOOK, {
        method: "POST",
        body: formData,
    }).catch(console.error)

    console.log("complete")

    return {
        form,
    };
}

export const actions: Actions = {
    discord: async (event) => await action(event, applySchema, "Discord"),
    scp: async(event) => await action(event, scpSchema, "SCP:SL")
};