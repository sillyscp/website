import {z} from "zod";

export const schema = z.object({
    tag: z.string().min(2, "Discord tags are at least 2 characters in length").max(32, "Discord names are less than 32 characters in length"),
    id: z.string().min(17, "Please enter a valid Discord ID").max(19, "Please enter a valid Discord ID"),
    reason: z.string().min(10),
    unban_reason: z.string().min(10),
    extra: z.string().nullable(),
})

export type Schema = typeof schema;