import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { schema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import {PRIVATE_APPEAL_WEBHOOK, PRIVATE_APPLICATION_TOKEN} from "$env/static/private";
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

        const res = await event.fetch(PRIVATE_APPEAL_WEBHOOK, {
            method: "POST",
            body: JSON.stringify({
                "embeds": [
                    {
                        "id": 652627557,
                        "title": `Appeal made by <@${form.data.id}> (${form.data.id})`,
                        "color": 2326507,
                        "fields": [
                            {
                                "id": 97064406,
                                "name": "Tag",
                                "value": form.data.tag,
                                "inline": true
                            },
                            {
                                "id": 300337417,
                                "name": "ID",
                                "value": form.data.id,
                                "inline": true
                            },
                            {
                                "id": 726796005,
                                "name": "Why they were punished",
                                "value": form.data.reason
                            },
                            {
                                "id": 914238494,
                                "name": "Why they think their punishment should be revoked",
                                "value": form.data.unban_reason
                            },
                            {
                                "id": 296423877,
                                "name": "Do they have any extra info to tell us",
                                "value": form.data.extra || "No"
                            }
                        ]
                    }
                ]
            }),
        });

        console.log(res.ok)

        return {
            form,
        };
    },
};