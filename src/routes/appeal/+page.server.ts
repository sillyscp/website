import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { schema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import {PRIVATE_APPEAL_WEBHOOK} from "$env/static/private";
import {validateToken} from "$lib/server/utils";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        console.log("Submitted appeal")
        const formD = await event.request.formData();

        const form = await superValidate(formD, zod(schema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const token = formD.get('cf-turnstile-response')!;

        const { success, error } = await validateToken(token);

        if (!success) {
            return fail(400, {
                form: {
                    valid: false,
                    errors: {
                        token: error,
                    },
                },
            });
        }

        console.log("Validated token")

        const body = {
            embeds: [
                {
                    title: `Appeal made by ${form.data.tag} (${form.data.id})`,
                    color: 2326507,
                    fields: [
                        {
                            name: "User",
                            value: `<@${form.data.id}>`,
                            inline: true
                        },
                        {
                            name: "ID",
                            value: form.data.id,
                            inline: true
                        },
                        {
                            name: "Why they were punished",
                            value: form.data.reason
                        },
                        {
                            name: "Why they think their punishment should be revoked",
                            value: form.data.unban_reason
                        },
                        {
                            name: "Do they have any extra info to tell us",
                            value: form.data.extra ?? "No"
                        }
                    ]
                }
            ]
        }

        const formData = new FormData();
        formData.append("payload_json", JSON.stringify(body));

        const res = await event.fetch(PRIVATE_APPEAL_WEBHOOK, {
            method: "POST",
            body: formData,
        });

        return {
            form,
        };
    },
};