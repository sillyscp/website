import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { schema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import {PRIVATE_APPEAL_WEBHOOK, PRIVATE_APPLICATION_TOKEN} from "$env/static/private";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(schema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const central = await event.fetch(`https://cental.sillyscp.gay/banned?userId=${form.data.id}`, {
            headers: {
                "Authorization": PRIVATE_APPLICATION_TOKEN
            }
        })

        const banned = await central.json();

        if(!banned.success) {
            form.errors._errors?.push("User is not banned");
            form.message = "User is not banned";
            return {
                form,
            };
        }

        const formData = new FormData();
        formData.append("payload_json", JSON.stringify(
            {
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
                                "name": "Why they were banned",
                                "value": form.data.reason
                            },
                            {
                                "id": 914238494,
                                "name": "Why they think they should be unbanned",
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
            }
        ));

        await event.fetch(PRIVATE_APPEAL_WEBHOOK, {
            method: "POST",
            body: formData,
        });

        return {
            form,
        };
    },
};